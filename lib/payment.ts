// Payment Types & Constants

export interface PaymentQR {
  id: string;
  user_id: string;
  amount: number;
  qr_data: string; // QR Code data
  status: 'pending' | 'paid' | 'expired';
  reference: string; // PromptPay reference
  created_at: string;
  expires_at: string;
  paid_at?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'promptpay' | 'credit_card' | 'bank_transfer';
  name: string;
  icon: string;
  description: string;
  enabled: boolean;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'promptpay',
    type: 'promptpay',
    name: 'PromptPay',
    icon: '📱',
    description: 'แสกน QR Code เพื่อชำระเงิน',
    enabled: true,
  },
  {
    id: 'credit_card',
    type: 'credit_card',
    name: 'Credit Card',
    icon: '💳',
    description: 'Visa, MasterCard, AmEx',
    enabled: false, // Coming soon
  },
  {
    id: 'bank_transfer',
    type: 'bank_transfer',
    name: 'Bank Transfer',
    icon: '🏦',
    description: 'โอนเงินเข้าบัญชีธนาคาร',
    enabled: false, // Coming soon
  },
];

export const TOPUP_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];
export const PAYMENT_TIMEOUT = 15 * 60 * 1000; // 15 minutes
export const PROMPTPAY_MERCHANT_ID = '0066620005390'; // Mock ID
