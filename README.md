# 🛍️ GaFiwShop Clone

Digital Product E-Commerce Platform - Netflix, YouTube Premium, OTP Numbers, และอื่น ๆ

![Next.js](https://img.shields.io/badge/Next.js-14-black) 
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

---

## 🚀 Features

### 🎯 Frontend
- ✅ หน้าแรกพร้อม Flash Sale & Announcements
- ✅ ระบบ Authentication (Register/Login)
- ✅ ตรวจสอบสินค้าทั้งหมดพร้อม Categories
- ✅ Shopping Cart & Checkout
- ✅ Dashboard ผู้ใช้ + ประวัติการสั่งซื้อ
- ✅ ระบบเติมเงิน (Top-up)
- ✅ Responsive Design (Mobile-friendly)

### ⚙️ Backend
- ✅ API Routes สำหรับทุกฟังชั่น
- ✅ Database Schema ใน PostgreSQL (Supabase)
- ✅ Row Level Security (RLS) Policies
- ✅ User Authentication with Supabase Auth
- ✅ Real-time Balance Updates
- ✅ Order Management System

### 📦 Architecture
- **Frontend**: Next.js 14 (App Router) + React 18
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Version Control**: GitHub

---

## 📋 Quick Start

### ก่อนเริ่ม - สร้าง Accounts
1. **GitHub**: https://github.com/signup
2. **Supabase**: https://supabase.com/dashboard
3. **Vercel**: https://vercel.com/signup

### ตั้งค่า Local Development
```bash
# Clone & Install
git clone <your-repo-url>
cd gafiwshop-clone
npm install

# Setup Environment
cp .env.example .env.local
# แก้ไข .env.local ด้วย Supabase credentials

# Run Development
npm run dev
# เปิด http://localhost:3000
```

### Deploy บน Vercel
```bash
git push origin main
# ไปที่ https://vercel.com/new
# เลือก repository → Configure → Deploy
```

📖 **ดูรายละเอียดเต็มที่**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 🏗️ Project Structure

```
gafiwshop-clone/
├── app/
│   ├── api/                    # Backend API Routes
│   │   ├── auth/              # Login & Register
│   │   ├── products/          # Get & Create Products
│   │   ├── orders/            # Orders Management
│   │   ├── topup/             # Balance Top-up
│   │   └── announcements/     # News & Promotions
│   ├── components/            # React Components
│   ├── dashboard/             # User Dashboard
│   ├── login/                 # Auth Pages
│   ├── register/
│   ├── products/              # Products Pages
│   └── page.tsx               # Home Page
├── lib/
│   ├── supabase.ts            # Supabase Client & Types
│   └── store.ts               # Zustand State Management
├── supabase_schema.sql        # Database Schema
├── SETUP_GUIDE.md             # Complete Setup
├── QUICKSTART.md              # Quick Start
└── .env.example               # Environment Template
```

---

## 💾 Database

### Tables
- users, products, orders, transactions, announcements

### Security
- Row Level Security (RLS)
- User-based Access Control
- Encrypted Passwords

---

## 🚀 Deploy

1. **GitHub Push**
2. **Vercel Import** (https://vercel.com/new)
3. **Set Environment Variables**
4. **Click Deploy!**

---

Made with ❤️ by GaFiwShop
