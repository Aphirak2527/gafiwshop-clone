import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Get current balance
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('balance')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update balance
    const newBalance = user.balance + amount;
    const { error: updateError } = await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('id', userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    // Create transaction record
    const { data: transaction, error: transError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        amount,
        type: 'topup',
        status: 'success',
      })
      .select()
      .single();

    if (transError) {
      return NextResponse.json({ error: transError.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: 'Top-up successful',
        new_balance: newBalance,
        transaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Top-up error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
