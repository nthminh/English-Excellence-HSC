# Hướng dẫn cấu hình Firebase Cloud Functions gửi email tự động
# Firebase Cloud Functions – Automatic Email Setup Guide

---

## Tổng quan / Overview

Hệ thống đã được chuyển sang dùng **Firebase Cloud Functions** để gửi email tự động.
Email không còn được gửi từ trình duyệt (EmailJS) mà được kích hoạt phía server
mỗi khi có document mới được tạo trong Firestore.

The system now uses **Firebase Cloud Functions** for all automatic email sending.
Emails are no longer sent from the browser (EmailJS) — they are triggered server-side
whenever a new document is created in Firestore.

| Firestore collection  | Cloud Function            | Email(s) sent                                           |
|-----------------------|---------------------------|---------------------------------------------------------|
| `inquiries`           | `onInquiryCreated`        | Admin notification + user confirmation                  |
| `reviews`             | `onReviewCreated`         | Admin notification (new review pending approval)        |
| `resource_signups`    | `onResourceSignupCreated` | Welcome email to new subscriber                         |

---

## Yêu cầu / Prerequisites

1. **Node.js 20** — [https://nodejs.org](https://nodejs.org)
2. **Firebase CLI** — cài đặt / install:
   ```bash
   npm install -g firebase-tools
   ```
3. Đăng nhập Firebase / Log in to Firebase:
   ```bash
   firebase login
   ```
4. Dự án Firebase đã bật **Blaze (pay-as-you-go) plan** — Cloud Functions yêu cầu
   gói Blaze để gửi request ra ngoài internet (như SMTP).
   
   The Firebase project must be on the **Blaze plan** — Cloud Functions require it
   to make outbound network requests (e.g. to an SMTP server).

---

## Bước 1 – Chọn nhà cung cấp SMTP / Step 1 – Choose an SMTP provider

Bạn có thể dùng bất kỳ nhà cung cấp SMTP nào. Ví dụ phổ biến:
You can use any SMTP provider. Common options:

| Provider         | Host                    | Port | Ghi chú / Notes                                         |
|------------------|-------------------------|------|---------------------------------------------------------|
| **Gmail**        | `smtp.gmail.com`        | 587  | Dùng "App Password" (xem bên dưới) / Use "App Password" |
| **Brevo (ex Sendinblue)** | `smtp-relay.brevo.com` | 587 | Free tier: 300 emails/day                  |
| **Mailgun**      | `smtp.mailgun.org`      | 587  | Sandbox mode cho môi trường test / Sandbox for testing  |
| **SendGrid**     | `smtp.sendgrid.net`     | 587  | Free tier: 100 emails/day                               |

### Tạo Gmail App Password / Create a Gmail App Password

Nếu dùng Gmail, bạn **không** dùng mật khẩu Gmail thông thường.
Thay vào đó tạo "App Password":
If using Gmail, do **not** use your regular Gmail password.
Create an "App Password" instead:

1. Bật 2-Step Verification trên tài khoản Google / Enable 2-Step Verification.
2. Truy cập: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Chọn "Mail" và tạo mật khẩu 16 ký tự / Select "Mail" and generate a 16-character password.
4. Lưu mật khẩu này để dùng ở bước tiếp theo / Save this password for the next step.

---

## Bước 2 – Cài đặt dependencies cho Functions / Step 2 – Install function dependencies

```bash
cd functions
npm install
cd ..
```

---

## Bước 3 – Cấu hình SMTP qua Firebase Functions environment / Step 3 – Configure SMTP via Firebase Functions environment

Firebase Functions v2 đọc biến môi trường từ file **`functions/.env`** (hoặc
`functions/.env.local` cho môi trường cục bộ). Tạo file `functions/.env`:

Firebase Functions v2 reads environment variables from **`functions/.env`**
(or `functions/.env.local` for local development). Create `functions/.env`:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=English Excellence <your-gmail@gmail.com>
```

> ⚠️ **Không commit file `.env` lên Git** — file này đã được thêm vào `.gitignore`.
> **Do NOT commit `.env` to Git** — it is already in `.gitignore`.

Để bảo mật hơn với dữ liệu nhạy cảm (như mật khẩu), bạn có thể dùng
**Firebase Secret Manager** thay vì biến môi trường thông thường:
For better security with sensitive values (like passwords), you can use
**Firebase Secret Manager** instead of plain environment variables:

```bash
firebase functions:secrets:set EMAIL_PASS
# Firebase sẽ hỏi giá trị / Firebase will prompt for the value
```

Sau đó khai báo trong `functions/src/index.ts` / Then declare in `functions/src/index.ts`:
```typescript
export const onInquiryCreated = onDocumentCreated(
  { document: "inquiries/{id}", secrets: ["EMAIL_PASS"] },
  async (event) => { /* ... */ }
);
```

---

## Bước 4 – Build và deploy Functions / Step 4 – Build and deploy functions

```bash
# Build TypeScript → JavaScript
cd functions && npm run build && cd ..

# Deploy chỉ Cloud Functions / Deploy only Cloud Functions
firebase deploy --only functions
```

Sau khi deploy thành công, bạn sẽ thấy URL của mỗi function trong terminal.
Tuy nhiên, các function này là Firestore-triggered — chúng không có URL công khai.
After a successful deploy, you'll see each function listed in the terminal.
These functions are Firestore-triggered — they have no public URL.

---

## Bước 5 – Test / Step 5 – Test

1. Mở trang web và điền form "Book a Trial" / Open the site and submit the "Book a Trial" form.
2. Vào [Firebase Console → Firestore](https://console.firebase.google.com) →
   collection `inquiries` → kiểm tra document mới / check the new document.
3. Vào [Firebase Console → Functions → Logs](https://console.firebase.google.com) →
   kiểm tra log của function `onInquiryCreated` / check the logs for `onInquiryCreated`.
4. Kiểm tra hộp thư của admin (`leo@eehsc.com`) và email người dùng /
   Check the admin mailbox (`leo@eehsc.com`) and the user's email.

---

## Chạy local với Emulator / Running locally with the Emulator

```bash
# Tạo file .env.local cho emulator / Create .env.local for the emulator
cp functions/.env functions/.env.local
# (hoặc / or tạo functions/.env.local với thông tin test)

# Chạy emulator
firebase emulators:start --only functions,firestore
```

---

## Troubleshooting

| Lỗi / Error | Nguyên nhân / Cause | Giải pháp / Fix |
|---|---|---|
| `Error: Invalid login` | Sai thông tin SMTP / Wrong SMTP credentials | Kiểm tra lại `email.user` và `email.pass` |
| `Error: self-signed certificate` | Một số SMTP server dùng SSL tự ký | Đổi port sang 465 hoặc dùng provider khác |
| `Error: getaddrinfo ENOTFOUND` | Firebase plan không cho phép kết nối ngoài / Firebase plan blocks outbound connections | Nâng cấp lên Blaze plan |
| Function không được trigger / Function not triggered | Firestore rules chặn write / Firestore rules block writes | Kiểm tra `firestore.rules` |

---

## Cấu trúc thư mục / Directory structure

```
functions/
├── src/
│   └── index.ts        ← Source TypeScript (chỉnh sửa tại đây / edit here)
├── lib/                ← Compiled JavaScript (tự động tạo / auto-generated)
├── package.json
└── tsconfig.json
```

---

## Thay đổi địa chỉ email admin / Changing the admin email address

Mở `functions/src/index.ts` và sửa dòng:
Open `functions/src/index.ts` and update the line:

```typescript
const ADMIN_EMAIL = "leo@eehsc.com";
```

Sau đó build và deploy lại / Then rebuild and redeploy:
```bash
cd functions && npm run build && cd .. && firebase deploy --only functions
```
