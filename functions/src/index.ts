import * as admin from "firebase-admin";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a Nodemailer transporter from environment variables.
 *
 * Set these via Firebase Functions environment config:
 *   firebase functions:config:set \
 *     email.host="smtp.gmail.com" email.port="587" \
 *     email.user="you@gmail.com"  email.pass="your-app-password" \
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

const INQUIRY_CONFIRMATION_MESSAGE = `Hi there,

Thank you for reaching out to English Excellence.

We've received your enquiry regarding a trial class. A member of our team \
will be in touch shortly using the phone number you provided to organise a \
suitable time and discuss the next steps.

During this call, we'll also take a moment to understand the student's current \
level, upcoming assessments, and goals to ensure the trial lesson is as useful \
and personalised as possible. If there are any concerns between now and then, \
don't be afraid to contact us. (0431878221)

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

Stay tuned — exciting updates are on their way!

If you have any questions, feel free to reach out at ${ADMIN_EMAIL} \
or call us at 0431 878 221.

Warm regards,
English Excellence
${ADMIN_EMAIL}`;

// ---------------------------------------------------------------------------
// Trigger: new inquiry
// ---------------------------------------------------------------------------

/**
 * Fires when a document is created in the `inquiries` collection.
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
      ].join("\n"),
    });

    // 2. Send confirmation to the user
    if (data.email) {
      await transporter.sendMail({
        from,
        to: data.email as string,
        subject: "English Excellence – Trial Booking Received",
        text: `Hi ${data.parentFirstName ?? "there"},\n\n${INQUIRY_CONFIRMATION_MESSAGE}`,
      });
    }
  }
);

// ---------------------------------------------------------------------------
// Trigger: new review
// ---------------------------------------------------------------------------

/**
 * Fires when a document is created in the `reviews` collection.
 * Sends a notification email to the admin with the review details.
 */
export const onReviewCreated = onDocumentCreated(
  "reviews/{reviewId}",
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const transporter = createTransporter();
    const from = getFrom();

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
      ].join("\n"),
    });
  }
);

// ---------------------------------------------------------------------------
// Trigger: new resource sign-up
// ---------------------------------------------------------------------------

/**
 * Fires when a document is created in the `resource_signups` collection.
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
      });
    }
  }
);
