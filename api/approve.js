export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { action, paymentId } = req.body;

  if (action === 'payment_prepared') {
    try {
      const apiKey = process.env.PI_API_KEY;

      const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        return res.status(200).json({ status: 'approved' });
      } else {
        return res.status(500).json({ error: 'Ödeme onaylanamadı' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Sunucu hatası' });
    }
  }

  return res.status(400).send('Geçersiz işlem');
}
