export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { paymentId } = req.body || req.query;

  if (!paymentId) {
    return res.status(400).json({ error: "Payment ID eksik." });
  }

  const SERVER_API_KEY = "Key aovtij6uojvzjliwqrqvurploo2uct4ci6aajtifpw3b1mwkllsqf8cmdiu9dcwb"; 

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': SERVER_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ message: "Approved", data });
    } else {
      return res.status(response.status).json({ error: "Pi API Hatası", data });
    }
  } catch (error) {
    return res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
}
