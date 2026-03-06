import * as admin from "firebase-admin";
import * as crypto from "crypto";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { onRequest } from "firebase-functions/v2/https";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a Nodemailer transporter from environment variables.
 *
 * Set these via Firebase Functions environment config:
 *   firebase functions:config:set \\
 *     email.host="smtp.gmail.com" email.port="587" \\
 *     email.user="you@gmail.com"  email.pass="your-app-password" \\
 *     email.from="you@gmail.com"
 *
 * At runtime, firebase-functions v2 exposes them as process.env
 * after being loaded from .runtimeconfig.json or functions config.
 */
function createTransporter() {
  const port = Number(process.env.EMAIL_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: {
      user: process.env.EMAIL_USER ?? "",
      pass: process.env.EMAIL_PASS ?? "",
    },
  });
}

function getFrom(): string {
  return process.env.EMAIL_FROM ?? process.env.EMAIL_USER ?? ADMIN_EMAIL;
}

const ADMIN_EMAIL = "leo@eehsc.com";

/**
 * Base URL for Cloud Functions used when building approve/reject links.
 * Set the FUNCTIONS_BASE_URL environment variable in Firebase Functions
 * config to override the default (e.g. if the project ID differs).
 *
 *   firebase functions:secrets:set FUNCTIONS_BASE_URL
 *   or
 *   firebase functions:config:set email.functions_base_url="https://..."
 */
function getFunctionsBaseUrl(): string {
  return (
    process.env.FUNCTIONS_BASE_URL ??
    "https://asia-southeast1-english-excellence-hsc.cloudfunctions.net"
  );
}

