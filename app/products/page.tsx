'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Product } from '@/lib/supabase';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `/api/products?category=${category}`
          : '/api/products';
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const categories = [
    { name: 'ทั้งหมด', value: '' },
    { name: 'Netflix', value: 'netflix' },
    { name: 'YouTube', value: 'youtube' },
    { name: 'Disney+', value: 'disney' },
    { name: 'OTP', value: 'otp' },
    { name: 'อื่น ๆ', value: 'other' },
  ];

  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold mb-8">🛍️ สินค้าทั้งหมด</h1>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                category === cat.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">ไม่พบสินค้า</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105"
              >
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-40 flex items-center justify-center">
                  <span className="text-6xl">{product.icon}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-4">{product.description}</p>

                  <div className="mb-4">
                    {product.discount_price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-600">
                          ฿{product.discount_price}
                        </span>
                        <span className="text-sm line-through text-gray-400">
                          ฿{product.price}
                        </span>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          {Math.round(
                            ((product.price - product.discount_price) /
                              product.price) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-blue-600">
                        ฿{product.price}
                      </div>
                    )}
                  </div>

                  <div className="mb-4 text-xs text-gray-500">
                    <p>⏱️ {product.duration}</p>
                    <p>📦 ขายแล้ว {product.sold} | เหลือ {product.stock}</p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 rounded-lg hover:opacity-90 transition">
                    ซื้อเลย
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
