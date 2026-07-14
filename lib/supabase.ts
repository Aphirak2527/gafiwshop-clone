import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for Database
export interface User {
  id: string;
  email: string;
  username: string;
  balance: number;
  created_at: string;
  is_admin: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  stock: number;
  sold: number;
  price: number;
  discount_price: number | null;
  duration: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  status: 'completed' | 'pending' | 'failed';
  product_details: string; // JSON stored as string
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'topup' | 'purchase';
  status: 'success' | 'pending' | 'failed';
  reference: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: 'news' | 'promotion' | 'maintenance' | 'update';
  created_at: string;
  admin_id: string;
}
