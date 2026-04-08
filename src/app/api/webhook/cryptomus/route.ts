import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const API_KEY = '638520f9553203dcafbfece1656dddf883beab2b';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sign, ...data } = req.body;

    // Verify signature
    const expectedSign = crypto
      .createHash('md5')
      .update(JSON.stringify(data) + API_KEY)
      .digest('hex');

    if (sign !== expectedSign) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { order_id, status, amount, additional_data } = data;

    if (status === 'paid' || status === 'confirmed') {
      const { email, productId } = JSON.parse(additional_data || '{}');

      // Log successful payment
      console.log(`✅ Payment received: ${order_id}`);
      console.log(`   Product: ${productId}`);
      console.log(`   Amount: ${amount}`);
      console.log(`   Email: ${email}`);

      // TODO: Send download link to email
      // TODO: Update purchase tracking
      // TODO: Trigger product delivery

      return res.status(200).json({ success: true });
    }

    return res.status(200).json({ success: true, status });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
