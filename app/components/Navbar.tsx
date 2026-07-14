'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg" />
          GaFiwShop
        </Link>

        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-blue-400 transition">
            หน้าแรก
          </Link>
          <Link href="/products" className="hover:text-blue-400 transition">
            สินค้า
          </Link>
          {user?.is_admin && (
            <Link href="/admin" className="hover:text-orange-400 transition">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="text-sm">
                <div className="font-semibold">{user.username}</div>
                <div className="text-blue-300">฿{user.balance.toFixed(2)}</div>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/dashboard"
                  className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition text-sm"
                >
                  ออกจากระบบ
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/register"
                className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700 transition"
              >
                สมัครสมาชิก
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
