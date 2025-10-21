// Vercel Serverless Function
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const word = req.query.word?.toUpperCase().trim();
  
  if (!word) {
    return res.status(400).json({ error: 'Word parameter required' });
  }
  
  try {
    // TDK API'ye istek at
    const tdkUrl = `https://sozluk.gov.tr/gts?ara=${encodeURIComponent(word)}`;
    const response = await fetch(tdkUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      const isValid = Array.isArray(data) && data.length > 0;
      return res.status(200).json({ 
        valid: isValid,
        word: word,
        source: 'TDK'
      });
    }
    
    // TDK başarısız olursa false dön
    return res.status(200).json({ 
      valid: false,
      word: word,
      source: 'TDK_FAILED'
    });
    
  } catch (error) {
    console.error('Error checking word:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      valid: false 
    });
  }
}
