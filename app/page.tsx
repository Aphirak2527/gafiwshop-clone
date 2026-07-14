'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from './components/Layout';
import { Product, Announcement } from '@/lib/supabase';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, announcementsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/announcements'),
        ]);

        const productsData = await productsRes.json();
        const announcementsData = await announcementsRes.json();

        setProducts(productsData.products?.slice(0, 8) || []);
        setAnnouncements(announcementsData.announcements?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">🎉 ยินดีต้อนรับสู่ GaFiwShop</h1>
          <p className="text-xl mb-6">
            ร้านขายสินค้าดิจิทัลชั้นนำ Netflix, YouTube Premium, และอื่น ๆ อีกมากมาย
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            ดูสินค้าทั้งหมด →
          </Link>
        </div>
      </section>

      {/* Announcements */}
      {announcements.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">📢 ประกาศข่าวสาร</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((announce) => (
              <div key={announce.id} className="bg-white rounded-lg shadow-md p-6">
                {announce.image_url && (
                  <img
                    src={announce.image_url}
                    alt={announce.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                  {announce.category}
                </span>
                <h3 className="font-bold text-lg mb-2">{announce.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {announce.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Flash Sale */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-900">⚡ Flash Sale</h2>
          <Link href="/products" className="text-blue-600 hover:underline">
            ดูทั้งหมด →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-32 flex items-center justify-center">
                  <span className="text-5xl">{product.icon}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    {product.discount_price ? (
                      <>
                        <span className="text-lg font-bold text-blue-600">
                          ฿{product.discount_price}
                        </span>
                        <span className="text-sm line-through text-gray-400">
                          ฿{product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-blue-600">
                        ฿{product.price}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{product.duration}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-600">
                      ขายแล้ว {product.sold} เหลือ {product.stock}
                    </span>
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition text-sm font-bold"
                  >
                    ซื้อเลย
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-bold mb-2">จัดส่งทันที</h3>
          <p className="text-gray-600 text-sm">สินค้าถูกส่งทันทีหลังชำระเงิน</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="font-bold mb-2">ปลอดภัย 100%</h3>
          <p className="text-gray-600 text-sm">ระบบเข้ารหัสและปลอดภัยสูงสุด</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="font-bold mb-2">ติดต่อ 24/7</h3>
          <p className="text-gray-600 text-sm">ทีมงานพร้อมช่วยเหลือตลอดเวลา</p>
        </div>
      </section>
    </Layout>
  );
}
