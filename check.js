// Kelime Mania - TDK Sözlük API Backend (Netlify)
const fetch = require('node-fetch');

// Kelime cache
const wordCache = new Map();

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // OPTIONS request için
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // Sadece GET kabul et
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Sadece GET metodu destekleniyor' })
    };
  }
  
  // Query parametresinden kelimeyi al
  const word = event.queryStringParameters?.word;
  
  if (!word) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        error: 'Kelime parametresi eksik',
        usage: '/.netlify/functions/check?word=MASA' 
      })
    };
  }
  
  const normalized = word.toUpperCase().trim();
  
  // Çok kısa kelimeler
  if (normalized.length < 2) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        word: normalized,
        valid: false,
        source: 'length_check'
      })
    };
  }
  
  // Cache kontrolü
  if (wordCache.has(normalized)) {
    console.log('Cache hit:', normalized);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        word: normalized,
        valid: wordCache.get(normalized),
        source: 'cache'
      })
    };
  }
  
  try {
    // TDK API çağrısı
    const tdkUrl = `https://sozluk.gov.tr/gts?ara=${encodeURIComponent(normalized)}`;
    console.log('TDK API çağrısı:', normalized);
    
    const response = await fetch(tdkUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'KeliMania/1.0'
      },
      timeout: 8000
    });
    
    if (!response.ok) {
      console.error('TDK API hatası:', response.status);
      wordCache.set(normalized, false);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          word: normalized,
          valid: false,
          source: 'tdk_error'
        })
      };
    }
    
    const data = await response.json();
    
    // TDK yanıtını kontrol et
    const isValid = Array.isArray(data) && 
                    data.length > 0 && 
                    data[0].anlamlarListe &&
                    Array.isArray(data[0].anlamlarListe) &&
                    data[0].anlamlarListe.length > 0;
    
    // Cache'e kaydet
    wordCache.set(normalized, isValid);
    
    console.log('TDK sonucu:', normalized, isValid ? 'GEÇERLİ' : 'GEÇERSİZ');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        word: normalized,
        valid: isValid,
        source: 'tdk',
        meanings: isValid ? data[0].anlamlarListe.length : 0
      })
    };
    
  } catch (error) {
    console.error('API Hatası:', error.message);
    
    wordCache.set(normalized, false);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        word: normalized,
        valid: false,
        source: 'error',
        error: error.message
      })
    };
  }
};
