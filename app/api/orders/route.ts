import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        products:product_id (name, category, duration, price)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ orders: data });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    const { product_id, quantity } = await req.json();

    // Get product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check stock
    if (product.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
    }

    // Get user balance
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('balance')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const totalPrice = (product.discount_price || product.price) * quantity;

    if (user.balance < totalPrice) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        product_id,
        quantity,
        total_price: totalPrice,
        status: 'completed',
        product_details: product,
      })
      .select()
      .single();

    if (orderError) {
      return NextResponse.json({ error: orderError.message }, { status: 400 });
    }

    // Update user balance
    await supabase
      .from('users')
      .update({ balance: user.balance - totalPrice })
      .eq('id', userId);

    // Update product stock and sold count
    await supabase
      .from('products')
      .update({
        stock: product.stock - quantity,
        sold: product.sold + quantity,
      })
      .eq('id', product_id);

    // Create transaction record
    await supabase.from('transactions').insert({
      user_id: userId,
      amount: totalPrice,
      type: 'purchase',
      status: 'success',
      reference: order.id,
    });

    return NextResponse.json(
      { message: 'Order created successfully', order },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
