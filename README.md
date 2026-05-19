# Prime Link Technologies

![Prime Link Logo](./public/logo.png)

Welcome to the **Prime Link Technologies** repository! This is a modern, responsive React application built with Vite and Tailwind CSS. It serves as a digital storefront and business showcase for Prime Link Technologies, offering reliable tech solutions for both business and personal use.

## Features

- **Modern UI/UX**: Designed with a sleek, high-tech aesthetic using Tailwind CSS.
- **Mobile Responsive**: Fully adaptive layout for desktop, tablet, and mobile devices.
- **Product Showcase**: Displays smartphones, laptops, tablets, ETR machines, and more.
- **Business Solutions**: Highlights software integration and enterprise IT services.
- **Contact & Support**: Built-in forms and contact information for immediate customer support.

## Tech Stack

- **React 18** (UI Library)
- **Vite** (Build Tool & Dev Server)
- **Tailwind CSS** (Styling & Layout)
- **TypeScript** (Static Typing)
- **Firebase** (Auth + Firestore — Spark free tier)
- **Cloudinary** (Product image uploads — free tier)
- **Lucide React** (Icons)
- **Radix UI** (Accessible primitives)

## Backend (Firebase + Cloudinary)

This app uses **Firebase** for data and admin auth, and **Cloudinary** for product images. Both have generous free tiers suitable for a small business site.

| Service | Free tier use |
|--------|----------------|
| **Firebase Auth** | Admin login at `/admin/login` |
| **Firestore** | Products catalog + contact form submissions |
| **Cloudinary** | Unsigned image uploads from the admin dashboard |

### 1. Firebase (Spark plan)

1. Create a project at [Firebase Console](https://console.firebase.google.com/) and choose the **Spark (free)** plan.
2. Enable **Authentication** → Sign-in method → **Email/Password**.
3. Create an admin user under **Authentication** → **Users** → **Add user**.
4. Enable **Firestore Database** → Create database → start in **production mode**.
5. Register a **Web app** and copy the config into `.env` (see `.env.example`).
6. Deploy security rules (requires [Firebase CLI](https://firebase.google.com/docs/cli)):
   ```bash
   firebase login
   firebase use your_project_id
   firebase deploy --only firestore:rules
   ```

### 2. Cloudinary (free tier)

1. Sign up at [Cloudinary](https://cloudinary.com/).
2. Note your **Cloud name** from the dashboard.
3. Go to **Settings** → **Upload** → **Upload presets** → **Add upload preset**:
   - Set **Signing Mode** to **Unsigned** (required for browser uploads without a secret).
   - Optionally set a folder name; the app uploads to `primelink-products`.
4. Add `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` to `.env`.

### 3. Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Without Firebase configured, the shop shows **seed products** from `src/data/products.ts` (read-only). Admin writes and the contact form require Firebase. Without Cloudinary, product image uploads in admin will not work.

### Firestore collections

- `products` — catalog (public read, admin write)
- `contactMessages` — contact form (public create, admin read)
- `orders` — checkout / M-Pesa payments (public create, admin read)

### M-Pesa checkout (Daraja API)

Checkout uses **Safaricom STK Push** via Vercel serverless functions (`/api/mpesa/stk-push`).

1. Create an app at [Safaricom Daraja](https://developer.safaricom.co.ke/).
2. Enable **Lipa Na M-Pesa Online** and note your **Passkey**, **Consumer Key**, and **Consumer Secret**.
3. In **Vercel → Settings → Environment Variables**, add (see `.env.example`):
   - `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_SHORTCODE`, `MPESA_PASSKEY`
   - `MPESA_ENV` — `sandbox` for testing, `production` when live
   - `MPESA_CALLBACK_URL` — `https://primelinktechnologies.vercel.app/api/mpesa/callback`
4. Redeploy after adding variables.
5. **Sandbox test phone:** `254708374149` (use in checkout).

Optional: set `FIREBASE_SERVICE_ACCOUNT` (JSON) in Vercel so paid orders update automatically when M-Pesa sends the callback.

Deploy Firestore rules: `firebase deploy --only firestore:rules`

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine. We recommend using `npm` or `bun` for package management.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Usernyagah/primelinktechnologies.git
   ```
2. Navigate into the project directory:
   ```bash
   cd primelinktechnologies
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App Locally

To start the development server, run:
```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) (or the port specified in your terminal) to view it in the browser.

### Building for Production

To create a production build, run:
```bash
npm run build
```

This will generate an optimized build in the `dist` folder, ready for deployment.

## License

This project is licensed under the MIT License.
