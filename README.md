# 🩸 Blood Donation Application – Frontend (React)

## 📌 Project Overview
The **Blood Donation Application** is a MERN-stack based platform designed to connect blood donors with recipients in need.  
This frontend is built using **React** and focuses on delivering a clean, responsive, and user-friendly interface with role-based dashboards for **Donors**, **Volunteers**, and **Admins**.

The application emphasizes usability, accessibility, secure authentication, and modern UI design to ensure a seamless blood donation experience.

---

## 🎯 Purpose
The main goals of this project are:
- Facilitate blood donation requests efficiently
- Connect donors with recipients based on location and blood group
- Provide role-based dashboards and permissions
- Encourage voluntary blood donation through a smooth user experience
- Ensure data security and reliable deployment

---

## 🔗 Live Site
🌐 **Live Website:** https://blooddonationapplication-ca7f0.web.app

> ⚠️ The live site works without reload errors and all private routes remain accessible after refresh.

---

## 🛠️ Tech Stack
- **React**
- **React Router DOM**
- **Firebase Authentication**
- **Axios**
- **Tailwind CSS**
- **Stripe (for funding UI)**
- **Chart.js / Recharts** (Admin dashboard charts)
- **Framer Motion / AOS** (optional animations)

---

## ✨ Key Features

### 🔐 Authentication
- Email & Password based login and registration
- Firebase Authentication
- Default role assigned as **Donor**
- Private route protection using JWT / Firebase token
- Logged-in users stay authenticated on page reload

---

### 👥 User Roles & Dashboards

#### 🩸 Donor
- Create blood donation requests
- View latest 3 donation requests on dashboard
- View all personal donation requests with:
  - Pagination
  - Status filter (pending / inprogress / done / canceled)
- Edit & delete requests (only when pending)
- Update donation status (inprogress → done / canceled)
- Profile management

#### 🤝 Volunteer
- View all blood donation requests
- Filter donation requests
- Update donation status only
- Restricted from delete/edit actions

#### 🌐 Admin
- View system statistics
- Manage all users:
  - Block / unblock users
  - Change roles (donor → volunteer → admin)
- Manage all donation requests
- View total funding amount
- Donation analytics with charts:
  - Daily
  - Weekly
  - Monthly donation requests

---

## 🧭 Pages & Routes

### 🌍 Public Routes
- `/` → Home page
- `/login` → Login
- `/register` → Registration
- `/search` → Search donors
- `/donation-requests` → Pending donation requests

### 🔒 Private Routes
- `/dashboard`
- `/dashboard/profile`
- `/dashboard/my-donation-requests`
- `/dashboard/create-donation-request`
- `/dashboard/all-users` (Admin)
- `/dashboard/all-blood-donation-request`
- `/dashboard/funding`

---

## 🧾 Registration Fields
- Email
- Name
- Avatar (ImageBB upload)
- Blood Group
- District
- Upazila
- Password
- Confirm Password

---

## 💰 Funding System
- Stripe payment integration
- Users can donate funds securely
- Funding records displayed in tabular format
- Total funding visible on Admin & Volunteer dashboards

---

## 📊 Charts & Analytics (Admin)
- Daily donation requests
- Weekly donation requests
- Monthly donation requests
- Visualized using charts for quick insights

---

## 🎨 UI / UX Design Principles
- Consistent color theme
- Proper spacing & alignment
- Equal height cards
- Grid-based layout
- Responsive design (Mobile / Tablet / Desktop)
- Sidebar-based dashboard layout
- Recruiter-friendly, clean & modern UI
- New **X (Twitter)** logo used

---

## 🔐 Environment Variables
Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=https://your-backend-api.com
