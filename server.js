const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'POST' && parsedUrl.pathname === '/api/predict') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const p = JSON.parse(body);
        const baseRate = 480;
        let base = p.sqft * baseRate;
        if (p.propertyType === 'condo') base *= 0.95;
        if (p.propertyType === 'villa') base *= 1.25;
        base += (p.bedrooms * 28000) + (p.bathrooms * 35000) + (p.garage * 22000);
        if (p.hasPool) base += 45000;
        if (p.isWaterfront) base *= 1.18;
        if (p.isRenovated) base *= 1.08;

        const finalPrice = Math.round(base / 500) * 500;
        const margin = Math.round(finalPrice * 0.05);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          predictedPrice: finalPrice,
          lowEstimate: finalPrice - margin,
          highEstimate: finalPrice + margin,
          pricePerSqft: (finalPrice / p.sqft).toFixed(2),
          monthlyRent: Math.round(finalPrice * 0.0039),
          annualTax: Math.round(finalPrice * 0.011),
          appreciation5Yr: 24.8,
          marketDelta: 8.4,
          contributions: [
            { feature: 'Location / Market', importance: 38 },
            { feature: 'Square Footage', importance: 32 },
            { feature: 'Beds & Baths', importance: 14 },
            { feature: 'Year Built', importance: 8 },
            { feature: 'Amenities', importance: 8 },
          ],
          payload: p
        }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // Static files
  let filePath = path.join(PUBLIC_DIR, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const mime = ext === '.html' ? 'text/html' : ext === '.css' ? 'text/css' : 'application/javascript';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`ProphetAI Predictor server running at http://localhost:${PORT}`);
});
