/**
 * ProphetAI Prime - Full-Stack Real Estate Valuation Controller & Gallery Engine
 */

let featureChartInstance = null;
let marketChartInstance = null;
let predictionHistory = [];
let currentGallery = [];
let activeHeroIndex = 0;

// Curated Property Gallery Imagery
const PROPERTY_GALLERIES = {
  'luxury-suburb': {
    title: '428 Cascade Ridge Dr, Seattle, WA',
    badge: '🏡 Luxury Villa',
    specs: '5 Beds • 4.5 Baths • 4,200 sqft • Built in 2022',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop'
    ],
    comps: [
      { addr: '412 Cascade Ridge Dr', price: '$1,290,000', specs: '5b / 4ba • 4,100 sqft', dist: '0.1 mi', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=400&auto=format&fit=crop' },
      { addr: '504 Mountain View Ave', price: '$1,215,000', specs: '4b / 4ba • 3,950 sqft', dist: '0.3 mi', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=400&auto=format&fit=crop' },
      { addr: '390 Lakeview Terrace', price: '$1,340,000', specs: '5b / 5ba • 4,400 sqft', dist: '0.6 mi', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=400&auto=format&fit=crop' },
    ]
  },
  'downtown-condo': {
    title: '700 Colorado St #24B, Austin, TX',
    badge: '🏢 Skyline Penthouse',
    specs: '2 Beds • 2 Baths • 1,450 sqft • Built in 2024',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop'
    ],
    comps: [
      { addr: '700 Colorado St #21A', price: '$865,000', specs: '2b / 2ba • 1,400 sqft', dist: '0.0 mi', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format&fit=crop' },
      { addr: '450 W 2nd St #18C', price: '$910,000', specs: '2b / 2ba • 1,520 sqft', dist: '0.4 mi', img: 'https://images.unsplash.com/photo-1502005229762-ee1b2b8ab98f?q=80&w=400&auto=format&fit=crop' },
      { addr: '301 West Ave #12E', price: '$840,000', specs: '2b / 1.5ba • 1,380 sqft', dist: '0.7 mi', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=400&auto=format&fit=crop' },
    ]
  },
  'family-home': {
    title: '1845 Tennyson St, Denver, CO',
    badge: '🏠 Modern Suburban Estate',
    specs: '4 Beds • 3 Baths • 2,600 sqft • Built in 2018',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop'
    ],
    comps: [
      { addr: '1820 Tennyson St', price: '$695,000', specs: '4b / 3ba • 2,550 sqft', dist: '0.1 mi', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=400&auto=format&fit=crop' },
      { addr: '1910 Stuart St', price: '$660,000', specs: '3b / 2.5ba • 2,400 sqft', dist: '0.4 mi', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=400&auto=format&fit=crop' },
      { addr: '1750 Perry St', price: '$720,000', specs: '4b / 3.5ba • 2,750 sqft', dist: '0.5 mi', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400&auto=format&fit=crop' },
    ]
  },
  'starter-townhouse': {
    title: '884 Piedmont Ave NE, Atlanta, GA',
    badge: '🏘️ Urban Townhouse',
    specs: '3 Beds • 2.5 Baths • 1,800 sqft • Built in 2019',
    images: [
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop'
    ],
    comps: [
      { addr: '890 Piedmont Ave NE', price: '$545,000', specs: '3b / 2.5ba • 1,820 sqft', dist: '0.1 mi', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop' },
      { addr: '920 Juniper St NE', price: '$525,000', specs: '3b / 2ba • 1,750 sqft', dist: '0.3 mi', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format&fit=crop' },
      { addr: '780 10th St NE', price: '$560,000', specs: '3b / 3ba • 1,900 sqft', dist: '0.6 mi', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=400&auto=format&fit=crop' },
    ]
  }
};

const PRESETS_DATA = {
  'luxury-suburb': {
    location: 'Seattle, WA - Capitol Hill',
    type: 'villa',
    condition: 'excellent',
    sqft: 4200,
    bedrooms: 5,
    bathrooms: 4.5,
    floors: 2,
    garage: 3,
    year: 2022,
    pool: true,
    waterfront: true,
    renovated: true
  },
  'downtown-condo': {
    location: 'Austin, TX - Downtown',
    type: 'condo',
    condition: 'excellent',
    sqft: 1450,
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    garage: 1,
    year: 2024,
    pool: true,
    waterfront: false,
    renovated: true
  },
  'family-home': {
    location: 'Denver, CO - Highlands',
    type: 'single-family',
    condition: 'good',
    sqft: 2600,
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    garage: 2,
    year: 2018,
    pool: false,
    waterfront: false,
    renovated: true
  },
  'starter-townhouse': {
    location: 'Atlanta, GA - Midtown',
    type: 'townhouse',
    condition: 'good',
    sqft: 1800,
    bedrooms: 3,
    bathrooms: 2.5,
    floors: 3,
    garage: 2,
    year: 2019,
    pool: false,
    waterfront: false,
    renovated: false
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initCharts();
  loadGalleryPreset('luxury-suburb');
  runPrediction();
});

function setupEventListeners() {
  // Sqft slider
  const sqftInput = document.getElementById('input-sqft');
  const sqftDisplay = document.getElementById('sqft-display');
  sqftInput.addEventListener('input', (e) => {
    sqftDisplay.innerText = `${parseInt(e.target.value).toLocaleString()} sqft`;
  });

  // Year slider
  const yearInput = document.getElementById('input-year');
  const yearDisplay = document.getElementById('year-display');
  yearInput.addEventListener('input', (e) => {
    const y = parseInt(e.target.value);
    const age = 2026 - y;
    yearDisplay.innerText = `${y} (${age === 0 ? 'New Construction' : `${age} yrs old`})`;
  });

  // Property Type Visual Buttons
  document.querySelectorAll('.prop-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.prop-type-btn').forEach(b => {
        b.className = 'prop-type-btn flex items-center gap-2 p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-400 hover:text-slate-200';
      });
      btn.className = 'prop-type-btn active flex items-center gap-2 p-2.5 rounded-xl border border-emerald-500 bg-emerald-950/30 text-xs font-semibold text-emerald-300';
      document.getElementById('input-property-type').value = btn.getAttribute('data-type');
    });
  });

  // Presets select
  document.getElementById('preset-select').addEventListener('change', (e) => {
    const key = e.target.value;
    if (key && PRESETS_DATA[key]) {
      applyPresetForm(PRESETS_DATA[key]);
      loadGalleryPreset(key);
      runPrediction();
    }
  });

  // Reset button
  document.getElementById('btn-reset-form').addEventListener('click', () => {
    applyPresetForm(PRESETS_DATA['family-home']);
    loadGalleryPreset('family-home');
    runPrediction();
  });
}

function adjustValue(inputId, delta) {
  const el = document.getElementById(inputId);
  let current = parseFloat(el.value) || 0;
  const step = parseFloat(el.step) || 1;
  const min = parseFloat(el.min) || 0;
  const max = parseFloat(el.max) || 100;

  let next = current + delta;
  if (next < min) next = min;
  if (next > max) next = max;

  el.value = next;
}

function loadGalleryPreset(key) {
  const g = PROPERTY_GALLERIES[key] || PROPERTY_GALLERIES['luxury-suburb'];
  currentGallery = g.images;
  activeHeroIndex = 0;

  document.getElementById('hero-property-image').src = g.images[0];
  document.getElementById('thumb-0').src = g.images[0];
  document.getElementById('thumb-1').src = g.images[1];
  document.getElementById('thumb-2').src = g.images[2];
  document.getElementById('hero-badge-type').innerText = g.badge;
  document.getElementById('property-title').innerText = g.title;
  document.getElementById('property-specs-tag').innerText = g.specs;

  // Render Comps Cards
  const compsGrid = document.getElementById('comps-grid');
  if (compsGrid && g.comps) {
    compsGrid.innerHTML = g.comps.map(c => `
      <div class="bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/40 transition">
        <div class="h-28 w-full overflow-hidden">
          <img src="${c.img}" alt="${c.addr}" class="w-full h-full object-cover" />
        </div>
        <div class="p-3">
          <div class="flex justify-between items-start">
            <span class="text-xs font-bold text-white truncate max-w-[130px]">${c.addr}</span>
            <span class="text-xs font-bold text-emerald-400 font-mono">${c.price}</span>
          </div>
          <p class="text-[10px] text-slate-400 mt-0.5">${c.specs}</p>
          <span class="inline-block text-[10px] px-1.5 py-0.5 mt-2 rounded bg-slate-800 text-slate-300 font-mono">${c.dist} away</span>
        </div>
      </div>
    `).join('');
  }
}

function switchHeroImage(index) {
  if (!currentGallery || !currentGallery[index]) return;
  activeHeroIndex = index;
  document.getElementById('hero-property-image').src = currentGallery[index];
}

function applyPresetForm(p) {
  document.getElementById('input-location').value = p.location;
  document.getElementById('input-property-type').value = p.type;
  
  // Update visual buttons
  document.querySelectorAll('.prop-type-btn').forEach(b => {
    if (b.getAttribute('data-type') === p.type) {
      b.className = 'prop-type-btn active flex items-center gap-2 p-2.5 rounded-xl border border-emerald-500 bg-emerald-950/30 text-xs font-semibold text-emerald-300';
    } else {
      b.className = 'prop-type-btn flex items-center gap-2 p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-400 hover:text-slate-200';
    }
  });

  document.getElementById('input-condition').value = p.condition;
  document.getElementById('input-sqft').value = p.sqft;
  document.getElementById('sqft-display').innerText = `${p.sqft.toLocaleString()} sqft`;
  document.getElementById('input-bedrooms').value = p.bedrooms;
  document.getElementById('input-bathrooms').value = p.bathrooms;
  document.getElementById('input-floors').value = p.floors;
  document.getElementById('input-garage').value = p.garage;
  document.getElementById('input-year').value = p.year;
  const age = 2026 - p.year;
  document.getElementById('year-display').innerText = `${p.year} (${age === 0 ? 'New Construction' : `${age} yrs old`})`;
  document.getElementById('amenity-pool').checked = p.pool;
  document.getElementById('amenity-waterfront').checked = p.waterfront;
  document.getElementById('amenity-renovated').checked = p.renovated;
}

// Prediction Handler
async function runPrediction() {
  const payload = {
    location: document.getElementById('input-location').value,
    propertyType: document.getElementById('input-property-type').value,
    condition: document.getElementById('input-condition').value,
    sqft: parseInt(document.getElementById('input-sqft').value),
    bedrooms: parseFloat(document.getElementById('input-bedrooms').value),
    bathrooms: parseFloat(document.getElementById('input-bathrooms').value),
    floors: parseInt(document.getElementById('input-floors').value),
    garage: parseInt(document.getElementById('input-garage').value),
    yearBuilt: parseInt(document.getElementById('input-year').value),
    hasPool: document.getElementById('amenity-pool').checked,
    isWaterfront: document.getElementById('amenity-waterfront').checked,
    isRenovated: document.getElementById('amenity-renovated').checked,
  };

  try {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      updateDashboard(data);
    } else {
      const fallback = computeLocalValuation(payload);
      updateDashboard(fallback);
    }
  } catch (err) {
    const fallback = computeLocalValuation(payload);
    updateDashboard(fallback);
  }
}

function computeLocalValuation(p) {
  const locSelect = document.getElementById('input-location');
  const selectedOpt = locSelect.options[locSelect.selectedIndex];
  const baseRate = parseFloat(selectedOpt.getAttribute('data-base')) || 480;

  let base = p.sqft * baseRate;
  const typeMult = { 'single-family': 1.05, 'condo': 0.95, 'townhouse': 0.90, 'villa': 1.25 }[p.propertyType] || 1.0;
  base *= typeMult;

  base += (p.bedrooms * 28000) + (p.bathrooms * 35000) + (p.garage * 22000);

  const age = 2026 - p.yearBuilt;
  base *= Math.max(0.75, 1 - (age * 0.006));

  const condMult = { 'excellent': 1.15, 'good': 1.05, 'average': 0.95, 'fair': 0.85 }[p.condition] || 1.0;
  base *= condMult;

  if (p.hasPool) base += 45000;
  if (p.isWaterfront) base *= 1.18;
  if (p.isRenovated) base *= 1.08;

  const finalPrice = Math.round(base / 500) * 500;
  const margin = Math.round(finalPrice * 0.05);

  // Mortgage at 6.45% 30-year fixed, 20% down
  const loanAmount = finalPrice * 0.80;
  const monthlyRate = 0.0645 / 12;
  const nMonths = 360;
  const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, nMonths)) / (Math.pow(1 + monthlyRate, nMonths) - 1);
  const monthlyTax = (finalPrice * 0.011) / 12;
  const monthlyInsurance = (finalPrice * 0.0035) / 12;
  const totalMonthlyMortgage = Math.round(monthlyPI + monthlyTax + monthlyInsurance);

  return {
    success: true,
    predictedPrice: finalPrice,
    lowEstimate: finalPrice - margin,
    highEstimate: finalPrice + margin,
    pricePerSqft: (finalPrice / p.sqft).toFixed(2),
    monthlyRent: Math.round(finalPrice * 0.0039),
    annualTax: Math.round(finalPrice * 0.011),
    monthlyMortgage: totalMonthlyMortgage,
    appreciation5Yr: 24.8,
    contributions: [
      { feature: 'Location / Market', importance: 38 },
      { feature: 'Square Footage', importance: 32 },
      { feature: 'Beds & Baths', importance: 14 },
      { feature: 'Year Built', importance: 8 },
      { feature: 'Amenities', importance: 8 },
    ],
    payload: p
  };
}

function updateDashboard(data) {
  const priceEl = document.getElementById('predicted-price');
  priceEl.innerText = `$${data.predictedPrice.toLocaleString()}`;
  priceEl.classList.remove('price-pulse');
  void priceEl.offsetWidth;
  priceEl.classList.add('price-pulse');

  document.getElementById('price-range').innerText = `$${data.lowEstimate.toLocaleString()} – $${data.highEstimate.toLocaleString()}`;
  document.getElementById('price-per-sqft').innerText = `$${data.pricePerSqft}`;
  document.getElementById('metric-rent').innerText = `$${data.monthlyRent.toLocaleString()} / mo`;
  document.getElementById('metric-tax').innerText = `$${data.annualTax.toLocaleString()} / yr`;
  document.getElementById('metric-mortgage').innerText = `$${(data.monthlyMortgage || 6280).toLocaleString()} / mo`;

  updateFeatureChart(data.contributions);
  updateMarketChart(data.predictedPrice);
  addToHistory(data);
}

function initCharts() {
  const ctxFeature = document.getElementById('featureChart').getContext('2d');
  featureChartInstance = new Chart(ctxFeature, {
    type: 'bar',
    data: {
      labels: ['Location', 'Sq. Footage', 'Beds/Baths', 'Year Built', 'Amenities'],
      datasets: [{
        label: 'Feature Weight (%)',
        data: [38, 32, 14, 8, 8],
        backgroundColor: [
          'rgba(16, 185, 129, 0.85)',
          'rgba(99, 102, 241, 0.85)',
          'rgba(245, 158, 11, 0.85)',
          'rgba(6, 182, 212, 0.85)',
          'rgba(236, 72, 153, 0.85)',
        ],
        borderRadius: 8,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } },
        y: { grid: { display: false }, ticks: { color: '#e2e8f0', font: { weight: '600' } } }
      }
    }
  });

  const ctxMarket = document.getElementById('marketChart').getContext('2d');
  marketChartInstance = new Chart(ctxMarket, {
    type: 'line',
    data: {
      labels: ['25th %ile', 'Median', '75th %ile', 'This Property', '90th %ile'],
      datasets: [{
        label: 'Neighborhood Price Curve ($)',
        data: [750000, 980000, 1150000, 1248500, 1450000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: ['#64748b', '#64748b', '#64748b', '#f59e0b', '#64748b'],
        pointRadius: [4, 4, 4, 8, 4],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } },
        y: {
          grid: { color: 'rgba(51, 65, 85, 0.3)' },
          ticks: { color: '#94a3b8', callback: (val) => `$${(val / 1000).toFixed(0)}k` }
        }
      }
    }
  });
}

