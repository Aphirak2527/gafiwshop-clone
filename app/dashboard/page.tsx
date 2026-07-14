'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import { useAuthStore } from '@/lib/store';
import { Order } from '@/lib/supabase';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [topupAmount, setTopupAmount] = useState('100');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [user, router]);

  const fetchOrders = async () => {
    try {
      const session = JSON.parse(localStorage.getItem('session') || '{}');
      const res = await fetch('/api/orders', {
        headers: { 'x-user-id': user?.id || '' },
      });
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopup = async () => {
    try {
      const amount = parseFloat(topupAmount);
      if (amount <= 0) {
        alert('กรุณากรอกจำนวนเงินที่ถูกต้อง');
        return;
      }

      const res = await fetch('/api/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || '',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('เติมเงินสำเร็จ! ยอดปัจจุบัน: ฿' + data.new_balance);
        setShowTopupModal(false);
        setTopupAmount('100');
        // Refresh user balance
        window.location.reload();
      } else {
        alert('เติมเงินล้มเหลว: ' + data.error);
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาด');
      console.error(error);
    }
  };

  if (!user) {
    return <Layout><div>กำลังตรวจสอบสิทธิ์...</div></Layout>;
  }

  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8 shadow-lg">
          <p className="text-lg mb-2">ยอดเงินคงเหลือ</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-5xl font-bold">฿{user.balance.toFixed(2)}</p>
            </div>
            <button
              onClick={() => setShowTopupModal(true)}
              className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              + เติมเงิน
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">ชื่อผู้ใช้</p>
            <p className="text-2xl font-bold">{user.username}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">อีเมล</p>
            <p className="text-lg font-semibold break-all">{user.email}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">สมาชิก</p>
            <p className="text-lg font-semibold">
              {user.is_admin ? '👨‍💼 Admin' : '👤 สมาชิกทั่วไป'}
            </p>
          </div>
        </div>

        {/* Orders History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">📋 ประวัติสั่งซื้อ</h2>

          {loading ? (
            <p className="text-gray-500">กำลังโหลด...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">ยังไม่มีประวัติการสั่งซื้อ</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">สินค้า</th>
                    <th className="px-4 py-2 text-left">จำนวน</th>
                    <th className="px-4 py-2 text-left">ราคา</th>
                    <th className="px-4 py-2 text-left">สถานะ</th>
                    <th className="px-4 py-2 text-left">วันที่</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">
                        {typeof order.product_details === 'string'
                          ? JSON.parse(order.product_details)?.name || 'Unknown Product'
                          : (order.product_details as any)?.name || 'Unknown Product'}
                      </td>
                      <td className="px-4 py-2">{order.quantity}</td>
                      <td className="px-4 py-2">฿{order.total_price}</td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status === 'completed' ? '✓ สำเร็จ' : '⏳ รอดำเนินการ'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(order.created_at).toLocaleDateString('th-TH')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top-up Modal */}
        {showTopupModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 w-96">
              <h2 className="text-2xl font-bold mb-4">เติมเงิน</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  จำนวนเงิน (บาท)
                </label>
                <div className="flex gap-2 mb-3">
                  {['100', '500', '1000', '2000'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setTopupAmount(amt)}
                      className={`px-3 py-2 rounded ${
                        topupAmount === amt
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      ฿{amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="10"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleTopup}
                  className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700"
                >
                  ยืนยัน
                </button>
                <button
                  onClick={() => setShowTopupModal(false)}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-400"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