/** Render a minimal HTML confirmation page for the reviewAction endpoint. */
function buildActionHtml(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} – English Excellence</title>
  <style>
    body { font-family: sans-serif; display: flex; align-items: center;
           justify-content: center; min-height: 100vh; margin: 0;
           background: #f8f5f0; color: #1a2240; }
    .card { background: #fff; border-radius: 1.5rem; padding: 3rem 2.5rem;
            max-width: 480px; width: 100%; text-align: center;
            box-shadow: 0 8px 40px rgba(0,0,0,0.08); }
    h1 { font-size: 1.75rem; margin-bottom: 1rem; }
    p  { color: #555; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    <p style="margin-top:2rem;font-size:.85rem;color:#aaa;">
      English Excellence – admin action
    </p>
  </div>
</body>
</html>`;
}

const INQUIRY_CONFIRMATION_MESSAGE = `Thank you for reaching out to English Excellence.

We\'\'\'ve received your enquiry regarding a trial class. A member of our team \\
will be in touch shortly using the phone number you provided to organise a \\
suitable time and discuss the next steps.

During this call, we\'\'\'ll also take a moment to understand the student\'\'\'s current \\
level, upcoming assessments, and goals to ensure the trial lesson is as useful \\
and personalised as possible. If there are any concerns between now and then, \\
don\'\'\'t be afraid to contact us. (0431878221)

We look forward to speaking with you soon.

Kind regards,
English Excellence`;

const STAY_IN_TOUCH_WELCOME_MESSAGE = `Hi there,

Welcome to English Excellence! We\'\'\'re thrilled to have you join our community.

As a subscriber, we will keep you up to date with:
- The latest course information and new programmes
- Exclusive promotions and special offers
- Free resources, study guides, and HSC English tips
- Important updates to help you excel in your HSC journey

Stay tuned — exciting updates are on their way!

If you have any questions, feel free to reach out at ${ADMIN_EMAIL} \\
or call us at 0431 878 221.

Warm regards,
English Excellence
${ADMIN_EMAIL}`;

// ---------------------------------------------------------------------------
// Trigger: new inquiry
// ---------------------------------------------------------------------------

/**
 * Fires when a document is created in the \`inquiries\` collection.
 * Sends:
 *   1. A notification email to the admin with the full inquiry details.
 *   2. A confirmation email to the user.
 */
export const onInquiryCreated = onDocumentCreated(
  "inquiries/{inquiryId}",
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const transporter = createTransporter();
    const from = getFrom();

    const parentName =
      `${data.parentFirstName ?? ""} ${data.parentLastName ?? ""}`.trim();
    const childName =
      `${data.childFirstName ?? ""} ${data.childLastName ?? ""}`.trim();
    const englishLevel =
      Array.isArray(data.englishLevel) && data.englishLevel.length > 0
        ? (data.englishLevel as string[]).join(", ")
        : "Not specified";

    // 1. Notify admin
    await transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      subject: `New Trial Inquiry – ${parentName}`,
      text: [
        `New inquiry received:`,
        ``,
        `Parent Name:    ${parentName}`,
        `Child Name:     ${childName}`,
        `Phone:          ${data.phone ?? ""}`,
        `Email:          ${data.email ?? ""}`,
        `Year Level:     ${data.yearLevel ?? ""}`,
        `English Level:  ${englishLevel}`,
      ].join("\\n"),
    }).catch((err: unknown) => {
      console.error("[onInquiryCreated] Failed to send admin notification:", err);
    });

    // 2. Send confirmation to the user
    if (data.email) {
      await transporter.sendMail({
        from,
        to: data.email as string,
        subject: "English Excellence – Trial Booking Received",
        text: `Hi ${data.parentFirstName ?? "there"},\n\n${INQUIRY_CONFIRMATION_MESSAGE}`,
      }).catch((err: unknown) => {
        console.error("[onInquiryCreated] Failed to send user confirmation email:", err);
      });
    }
  }
);

// ---------------------------------------------------------------------------
// Trigger: new review
// ---------------------------------------------------------------------------

/**
 * Fires when a document is created in the \`reviews\` collection.
 * - Generates a one-time approval token and stores it on the document.
 * - Sends a notification email to the admin with approve / reject links so
 *   the review can be actioned immediately without logging into Firebase.
 */
export const onReviewCreated = onDocumentCreated(
  "reviews/{reviewId}",
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const reviewId = event.params.reviewId;

    // Generate a secure one-time token and persist it on the review document.
    const approvalToken = crypto.randomBytes(32).toString("hex");
    // Token expires in 30 days.
    const tokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await admin
      .firestore()
      .collection("reviews")
      .doc(reviewId)
      .update({ approvalToken, tokenExpiresAt });

    const transporter = createTransporter();
    const from = getFrom();

    const baseUrl = getFunctionsBaseUrl();
    const approveUrl = `${baseUrl}/reviewAction?reviewId=${encodeURIComponent(reviewId)}&action=approve&token=${approvalToken}`;
    const rejectUrl = `${baseUrl}/reviewAction?reviewId=${encodeURIComponent(reviewId)}&action=reject&token=${approvalToken}`;

    await transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      subject: `New Review Submitted – ${data.name ?? "Anonymous"} (${data.rating ?? "?"}/5)`,
      text: [
        `A new review has been submitted and is pending approval:`,
        ``,
        `Name:        ${data.name ?? ""}`,
        `School:      ${data.school ?? ""}`,
        `HSC Result:  ${data.result ?? "Not provided"}`,
        `Rating:      ${data.rating ?? ""}/5`,
        ``,
        `Testimonial:`,
        data.testimonial ?? "",
        ``,
        `──────────────────────────────────────`,
        ``,
        `✅ APPROVE this review (click to publish):`,
        approveUrl,
        ``,
        `❌ REJECT this review (click to discard):`,
        rejectUrl,
        ``,
        `These links are single-use and do not require you to log in.`,
      ].join("\\n"),
      html: [
        `<p>A new review has been submitted and is pending approval:</p>`,
        `<table style="border-collapse:collapse;font-family:sans-serif;">`,
        `  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name</td><td>${data.name ?? ""}</td></tr>`,
        `  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">School</td><td>${data.school ?? ""}</td></tr>`,
        `  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">HSC Result</td><td>${data.result ?? "Not provided"}</td></tr>`,
        `  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Rating</td><td>${data.rating ?? ""}/5</td></tr>`,
        `</table>`,
        `<p><strong>Testimonial:</strong><br/>${(data.testimonial ?? "").replace(/\\n/g, "<br/>")}</p>`,
        `<hr/>`,
        `<p>`,
        `  <a href="${approveUrl}" style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;margin-right:12px;">`,
        `    ✅ Approve Review`,
        `  </a>`,
        `  <a href="${rejectUrl}" style="display:inline-block;padding:12px 24px;background:#c0392b;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">`,
        `    ❌ Reject Review`,
        `  </a>`,
        `</p>`,
        `<p style="font-size:0.8em;color:#888;">These links are single-use and do not require you to log in to Firebase.</p>`,
      ].join("\\n"),
    });
  }
);

