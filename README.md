# 🏡 ProphetAI Prime — Enterprise House Price Predictor & Valuation Engine

A modern, production-grade **Full-Stack Real Estate Automated Valuation Model (AVM)** and Predictive Analytics Web Application powered by **FastAPI**, **Scikit-Learn**, **Tailwind CSS**, and **Chart.js**.

![ProphetAI Banner](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop)

---

## 🚀 Key Features

### 1. 📸 Dynamic Property Photo Showcase
- **High-Resolution Photography**: Exterior, living room, and master suite photos that dynamically adapt to the selected property type (*Luxury Villa*, *Downtown Penthouse*, *Modern Suburban Estate*, *Urban Eco Townhouse*).
- **Photo Carousel**: Instant thumbnail switching with 3D virtual tour badges.

### 2. 🧠 Machine Learning Valuation Engine
- **Hedonic Regression & Gradient Boosting Ensemble**: High-precision automated valuation calculating 95% Confidence Intervals (low-high estimation bands).
- **Feature Weights (SHAP Decomposition)**: Bar chart visualizing the exact valuation impact of location, square footage, beds/baths, age, and amenities.

### 3. 🏘️ Nearby Comparable Sales (Market Comps)
- Visual comp cards showing nearby recently sold properties with photos, prices, square footage, and distance radius.

### 4. 📊 Neighborhood Scorecards & Living Index
- 🎓 **School Rating**: 9 / 10 (Top Rated District)
- 🚶 **Walk Score**: 88 / 100 (Very Walkable)
- 🛡️ **Safety Score**: A+ (Low Crime Zone)
- ☀️ **Solar Potential**: 94% (Prime Efficiency)

### 5. 💰 FinTech Investment & Mortgage Calculator
- **30-Year Fixed Mortgage Estimator**: Live monthly payment calculations at 6.45% APR benchmark.
- **Estimated Monthly Rent**: Rental yield and cash flow projections.
- **5-Year Projected Appreciation**: Capital appreciation estimates.
- **Annual Property Tax**: County tax estimation.

### 6. 📄 Appraisal Report Generation
- Formal certified appraisal certificate export with 1-click **Print / Save to PDF**.

---

## 🛠️ Quick Start

### 1-Click Launch (Windows)
Double-click [`start.bat`](start.bat) to launch the server and open `http://localhost:8000`.

### Using Python FastAPI
```bash
pip install -r requirements.txt
python -m uvicorn app:app --port 8000 --reload
```

### Using Node.js
```bash
node server.js
```

---

## 📂 Project Structure

```
house-price-predictor/
├── public/
│   ├── index.html      # Responsive Single-Page Dashboard UI
│   ├── styles.css      # Styling, sliders, glow effects & animations
│   └── app.js          # Interactive valuation logic, galleries & Chart.js
├── app.py              # Python FastAPI + Scikit-Learn ML backend
├── server.js           # Node.js backend server fallback
├── requirements.txt    # Python dependencies
├── start.bat           # 1-Click Windows startup launcher
├── .gitignore          # Git ignore configuration
└── README.md           # Documentation
```

---

## 🛡️ License
MIT License. Created with ❤️ for advanced real estate analytics.
