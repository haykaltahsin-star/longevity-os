# ∞ LONGEVITY OS v4.0

Personalized health & longevity dashboard with WHOOP integration, blood test tracking, AI health coach, and comprehensive anti-aging protocols.

## Features

- **Dashboard** — Daily routine, priorities, mentor sources
- **WHOOP Tracker** — Manual input for 12 WHOOP metrics with trend charts
- **Blood Tests** — Track 25+ biomarkers with optimal longevity targets
- **Biomarkers** — Full panel with color-coded zones (optimal/warning/critical)
- **Protocols** — 11 anti-aging protocols with evidence ratings
- **Supplements** — 14 supplements prioritized (Essential/Important/Moderate)
- **Exercise** — Weekly training plan (strength + Zone 2 + VO2max)
- **Nutrition** — Macros, principles, superfoods
- **Sleep** — Protocol and target metrics
- **Screening** — Medical screening calendar with due dates
- **AI Coach** — Claude-powered health chatbot with access to all your data
- **RO/EN** — Full bilingual support (Romanian/English)

## Tech Stack

- **Frontend:** React 18 + Vite
- **Storage:** localStorage (data stays on your device)
- **AI Chat:** Claude API via Vercel Serverless Function
- **Hosting:** Vercel (free tier works perfectly)
- **PWA:** Add to Home Screen on iPhone/Android

---

## 🚀 Deployment Guide (Step by Step)

### Prerequisites

1. A [GitHub](https://github.com) account
2. A [Vercel](https://vercel.com) account (sign up with GitHub — free)
3. An [Anthropic API key](https://console.anthropic.com/settings/keys) (for AI Coach)
4. [Node.js](https://nodejs.org) installed on your computer (v18+)
5. [Git](https://git-scm.com) installed

### Step 1: Download & Set Up Locally

```bash
# Clone or download this project to your computer
# Navigate into the project folder
cd longevity-os

# Install dependencies
npm install

# Test locally
npm run dev
```

Open `http://localhost:5173` in your browser to verify everything works.

### Step 2: Create a GitHub Repository

```bash
# Initialize git
git init
git add .
git commit -m "LONGEVITY OS v4.0"

# Create a new repo on github.com (click "New Repository")
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/longevity-os.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `longevity-os` repository
4. Vercel auto-detects Vite — click **"Deploy"**
5. Wait 1-2 minutes for build to complete
6. Your app is live at `https://longevity-os-xxxxx.vercel.app`

### Step 4: Add the Anthropic API Key

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add a new variable:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-your-key-here`
   - **Environment:** Production, Preview, Development
3. Click **Save**
4. Go to **Deployments** → click the **three dots (⋮)** on the latest → **Redeploy**

### Step 5: Add to iPhone Home Screen (PWA)

1. Open your Vercel URL in **Safari** on iPhone
2. Tap the **Share button** (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it "Longevity OS" and tap **Add**
5. The app now appears on your home screen like a native app!

### Step 6 (Optional): Custom Domain

1. In Vercel → **Settings** → **Domains**
2. Add your domain (e.g., `health.yourdomain.com`)
3. Follow DNS instructions

---

## 📱 Daily Usage

### WHOOP Data (30 seconds/day)
1. Open WHOOP app on iPhone
2. Note: Recovery %, HRV, RHR, Sleep Score, Deep Sleep, REM
3. Open Longevity OS → WHOOP tab → "+ Add Data" → Save

### Blood Tests (after each lab visit)
1. Get your results from the lab (Synevo, MedLife, etc.)
2. Open Longevity OS → Lab Results tab → "+ Add Results"
3. Enter the values for each biomarker → Save

### AI Coach
1. Go to AI Coach tab
2. Ask anything: "What should I adjust based on my latest labs?"
3. The AI has full context of your WHOOP data, labs, and protocols

---

## 🔒 Privacy & Security

- **All health data stays on YOUR device** (localStorage)
- No data is sent to any server except AI chat messages to Claude API
- The Anthropic API key is stored securely on Vercel (never exposed to frontend)
- No analytics, no tracking, no third-party scripts

---

## 📋 PWA Icons

For the best PWA experience, generate icons:
1. Create a 512x512 PNG logo
2. Use [realfavicongenerator.net](https://realfavicongenerator.net) to generate all sizes
3. Place `icon-192.png` and `icon-512.png` in the `/public` folder

---

## License

Personal use only. Built for Tahsin's longevity protocol.
