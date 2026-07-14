# 🚀 GaFiwShop Clone - Complete Setup Guide

บทความนี้จะแนะนำวิธีการตั้งค่าและ deploy โปรเจค GaFiwShop ให้ทำงานบน Vercel, Supabase, และ GitHub อย่างสมบูรณ์

---

## **📋 สิ่งที่ต้องเตรียม**

### Accounts ที่ต้องสร้าง:
1. **GitHub** - สำหรับเก็บโค้ด (https://github.com)
2. **Supabase** - สำหรับ Database (https://supabase.com)
3. **Vercel** - สำหรับ Hosting (https://vercel.com)

---

## **STEP 1: เตรียม GitHub Repository**

### 1.1 สร้าง Repository ใหม่

```bash
# เพิ่ม GitHub remote
git init
git add .
git commit -m "Initial commit: GaFiwShop Clone"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gafiwshop-clone.git
git push -u origin main
```

### 1.2 กรอก .gitignore
ไฟล์ `.gitignore` ถูกสร้างไว้แล้วตอน create-next-app ให้ตรวจสอบว่ามี:
```
node_modules/
.env.local
.env*.local
```

---

## **STEP 2: ตั้งค่า Supabase**

### 2.1 สร้าง Supabase Project
1. ไปที่ https://supabase.com และ Sign Up
2. สร้าง New Project
3. รอให้ Project สร้างเสร็จ (ใช้เวลา ~2 นาที)

### 2.2 เรียก SQL Schema
1. ไปที่ **SQL Editor** ในแดชบอร์ด
2. สร้าง New Query
3. คัดลอกเนื้อหาจาก `supabase_schema.sql`
4. กด **Run**

### 2.3 ได้รับ Credentials
1. ไปที่ **Settings → API**
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

### 2.3 สร้างไฟล์ .env.local
```bash
# คัดลอกจาก .env.example แล้วใส่ค่าจริง
cp .env.example .env.local
```

แก้ไข `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5...
ADMIN_SECRET_KEY=your-random-admin-key-here-change-it
```

---

## **STEP 3: ทดสอบ Local Development**

```bash
# ติดตั้ง dependencies (ถ้ายังไม่ได้)
npm install

# รัน dev server
npm run dev

# เปิด http://localhost:3000
```

### ทำให้มีสินค้า Mock ใน Database:
1. ไปที่ Supabase SQL Editor
2. สร้าง Query ใหม่ สำหรับแทรกสินค้า:

```sql
INSERT INTO products (name, description, icon, category, stock, price, discount_price, duration) VALUES
('Netflix 7 วัน (มือถือ)', 'ดูหนังฟรีจำกัด 1 อุปกรณ์', '🎬', 'netflix', 50, 39, 25, '7 days'),
('YouTube Premium 30 วัน', 'ไม่มีโฆษณา + ฟังเบื้องหลัง', '▶️', 'youtube', 30, 109, 89, '30 days'),
('Disney+ 30 วัน', 'ชมสารคดี Marvel DC ได้ไม่จำกัด', '🏰', 'disney', 40, 99, 79, '30 days'),
('Spotify 30 วัน', 'ฟังเพลงไม่จำกัด', '🎵', 'spotify', 60, 79, 59, '30 days');
```

---

## **STEP 4: Deploy บน Vercel**

### 4.1 เชื่อมต่อ GitHub กับ Vercel
1. ไปที่ https://vercel.com/new
2. กด "Import Git Repository"
3. เลือก `gafiwshop-clone` จาก GitHub

### 4.2 ตั้งค่า Environment Variables
ในหน้า "Environment Variables":

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5...
ADMIN_SECRET_KEY = your-random-admin-key-here
```

### 4.3 Deploy
กด **Deploy** และรอ ~5-10 นาที

สำเร็จ! เว็บของคุณจะอยู่ที่ `https://your-project.vercel.app`

---

## **STEP 5: ตั้งค่าเพิ่มเติม**

### เพิ่มสินค้าใหม่ผ่าน API:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your-admin-secret-key" \
  -d '{
    "name": "HBO Max 30 วัน",
    "description": "ดูซีรี่ส์ HBO ได้ไม่จำกัด",
    "icon": "📺",
    "category": "hbo",
    "stock": 100,
    "price": 149,
    "discount_price": 119,
    "duration": "30 days"
  }'
```

---

## **🐛 Troubleshooting**

### ปัญหา: "Connection refused at /api/products"
✅ แก้ไข: ตรวจสอบว่า `.env.local` มีค่า `NEXT_PUBLIC_SUPABASE_URL` ที่ถูกต้อง

### ปัญหา: "User not found in Supabase"
✅ แก้ไข: รัน SQL schema ใหม่ หรือสมัครสมาชิกใหม่

### ปัญหา: "Deployment fails on Vercel"
✅ แก้ไข: 
1. ตรวจสอบ Environment Variables บน Vercel
2. รัน `npm install` locally และ commit `package-lock.json`

---

## **📚 File Structure**

```
gafiwshop-clone/
├── app/
│   ├── api/              # Backend API routes
│   │   ├── auth/         # Login, Register
│   │   ├── products/     # Get & Create products
│   │   ├── orders/       # Orders management
│   │   ├── topup/        # Balance top-up
│   │   └── announcements/
│   ├── components/       # React components
│   ├── dashboard/        # User dashboard
│   ├── login/            # Login page
│   ├── register/         # Register page
│   ├── products/         # Products page
│   └── page.tsx          # Home page
├── lib/
│   ├── supabase.ts       # Supabase client & types
│   └── store.ts          # Zustand stores
├── supabase_schema.sql   # Database schema
└── .env.example          # Environment variables template
```

---

## **🔧 Development Tips**

### ดู Logs ของ API:
```bash
# ใน Terminal ที่รัน `npm run dev`
# ดู console logs สำหรับการ debug
```

### เข้า Supabase Admin:
- Database Editor: https://app.supabase.com
- ดู Users: Auth → Users
- ดู Database: SQL Editor

### เปลี่ยนราคาสินค้า:
```sql
UPDATE products SET discount_price = 29 WHERE name LIKE '%Netflix%';
```

---

## **🚀 Production Checklist**

- [ ] เปลี่ยน `ADMIN_SECRET_KEY` เป็น random string ยาว
- [ ] ตั้งค่า Custom Domain บน Vercel
- [ ] เปิด 2FA บน Supabase
- [ ] ตั้ง RLS Policies ให้ถูกต้องในการใช้งาน
- [ ] ตรวจสอบ API rate limits
- [ ] Setup backup database บน Supabase

---

## **📞 Support**

สำหรับปัญหา:
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs

Happy Coding! 🎉