// ---------------------------------------------------------------------------
// HTTP: approve or reject a review
// ---------------------------------------------------------------------------

/**
 * Handles approve/reject actions for a pending review.
 *
 * Query parameters:
 *   reviewId  – Firestore document ID of the review
 *   action    – "approve" | "reject"
 *   token     – one-time token stored on the review document
 *
 * The link is included in the admin notification email sent by
 * onReviewCreated.  No Firebase login is required.
 */
export const reviewAction = onRequest(async (req, res) => {
  const { reviewId, action, token } = req.query as Record<string, string>;

  if (!reviewId || !action || !token) {
    res
      .status(400)
      .send(
        buildActionHtml(
          "Missing Parameters",
          "The link appears to be incomplete. Please check the email and try again."
        )
      );
    return;
  }

  if (action !== "approve" && action !== "reject") {
    res
      .status(400)
      .send(
        buildActionHtml(
          "Invalid Action",
          "The action must be either &ldquo;approve&rdquo; or &ldquo;reject&rdquo;."
        )
      );
    return;
  }

  const db = admin.firestore();
  const reviewRef = db.collection("reviews").doc(reviewId);
  const reviewSnap = await reviewRef.get();

  if (!reviewSnap.exists) {
    res
      .status(404)
      .send(
        buildActionHtml(
          "Review Not Found",
          "No review was found with that ID. It may have been deleted."
        )
      );
    return;
  }

  const reviewData = reviewSnap.data() ?? {};

  // Verify the token matches what was stored when the review was created.
  // Use timing-safe comparison to prevent timing-based token enumeration.
  const storedToken: string = reviewData.approvalToken ?? "";
  let tokenValid = false;
  try {
    tokenValid =
      storedToken.length === token.length &&
      crypto.timingSafeEqual(Buffer.from(storedToken), Buffer.from(token));
  } catch {
    tokenValid = false;
  }
  if (!storedToken || !tokenValid) {
    res
      .status(403)
      .send(
        buildActionHtml(
          "Invalid or Expired Link",
          "This link is no longer valid. The review may have already been actioned, or the link has expired."
        )
      );
    return;
  }

  // Check token expiry.
  const tokenExpiresAt: FirebaseFirestore.Timestamp | undefined =
    reviewData.tokenExpiresAt;
  if (tokenExpiresAt && tokenExpiresAt.toDate() < new Date()) {
    res
      .status(403)
      .send(
        buildActionHtml(
          "Link Expired",
          "This approval link has expired. Please log in to Firebase to manage this review manually."
        )
      );
    return;
  }

  // Idempotency guard – don\'t re-process an already actioned review.
  if (
    reviewData.status === "approved" ||
    reviewData.status === "rejected"
  ) {
    const alreadyDone = reviewData.status as string;
    res
      .status(200)
      .send(
        buildActionHtml(
          "Already Processed",
          `This review was already <strong>${alreadyDone}</strong>. No further action is needed.`
        )
      );
    return;
  }

  const newStatus = action === "approve" ? "approved" : "rejected";

  await reviewRef.update({
    status: newStatus,
    approvalToken: admin.firestore.FieldValue.delete(),
    tokenExpiresAt: admin.firestore.FieldValue.delete(),
    actionedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const successMessage =
    newStatus === "approved"
      ? "The review has been <strong>approved</strong> and will now appear on the website."
      : "The review has been <strong>rejected</strong> and will not appear on the website.";

  res
    .status(200)
    .send(
      buildActionHtml(
        newStatus === "approved" ? "Review Approved ✓" : "Review Rejected",
        successMessage
      )
    );
});

// ---------------------------------------------------------------------------
// Trigger: new resource sign-up
// ---------------------------------------------------------------------------

/**
 * Fires when a document is created in the \`resource_signups\` collection.
 * Sends a welcome email to the subscriber.
 */
export const onResourceSignupCreated = onDocumentCreated(
  "resource_signups/{signupId}",
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const transporter = createTransporter();
    const from = getFrom();

    if (data.email) {
      await transporter.sendMail({
        from,
        to: data.email as string,
        subject: "Welcome to English Excellence!",
        text: `Hi ${data.name ?? "there"},\n\n${STAY_IN_TOUCH_WELCOME_MESSAGE}`,
      }).catch((err: unknown) => {
        console.error("[onResourceSignupCreated] Failed to send welcome email:", err);
      });
    }
  }
);
