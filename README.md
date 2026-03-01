<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# English Excellence - HSC Tutoring

Premium 1-on-1 HSC English tutoring focused on writing mastery, strategic feedback, and guaranteed Band 6 results.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and fill in your Firebase configuration values:
   `cp .env.example .env.local`
3. Run the app:
   `npm run dev`

## Firebase Setup

This project uses **Firebase Firestore** for data storage and **Firebase Hosting** for deployment.

### Configure Firebase

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database** in the Firebase console
3. Copy your Firebase config values into `.env.local`:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
4. Update `.firebaserc` with your project ID

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Build the app
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

### Firestore Collections

| Collection | Description |
|---|---|
| `inquiries` | Trial booking form submissions |
| `reviews` | Student testimonial submissions |
| `resource_signups` | Resource library email signups |

### Firestore Security Rules

Deploy the included `firestore.rules` to secure your database:
```bash
firebase deploy --only firestore:rules
```
