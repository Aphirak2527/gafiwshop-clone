# ⚡ Quick Start (5 นาที)

## **3 ขั้นตอนสำหรับเริ่มใช้งาน**

### 1️⃣ **สมัครสร้าง Accounts**
```
1. GitHub: https://github.com/signup
2. Supabase: https://supabase.com/dashboard
3. Vercel: https://vercel.com/signup
```

### 2️⃣ **Clone & Setup Local**
```bash
# Clone repository นี้
git clone <your-repo-url>
cd gafiwshop-clone

# ติดตั้ง dependencies
npm install

# คัดลอก env template
cp .env.example .env.local

# แก้ไข .env.local ด้วย Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL = ...
# NEXT_PUBLIC_SUPABASE_ANON_KEY = ...
```

### 3️⃣ **Deploy บน Vercel**
```bash
# Push ขึ้น GitHub
git add .
git commit -m "Setup GaFiwShop"
git push

# ไปที่ https://vercel.com/new
# เลือก repository
# ใส่ Environment Variables
# กด Deploy!
```

---

## **ทดสอบระบบ**

✅ **หน้า Home**: https://your-domain.vercel.app
✅ **เข้าสู่ระบบ**: /login
✅ **สมัครสมาชิก**: /register
✅ **ดูสินค้า**: /products
✅ **Dashboard**: /dashboard

---

## **เพิ่มสินค้าตัวอย่าง**

ไปที่ Supabase SQL Editor รัน:
```sql
INSERT INTO products (name, icon, category, stock, price, discount_price, duration) VALUES
('Netflix 7 วัน', '🎬', 'netflix', 100, 39, 25, '7 days'),
('YouTube Premium', '▶️', 'youtube', 100, 109, 89, '30 days'),
('Disney+', '🏰', 'disney', 100, 99, 79, '30 days');
```

---

**ลงชื่อเข้าใช้ด้วย:**
- Email: test@example.com
- Password: password123

Done! 🎉
