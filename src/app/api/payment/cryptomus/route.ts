import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const MERCHANT_ID = '7eef8b12-e0c4-4ca8-8fd4-9ca384ff7be2';
const API_KEY = '638520f9553203dcafbfece1656dddf883beab2b';

const PRODUCTS = {
  'openclaw-security-skill': {
    name: 'OpenClaw Security Skill',
    price: 29,
    currency: 'USD',
    description: 'Automated security auditing script for OpenClaw',
  },
  'ai-ceo-template-pack': {
    name: 'AI CEO Template Pack',
    price: 49,
    currency: 'USD',
    description: 'Complete template set for launching an AI-run company',
  },
  'claude-code-power-pack': {
    name: 'Claude Code Power Pack',
    price: 79,
    currency: 'USD',
    description: 'Premium plugins and automation scripts for Claude Code',
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { productId, email } = req.body;

  if (!productId || !PRODUCTS[productId as keyof typeof PRODUCTS]) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  const product = PRODUCTS[productId as keyof typeof PRODUCTS];
  const orderId = `${productId}-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  try {
    // Create Cryptomus payment invoice
    const payload = {
      amount: product.price.toString(),
      currency: product.currency,
      order_id: orderId,
      url_return: 'https://talonforge-web.vercel.app/store/thanks',
      url_callback: 'https://talonforge-web.vercel.app/api/webhook/cryptomus',
      description: product.description,
      additional_data: JSON.stringify({ email, productId }),
      payer: { email },
    };

    // Generate sign
    const data = Buffer.from(JSON.stringify(payload)).toString('base64');
    const sign = crypto
      .createHash('md5')
      .update(data + API_KEY)
      .digest('hex');

    const response = await fetch('https://api.cryptomus.com/v1/payment', {
      method: 'POST',
      headers: {
        'merchant': MERCHANT_ID,
        'sign': sign,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.state === 0 && result.result) {
      return res.status(200).json({
        success: true,
        paymentUrl: result.result.url,
        orderId,
      });
    } else {
      return res.status(400).json({
        error: 'Failed to create payment',
        details: result.message || result,
      });
    }
  } catch (error) {
    console.error('Payment creation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