function updateFeatureChart(contributions) {
  if (!featureChartInstance || !contributions) return;
  featureChartInstance.data.labels = contributions.map(c => c.feature);
  featureChartInstance.data.datasets[0].data = contributions.map(c => c.importance);
  featureChartInstance.update();
}

function updateMarketChart(currentPrice) {
  if (!marketChartInstance) return;
  const p25 = Math.round(currentPrice * 0.72);
  const median = Math.round(currentPrice * 0.88);
  const p75 = Math.round(currentPrice * 1.05);
  const p90 = Math.round(currentPrice * 1.22);
  marketChartInstance.data.datasets[0].data = [p25, median, p75, currentPrice, p90];
  marketChartInstance.update();
}

function addToHistory(data) {
  const item = {
    id: Date.now(),
    location: data.payload.location.split('—')[0].trim(),
    type: data.payload.propertyType,
    specs: `${data.payload.bedrooms}b / ${data.payload.bathrooms}ba`,
    sqft: `${data.payload.sqft.toLocaleString()} sqft`,
    price: data.predictedPrice,
    payload: data.payload
  };

  predictionHistory.unshift(item);
  if (predictionHistory.length > 6) predictionHistory.pop();
  renderHistory();
}

function renderHistory() {
  const tbody = document.getElementById('history-table-body');
  if (predictionHistory.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500">No predictions recorded in this session.</td></tr>`;
    return;
  }

  tbody.innerHTML = predictionHistory.map(h => `
    <tr class="hover:bg-slate-950/60">
      <td class="p-2.5 font-medium text-slate-200">${escapeHtml(h.location)}</td>
      <td class="p-2.5 text-slate-400 capitalize">${escapeHtml(h.type)} • <span class="font-mono">${h.specs}</span></td>
      <td class="p-2.5 font-mono text-slate-300">${h.sqft}</td>
      <td class="p-2.5 font-bold font-mono text-emerald-400">$${h.price.toLocaleString()}</td>
      <td class="p-2.5 text-right">
        <button onclick="reloadFromHistory(${h.id})" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold">
          Reload
        </button>
      </td>
    </tr>
  `).join('');
}

function reloadFromHistory(id) {
  const found = predictionHistory.find(h => h.id === id);
  if (found) {
    applyPresetForm(found.payload);
    runPrediction();
    showToast('Loaded property specifications.');
  }
}

function clearHistory() {
  predictionHistory = [];
  renderHistory();
}

function exportValuationReport() {
  const price = document.getElementById('predicted-price').innerText;
  const prop = document.getElementById('property-title').innerText;
  const range = document.getElementById('price-range').innerText;

  document.getElementById('rep-prop').innerText = prop;
  document.getElementById('rep-price').innerText = price;
  document.getElementById('rep-band').innerText = range;
  document.getElementById('modal-report').classList.remove('hidden');
}

function closeReportModal() {
  document.getElementById('modal-report').classList.add('hidden');
}

function showToast(msg) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'bg-slate-900/95 border border-emerald-500/60 text-slate-100 px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2';
  toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i> <span>${escapeHtml(msg)}</span>`;
  container.appendChild(toast);
  lucide.createIcons();
  setTimeout(() => toast.remove(), 3000);
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
