// File: /api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  // Replace with your real logic or API call
  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  res.status(200).json({ reply: `You said: ${message}` });
}
