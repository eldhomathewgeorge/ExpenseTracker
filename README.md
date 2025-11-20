# Expense Tracker — Full Project (Google Login)

Generated: 2025-11-20

This project includes:
- React + Vite + Tailwind CSS
- Firebase integration (Google Authentication + Firestore)
- Add Expense form with category -> description dependent dropdown
- Category Manager to add/edit categories and descriptions
- Expense List (per-user) with CSV export
- Analysis dashboard with charts and CSV export
- Protected routes and AuthContext using Google sign-in

## Setup steps (summary)

1. Install dependencies:
```bash
npm install
```

2. Create Firebase project and register a Web App. Copy its config.

3. Enable **Google** sign-in in Firebase Console -> Authentication -> Sign-in method.

4. In this project, open `src/firebase/config.js` and paste your Firebase web app config.

5. Optionally add initial categories in Firestore (collection `categories`).

6. Run dev server:
```bash
npm run dev
```

7. Build & deploy:
```bash
npm run build
```
Deploy the `dist` folder to GitHub Pages or Netlify.

## Notes & next steps
- Tighten Firestore rules before production.
- Implement group/family sharing if you want combined analytics.
- I can add GitHub Actions workflow for auto-deploy on push.

Enjoy!
