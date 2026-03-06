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
 * Wrap body HTML content in a simple, widely-compatible email template.
 * Uses inline styles for maximum email client compatibility.
 */
function buildEmailHtml(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>English Excellence</title>
</head>
<body style="margin:0;padding:0;background:#f8f5f0;font-family:Arial,Helvetica,sans-serif;color:#1a2240;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f5f0;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="background:#ffffff;border-radius:12px;padding:40px 48px;max-width:600px;width:100%;">
          <tr>
            <td style="padding-bottom:24px;border-bottom:2px solid #c9a84c;">
              <p style="margin:0;font-size:18px;font-weight:bold;color:#c9a84c;letter-spacing:2px;text-transform:uppercase;">
                English Excellence
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:24px;font-size:15px;line-height:1.7;color:#1a2240;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding-top:32px;border-top:1px solid #e5e0d8;font-size:12px;color:#999;text-align:center;">
              English Excellence &nbsp;|&nbsp; 0431 878 221 &nbsp;|&nbsp; ${ADMIN_EMAIL}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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

We've received your enquiry regarding a trial class. A member of our team will be in touch shortly using the phone number you provided to organise a suitable time and discuss the next steps.

During this call, we'll also take a moment to understand the student's current level, upcoming assessments, and goals to ensure the trial lesson is as useful and personalised as possible. If there are any concerns between now and then, don't be afraid to contact us. (0431878221)

We look forward to speaking with you soon.

Kind regards,
English Excellence`;

const STAY_IN_TOUCH_WELCOME_MESSAGE = `Hi there,

Welcome to English Excellence! We're thrilled to have you join our community.

As a subscriber, we will keep you up to date with:
- The latest course information and new programmes
- Exclusive promotions and special offers
- Free resources, study guides, and HSC English tips
- Important updates to help you excel in your HSC journey

Stay tuned - exciting updates are on their way!

If you have any questions, feel free to reach out at ${ADMIN_EMAIL} or call us at 0431 878 221.

Warm regards,
English Excellence
${ADMIN_EMAIL}`;

const REGION = "us-central1";

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
  { document: "inquiries/{inquiryId}", region: REGION },
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
      subject: `New Trial Inquiry - ${parentName}`,
      text: `New inquiry received:

Parent Name:    ${parentName}
Child Name:     ${childName}
Phone:          ${data.phone ?? ""}
Email:          ${data.email ?? ""}
Year Level:     ${data.yearLevel ?? ""}
English Level:  ${englishLevel}`,
      html: buildEmailHtml(`
        <h2 style="margin-top:0;color:#1a2240;">New Trial Inquiry</h2>
        <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;width:140px;">Parent Name</td><td>${parentName}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;">Child Name</td><td>${childName}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;">Phone</td><td>${data.phone ?? ""}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;">Email</td><td>${data.email ?? ""}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;">Year Level</td><td>${data.yearLevel ?? ""}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;">English Level</td><td>${englishLevel}</td></tr>
        </table>
      `),
    }).catch((err: unknown) => {
      console.error("[onInquiryCreated] Failed to send admin notification:", err);
    });

    // 2. Send confirmation to the user
    if (data.email) {
      const confirmationBodyHtml = INQUIRY_CONFIRMATION_MESSAGE
        .split("\n\n")
        .map((para) => `<p style="margin:0 0 16px 0;">${para.replace(/\n/g, "<br/>")}</p>`)
        .join("");
      await transporter.sendMail({
        from,
        to: data.email as string,
        subject: "English Excellence - Trial Booking Received",
        text: `Hi ${data.parentFirstName ?? "there"},\n\n${INQUIRY_CONFIRMATION_MESSAGE}`,
        html: buildEmailHtml(`<p style="margin:0 0 16px 0;">Hi ${data.parentFirstName ?? "there"},</p>${confirmationBodyHtml}`),
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
  { document: "reviews/{reviewId}", region: REGION },
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

    const reviewActionUrl = "https://reviewaction-nwzu36hcra-uc.a.run.app";
    const approveUrl = `${reviewActionUrl}?reviewId=${encodeURIComponent(reviewId)}&action=approve&token=${approvalToken}`;
    const rejectUrl = `${reviewActionUrl}?reviewId=${encodeURIComponent(reviewId)}&action=reject&token=${approvalToken}`;

    await transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      subject: `New Review Submitted - ${data.name ?? "Anonymous"} (${data.rating ?? "?"}/5)`,
      text: `A new review has been submitted and is pending approval:

Name:        ${data.name ?? ""}
School:      ${data.school ?? ""}
HSC Result:  ${data.result ?? "Not provided"}
Rating:      ${data.rating ?? ""}/5

Testimonial:
${data.testimonial ?? ""}

--------------------------------------

APPROVE this review (click to publish):
${approveUrl}

REJECT this review (click to discard):
${rejectUrl}

These links are single-use and do not require you to log in.`,
      html: buildEmailHtml(`
        <h2 style="margin-top:0;color:#1a2240;">New Review Submitted</h2>
        <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;width:120px;">Name</td><td>${data.name ?? ""}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;">School</td><td>${data.school ?? ""}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;">HSC Result</td><td>${data.result ?? "Not provided"}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;">Rating</td><td>${data.rating ?? ""}/5</td></tr>
        </table>
        <p style="margin:16px 0 8px 0;"><strong>Testimonial:</strong></p>
        <p style="margin:0 0 24px 0;padding:12px 16px;background:#f8f5f0;border-left:4px solid #c9a84c;border-radius:4px;">${(data.testimonial ?? "").replace(/\n/g, "<br/>")}</p>
        <hr style="border:none;border-top:1px solid #e5e0d8;margin:24px 0;"/>
        <p style="margin:0 0 16px 0;">
          <a href="${approveUrl}" style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;margin-right:12px;">Approve Review</a>
          <a href="${rejectUrl}" style="display:inline-block;padding:12px 24px;background:#c0392b;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Reject Review</a>
        </p>
        <p style="margin:0;font-size:12px;color:#999;">These links are single-use and do not require you to log in to Firebase.</p>
      `),
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
export const reviewAction = onRequest({ region: REGION }, async (req, res) => {
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

  // Idempotency guard – don't re-process an already actioned review.
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
  { document: "resource_signups/{signupId}", region: REGION },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const transporter = createTransporter();
    const from = getFrom();

    if (data.email) {
      const welcomeBodyHtml = `
        <p style="margin:0 0 16px 0;">Hi ${data.name ?? "there"},</p>
        <p style="margin:0 0 16px 0;">Welcome to English Excellence! We're thrilled to have you join our community.</p>
        <p style="margin:0 0 8px 0;">As a subscriber, we will keep you up to date with:</p>
        <ul style="margin:0 0 16px 0;padding-left:20px;">
          <li style="margin-bottom:6px;">The latest course information and new programmes</li>
          <li style="margin-bottom:6px;">Exclusive promotions and special offers</li>
          <li style="margin-bottom:6px;">Free resources, study guides, and HSC English tips</li>
          <li style="margin-bottom:6px;">Important updates to help you excel in your HSC journey</li>
        </ul>
        <p style="margin:0 0 16px 0;">Stay tuned - exciting updates are on their way!</p>
        <p style="margin:0 0 16px 0;">If you have any questions, feel free to reach out at
          <a href="mailto:${ADMIN_EMAIL}" style="color:#c9a84c;">${ADMIN_EMAIL}</a>
          or call us at 0431 878 221.
        </p>
        <p style="margin:0;">Warm regards,<br/><strong>English Excellence</strong></p>
      `;
      await transporter.sendMail({
        from,
        to: data.email as string,
        subject: "Welcome to English Excellence!",
        text: `Hi ${data.name ?? "there"},\n\n${STAY_IN_TOUCH_WELCOME_MESSAGE}`,
        html: buildEmailHtml(welcomeBodyHtml),
      }).catch((err: unknown) => {
        console.error("[onResourceSignupCreated] Failed to send welcome email:", err);
      });
    }
  }
);
