# wePrint — MERN Custom Printing Platform

A modular starter project inspired by the broad workflows of online print-commerce platforms. It is an original starter implementation, not a copy of Printo's branding, content, or proprietary design.

## Included
- Customer storefront: home, catalog/search/filter, product detail, customization (size/material/colour/quantity), artwork file selection, cart, checkout, account, order history, bulk quote request, contact.
- Admin: dashboard metrics, product CRUD, category CRUD, order status management, quote management, customer listing.
- Backend: Express MVC routes/controllers/models, JWT auth, role middleware, validation basics, MongoDB Atlas, seeded demo data.
- Separate frontend apps and ports: customer `5173`, admin `5174`, API `5000`.

## Requirements
Node.js 18+ and a MongoDB Atlas connection string.

## Setup
1. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies in each app:
   - `cd backend && npm install`
   - `cd ../frontend && npm install`
   - `cd ../admin && npm install`
3. Seed sample data: from `backend`, run `npm run seed`.
4. Run each app in a separate terminal using `npm run dev`.

## Demo account
Seeded admin: `admin@wePrint.local` / `Admin123!`
Seeded customer: `customer@wePrint.local` / `Customer123!`
Change these credentials before using the project beyond local evaluation.

## Environment
`MONGO_URI=mongodb+srv://...`
`JWT_SECRET=replace-with-a-long-random-secret`
`PORT=5000`
`CLIENT_URL=http://localhost:5173`

## Notes / production work still required
- Payment gateway is represented by Cash on Delivery / manual payment selection. Integrate Razorpay/Stripe with server-side order verification before accepting online payments.
- Artwork selection is currently stored as a filename in the order payload; configure cloud object storage (S3/Cloudinary) and signed uploads for production.
- Shipping rates, GST invoices, email/SMS notifications, stock reservation, refunds, audit logs, rate limiting, password reset, email verification, and advanced print-ready file preflight are extension points.
- Admin authentication is role-protected on the API. Set a strong secret and change seeded credentials.
