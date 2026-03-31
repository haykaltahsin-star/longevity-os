import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// TRANSLATIONS
// ============================================================
const T = {
  ro: {
    title: "LONGEVITY OS", subtitle: "Protocol Personalizat • Tahsin",
    tabs: { dashboard: "Dashboard", whoop: "WHOOP", labs: "Analize", biomarkers: "Biomarkeri", protocols: "Protocoale", supplements: "Suplimente", exercise: "Exerciții", nutrition: "Nutriție", sleep: "Somn", screening: "Screening", chat: "AI Coach" },
    dash: { chronoAge: "Vârstă Cronologică", bioTarget: "Obiectiv Biologic", biomarkers: "Biomarkeri", born: "Născut 21 Nov 1982", reduction: "Reducere 8 ani", fullMonitor: "Monitorizare completă", dailyRoutine: "RUTINA ZILNICĂ", topPriorities: "TOP 5 PRIORITĂȚI", sources: "SURSE & MENTORI", lastRecovery: "WHOOP Recovery", lastLabs: "Ultima Analiză" },
    whoop: { title: "WHOOP Life Tracker", subtitle: "Introdu datele zilnic din WHOOP app", entries: "înregistrări", addData: "+ Adaugă Date", cancel: "✕ Anulează", date: "Data", save: "💾 Salvează", lastEntry: "Ultima Înregistrare", trends: "📈 Trenduri (14 zile)", insights: "🧠 INSIGHTS", history: "📋 Istoric", days: "zile", noData: "Nicio înregistrare WHOOP", noDataSub: "Apasa [+ Adauga Date] si introdu metricile din WHOOP app.", avg7: "7-day avg" },
    labs: { title: "Analize de Sânge", subtitle: "Introdu rezultatele analizelor de la laborator", addLab: "+ Adaugă Rezultate", noLabs: "Nicio analiză încă", noLabsSub: "Adaugă prima analiză de sânge pentru tracking complet.", labDate: "Data analizei", labName: "Nume laborator", category: "Categorie", all: "Toate", latestResults: "Ultimele Rezultate", labHistory: "Istoric Analize", optimal: "OPTIM", warning: "ATENȚIE", critical: "CRITIC", target: "Target", value: "Valoare", save: "💾 Salvează Analiza", viewAll: "Vezi tot", trend: "Trend" },
    bio: { title: "Panoul de Biomarkeri", subtitle: "Target-uri optimizate pentru longevitate", targetLabel: "Target", idealLabel: "Ideal" },
    proto: { title: "Protocoale Anti-Aging", subtitle: "Farmacologice = supervizare medicală obligatorie", protocol: "Protocol", studies: "Studii", risks: "Riscuri", evidence: "Evidență" },
    supp: { title: "Stack Suplimente", subtitle: "Prioritizate: Esențial → Important → Moderat", timing: "Timing", brand: "Brand", why: "De Ce" },
    ex: { title: "Antrenament Săptămânal", subtitle: "Forță + Zone 2 + VO2max = longevitate" },
    nut: { title: "Nutriție Longevitate", superfoods: "SUPERFOODS", principles: "PRINCIPII" },
    slp: { title: "Optimizare Somn", protocol: "PROTOCOL", metrics: "METRICI TARGET (WHOOP)" },
    scr: { title: "Calendar Screening", subtitle: "Scanează ÎNAINTE de simptome", due: "Due" },
    chat: { title: "AI Health Coach", subtitle: "Întreabă orice despre sănătate și longevitate", placeholder: "Întreabă despre sănătate, suplimente, protocoale...", send: "Trimite", thinking: "Analizez...", welcome: "Bun venit! Sunt asistentul tău de sănătate și longevitate. Am acces la toate datele tale — WHOOP, analize de sânge, protocoale. Întreabă-mă orice!" },
    zones: { optimal: "OPTIM", warning: "ATENȚIE", critical: "CRITIC" },
    disclaimer: "⚠️ Informații educaționale. Protocoale farmacologice = supervizare medicală obligatorie.",
    routine: [
      { t: "06:00", a: "Trezire + lumină solară 10 min" }, { t: "06:15", a: "Suplimente dimineață" },
      { t: "06:30", a: "Duș rece 2-3 min" }, { t: "07:00", a: "Antrenament" },
      { t: "08:30", a: "Prima masă: proteine + grăsimi" }, { t: "12:00", a: "Masa 2: proteine + legume + carbi" },
      { t: "14:00", a: "Stop cafeină" }, { t: "20:00", a: "Blue-blocking glasses ON" },
      { t: "21:30", a: "Mg Glycinate + L-Theanine" }, { t: "22:00", a: "Dormitor 18°C" },
    ],
    priorities: ["Forță 3x/săpt + Zone 2 150min/săpt", "Somn 7-8h, WHOOP tracking", "Proteine 1.8g/kg + zero procesate", "Biomarkeri la fiecare 3-6 luni", "Rapamicină + Metformină (supervizare)"],
    essentials: "Esențial", important: "Important", moderate: "Moderat",
  },
  en: {
    title: "LONGEVITY OS", subtitle: "Personalized Protocol • Tahsin",
    tabs: { dashboard: "Dashboard", whoop: "WHOOP", labs: "Lab Results", biomarkers: "Biomarkers", protocols: "Protocols", supplements: "Supplements", exercise: "Exercise", nutrition: "Nutrition", sleep: "Sleep", screening: "Screening", chat: "AI Coach" },
    dash: { chronoAge: "Chronological Age", bioTarget: "Biological Target", biomarkers: "Biomarkers", born: "Born Nov 21, 1982", reduction: "8 year reduction", fullMonitor: "Full monitoring", dailyRoutine: "DAILY ROUTINE", topPriorities: "TOP 5 PRIORITIES", sources: "SOURCES & MENTORS", lastRecovery: "WHOOP Recovery", lastLabs: "Last Lab Test" },
    whoop: { title: "WHOOP Life Tracker", subtitle: "Enter daily metrics from WHOOP app", entries: "entries", addData: "+ Add Data", cancel: "✕ Cancel", date: "Date", save: "💾 Save", lastEntry: "Latest Entry", trends: "📈 Trends (14 days)", insights: "🧠 INSIGHTS", history: "📋 History", days: "days", noData: "No WHOOP data yet", noDataSub: "Click '+ Add Data' to enter your WHOOP metrics.", avg7: "7-day avg" },
    labs: { title: "Blood Tests", subtitle: "Enter lab results for complete tracking", addLab: "+ Add Results", noLabs: "No lab results yet", noLabsSub: "Add your first blood test for complete tracking.", labDate: "Test date", labName: "Lab name", category: "Category", all: "All", latestResults: "Latest Results", labHistory: "Lab History", optimal: "OPTIMAL", warning: "WARNING", critical: "CRITICAL", target: "Target", value: "Value", save: "💾 Save Results", viewAll: "View all", trend: "Trend" },
    bio: { title: "Biomarker Panel", subtitle: "Targets optimized for longevity", targetLabel: "Target", idealLabel: "Ideal" },
    proto: { title: "Anti-Aging Protocols", subtitle: "Pharmacological = mandatory medical supervision", protocol: "Protocol", studies: "Studies", risks: "Risks", evidence: "Evidence" },
    supp: { title: "Supplement Stack", subtitle: "Prioritized: Essential → Important → Moderate", timing: "Timing", brand: "Brand", why: "Why" },
    ex: { title: "Weekly Training", subtitle: "Strength + Zone 2 + VO2max = longevity" },
    nut: { title: "Longevity Nutrition", superfoods: "SUPERFOODS", principles: "PRINCIPLES" },
    slp: { title: "Sleep Optimization", protocol: "PROTOCOL", metrics: "TARGET METRICS (WHOOP)" },
    scr: { title: "Screening Calendar", subtitle: "Scan BEFORE symptoms", due: "Due" },
    chat: { title: "AI Health Coach", subtitle: "Ask anything about health and longevity", placeholder: "Ask about health, supplements, protocols...", send: "Send", thinking: "Analyzing...", welcome: "Welcome! I'm your health & longevity assistant. I have access to all your data — WHOOP, blood tests, protocols. Ask me anything!" },
    zones: { optimal: "OPTIMAL", warning: "WARNING", critical: "CRITICAL" },
    disclaimer: "⚠️ Educational information only. Pharmacological protocols require medical supervision.",
    routine: [
      { t: "06:00", a: "Wake + sunlight 10 min" }, { t: "06:15", a: "Morning supplements" },
      { t: "06:30", a: "Cold shower 2-3 min" }, { t: "07:00", a: "Workout" },
      { t: "08:30", a: "Meal 1: protein + fats" }, { t: "12:00", a: "Meal 2: protein + vegs + carbs" },
      { t: "14:00", a: "Caffeine cutoff" }, { t: "20:00", a: "Blue-blocking glasses ON" },
      { t: "21:30", a: "Mg Glycinate + L-Theanine" }, { t: "22:00", a: "Bedroom 18°C" },
    ],
    priorities: ["Strength 3x/wk + Zone 2 150min/wk", "Sleep 7-8h, WHOOP tracking", "Protein 1.8g/kg + zero processed", "Biomarkers every 3-6 months", "Rapamycin + Metformin (supervised)"],
    essentials: "Essential", important: "Important", moderate: "Moderate",
  }
};

// ============================================================
// DATA
// ============================================================
const WHOOP_METRICS = [
  { key: "recovery", label: { ro: "Recovery Score", en: "Recovery Score" }, unit: "%", optimal: [67, 100], warning: [34, 66], bad: [0, 33], icon: "💚" },
  { key: "hrv", label: { ro: "HRV (RMSSD)", en: "HRV (RMSSD)" }, unit: "ms", optimal: [50, 200], warning: [30, 49], bad: [0, 29], icon: "💓" },
  { key: "rhr", label: { ro: "Resting HR", en: "Resting HR" }, unit: "bpm", optimal: [45, 60], warning: [61, 75], bad: [76, 100], icon: "❤️" },
  { key: "strain", label: { ro: "Strain", en: "Strain" }, unit: "", optimal: [10, 16], warning: [17, 18], bad: [19, 21], icon: "⚡" },
  { key: "sleepScore", label: { ro: "Sleep Score", en: "Sleep Score" }, unit: "%", optimal: [85, 100], warning: [70, 84], bad: [0, 69], icon: "🌙" },
  { key: "deepSleep", label: { ro: "Somn Profund", en: "Deep Sleep" }, unit: "min", optimal: [90, 300], warning: [60, 89], bad: [0, 59], icon: "🟣" },
  { key: "remSleep", label: { ro: "Somn REM", en: "REM Sleep" }, unit: "min", optimal: [90, 300], warning: [60, 89], bad: [0, 59], icon: "🔵" },
  { key: "sleepH", label: { ro: "Durată Somn", en: "Sleep Duration" }, unit: "h", optimal: [7, 9], warning: [6, 6.9], bad: [0, 5.9], icon: "⏱️" },
  { key: "resp", label: { ro: "Respiratory Rate", en: "Respiratory Rate" }, unit: "rpm", optimal: [12, 16], warning: [10, 11], bad: [8, 9], icon: "🫁" },
  { key: "spo2", label: { ro: "SpO2", en: "SpO2" }, unit: "%", optimal: [96, 100], warning: [93, 95], bad: [85, 92], icon: "🩸" },
  { key: "skinT", label: { ro: "Skin Temp", en: "Skin Temp" }, unit: "°C", optimal: [35.5, 37], warning: [37.1, 37.5], bad: [37.6, 40], icon: "🌡️" },
  { key: "cal", label: { ro: "Calorii", en: "Calories" }, unit: "kcal", optimal: [2200, 3500], warning: [1800, 2199], bad: [0, 1799], icon: "🔥" },
];

const BIOMARKERS = [
  // METABOLIC
  { key: "glucose", name: { ro: "Glucoza a jeun", en: "Fasting Glucose" }, target: "70-85", unit: "mg/dL", optimal: [70, 85], warning: [86, 99], bad: [100, 300], cat: "Metabolic", imp: { ro: "Driver #1 al imbatranirii.", en: "#1 driver of aging." }, freq: { ro: "3 luni", en: "3 months" } },
  { key: "hba1c", name: { ro: "HbA1c", en: "HbA1c" }, target: "< 5.2", unit: "%", optimal: [4, 5.2], warning: [5.3, 5.6], bad: [5.7, 14], cat: "Metabolic", imp: { ro: "Media glucozei pe 3 luni.", en: "3-month glucose average." }, freq: { ro: "3 luni", en: "3 months" } },
  { key: "insulin", name: { ro: "Insulina a jeun", en: "Fasting Insulin" }, target: "2-5", unit: "uIU/mL", optimal: [2, 5], warning: [5.1, 8], bad: [8.1, 50], cat: "Metabolic", imp: { ro: "Marker precoce rezistenta insulina.", en: "Early insulin resistance marker." }, freq: { ro: "3 luni", en: "3 months" } },
  { key: "homair", name: { ro: "HOMA-IR", en: "HOMA-IR" }, target: "< 1.0", unit: "", optimal: [0, 1], warning: [1.1, 2], bad: [2.1, 10], cat: "Metabolic", imp: { ro: "Index rezistenta insulina.", en: "Insulin resistance index." }, freq: { ro: "3 luni", en: "3 months" } },
  { key: "cpeptide", name: { ro: "C-Peptid", en: "C-Peptide" }, target: "0.8-1.5", unit: "ng/mL", optimal: [0.8, 1.5], warning: [1.6, 3], bad: [3.1, 10], cat: "Metabolic", imp: { ro: "Productia reala de insulina.", en: "Real insulin production." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "uricacid", name: { ro: "Acid Uric", en: "Uric Acid" }, target: "3.5-5.5", unit: "mg/dL", optimal: [3.5, 5.5], warning: [5.6, 7], bad: [7.1, 15], cat: "Metabolic", imp: { ro: "Guta, risc cardiovascular.", en: "Gout, cardiovascular risk." }, freq: { ro: "6 luni", en: "6 months" } },
  // INFLAMATIE
  { key: "hscrp", name: { ro: "hs-CRP", en: "hs-CRP" }, target: "< 0.5", unit: "mg/L", optimal: [0, 0.5], warning: [0.6, 1.5], bad: [1.6, 20], cat: "Inflamatie", imp: { ro: "Inflamatia cronica accelereaza bolile.", en: "Chronic inflammation accelerates disease." }, freq: { ro: "3 luni", en: "3 months" } },
  { key: "homocysteine", name: { ro: "Homocisteina", en: "Homocysteine" }, target: "< 7", unit: "umol/L", optimal: [0, 7], warning: [7.1, 10], bad: [10.1, 50], cat: "Inflamatie", imp: { ro: "Marker cardiovascular si neurologic.", en: "Cardiovascular and neurological marker." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "fibrinogen", name: { ro: "Fibrinogen", en: "Fibrinogen" }, target: "200-300", unit: "mg/dL", optimal: [200, 300], warning: [301, 400], bad: [401, 700], cat: "Inflamatie", imp: { ro: "Inflamatie si risc coagulare.", en: "Inflammation and clotting risk." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "esr", name: { ro: "VSH (ESR)", en: "ESR" }, target: "< 10", unit: "mm/h", optimal: [0, 10], warning: [11, 20], bad: [21, 100], cat: "Inflamatie", imp: { ro: "Marker general inflamatie.", en: "General inflammation marker." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "il6", name: { ro: "IL-6 (Interleukina 6)", en: "IL-6 (Interleukin 6)" }, target: "< 1.8", unit: "pg/mL", optimal: [0, 1.8], warning: [1.9, 5], bad: [5.1, 50], cat: "Inflamatie", imp: { ro: "Citokina pro-inflamatorie cheie.", en: "Key pro-inflammatory cytokine." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "tnfa", name: { ro: "TNF-alpha", en: "TNF-alpha" }, target: "< 1.0", unit: "pg/mL", optimal: [0, 1], warning: [1.1, 3], bad: [3.1, 20], cat: "Inflamatie", imp: { ro: "Citokina inflamatorie.", en: "Inflammatory cytokine." }, freq: { ro: "Anual", en: "Annual" } },
  // CARDIOVASCULAR
  { key: "apob", name: { ro: "ApoB", en: "ApoB" }, target: "< 60", unit: "mg/dL", optimal: [0, 60], warning: [61, 90], bad: [91, 200], cat: "Cardiovascular", imp: { ro: "Cel mai bun predictor CV.", en: "Best CV predictor." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "lpa", name: { ro: "Lp(a)", en: "Lp(a)" }, target: "< 30", unit: "mg/dL", optimal: [0, 30], warning: [31, 50], bad: [51, 300], cat: "Cardiovascular", imp: { ro: "Genetic. Management agresiv daca e crescut.", en: "Genetic. Aggressive management if elevated." }, freq: { ro: "O data", en: "Once" } },
  { key: "ldl", name: { ro: "LDL-C", en: "LDL-C" }, target: "< 100", unit: "mg/dL", optimal: [0, 70], warning: [71, 100], bad: [101, 300], cat: "Cardiovascular", imp: { ro: "Cauza aterosclerozei.", en: "Cause of atherosclerosis." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "hdl", name: { ro: "HDL-C", en: "HDL-C" }, target: "> 50", unit: "mg/dL", optimal: [50, 100], warning: [40, 49], bad: [0, 39], cat: "Cardiovascular", imp: { ro: "Colesterolul protector.", en: "Protective cholesterol." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "totalchol", name: { ro: "Colesterol Total", en: "Total Cholesterol" }, target: "< 200", unit: "mg/dL", optimal: [120, 200], warning: [201, 239], bad: [240, 400], cat: "Cardiovascular", imp: { ro: "Privit in context cu HDL/LDL.", en: "View in HDL/LDL context." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "trig", name: { ro: "Trigliceride", en: "Triglycerides" }, target: "< 80", unit: "mg/dL", optimal: [0, 80], warning: [81, 150], bad: [151, 500], cat: "Cardiovascular", imp: { ro: "Rezistenta insulina si risc cardiac.", en: "Insulin resistance and cardiac risk." }, freq: { ro: "3 luni", en: "3 months" } },
  { key: "vldl", name: { ro: "VLDL", en: "VLDL" }, target: "< 20", unit: "mg/dL", optimal: [0, 20], warning: [21, 30], bad: [31, 80], cat: "Cardiovascular", imp: { ro: "Particule aterogene.", en: "Atherogenic particles." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "bnp", name: { ro: "NT-proBNP", en: "NT-proBNP" }, target: "< 125", unit: "pg/mL", optimal: [0, 75], warning: [76, 125], bad: [126, 5000], cat: "Cardiovascular", imp: { ro: "Marker insuficienta cardiaca.", en: "Heart failure marker." }, freq: { ro: "Anual", en: "Annual" } },
  // HORMONAL
  { key: "testTotal", name: { ro: "Testosteron Total", en: "Total Testosterone" }, target: "500-900", unit: "ng/dL", optimal: [500, 900], warning: [300, 499], bad: [0, 299], cat: "Hormonal", imp: { ro: "Masa musculara, energie.", en: "Muscle mass, energy." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "testFree", name: { ro: "Testosteron Liber", en: "Free Testosterone" }, target: "15-25", unit: "pg/mL", optimal: [15, 25], warning: [10, 14.9], bad: [0, 9.9], cat: "Hormonal", imp: { ro: "Fractiunea activa.", en: "Active fraction." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "shbg", name: { ro: "SHBG", en: "SHBG" }, target: "20-40", unit: "nmol/L", optimal: [20, 40], warning: [41, 60], bad: [61, 150], cat: "Hormonal", imp: { ro: "Leaga testosteronul.", en: "Binds testosterone." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "e2", name: { ro: "Estradiol (E2)", en: "Estradiol (E2)" }, target: "20-35", unit: "pg/mL", optimal: [20, 35], warning: [36, 50], bad: [51, 100], cat: "Hormonal", imp: { ro: "Necesar pentru oase si creier.", en: "Needed for bones and brain." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "dheas", name: { ro: "DHEA-S", en: "DHEA-S" }, target: "250-400", unit: "ug/dL", optimal: [250, 400], warning: [150, 249], bad: [0, 149], cat: "Hormonal", imp: { ro: "Hormon anti-imbatranire.", en: "Anti-aging hormone." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "tsh", name: { ro: "TSH", en: "TSH" }, target: "0.5-2.0", unit: "mIU/L", optimal: [0.5, 2], warning: [2.1, 4], bad: [4.1, 20], cat: "Hormonal", imp: { ro: "Functia tiroidiana.", en: "Thyroid function." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "ft3", name: { ro: "Free T3", en: "Free T3" }, target: "3.0-4.0", unit: "pg/mL", optimal: [3, 4], warning: [2.5, 2.9], bad: [0, 2.4], cat: "Hormonal", imp: { ro: "Hormonul tiroidian activ.", en: "Active thyroid hormone." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "ft4", name: { ro: "Free T4", en: "Free T4" }, target: "1.0-1.5", unit: "ng/dL", optimal: [1, 1.5], warning: [0.8, 0.99], bad: [0, 0.79], cat: "Hormonal", imp: { ro: "Hormon tiroidian precursor.", en: "Precursor thyroid hormone." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "cortisol", name: { ro: "Cortizol (dimineata)", en: "Cortisol (morning)" }, target: "10-18", unit: "ug/dL", optimal: [10, 18], warning: [19, 25], bad: [26, 50], cat: "Hormonal", imp: { ro: "Hormon de stres. Prea mare = catabolism.", en: "Stress hormone. Too high = catabolism." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "igf1", name: { ro: "IGF-1", en: "IGF-1" }, target: "100-200", unit: "ng/mL", optimal: [100, 200], warning: [201, 300], bad: [301, 500], cat: "Hormonal", imp: { ro: "Factor de crestere. Moderat = longevitate.", en: "Growth factor. Moderate = longevity." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "prolactin", name: { ro: "Prolactina", en: "Prolactin" }, target: "2-15", unit: "ng/mL", optimal: [2, 15], warning: [16, 25], bad: [26, 100], cat: "Hormonal", imp: { ro: "Crescut = posibil prolactinom.", en: "Elevated = possible prolactinoma." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "lh", name: { ro: "LH", en: "LH" }, target: "2-9", unit: "mIU/mL", optimal: [2, 9], warning: [9.1, 15], bad: [15.1, 50], cat: "Hormonal", imp: { ro: "Hormon stimulator testicular.", en: "Testicular stimulating hormone." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "fsh", name: { ro: "FSH", en: "FSH" }, target: "1.5-12", unit: "mIU/mL", optimal: [1.5, 12], warning: [12.1, 20], bad: [20.1, 100], cat: "Hormonal", imp: { ro: "Functia reproductiva.", en: "Reproductive function." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "pth", name: { ro: "Parathormon (PTH)", en: "Parathyroid Hormone" }, target: "15-50", unit: "pg/mL", optimal: [15, 50], warning: [51, 65], bad: [66, 200], cat: "Hormonal", imp: { ro: "Metabolismul calciului si oaselor.", en: "Calcium and bone metabolism." }, freq: { ro: "Anual", en: "Annual" } },
  // NUTRIENTI
  { key: "vitd", name: { ro: "Vitamina D (25-OH)", en: "Vitamin D (25-OH)" }, target: "50-80", unit: "ng/mL", optimal: [50, 80], warning: [30, 49], bad: [0, 29], cat: "Nutrienti", imp: { ro: "Imunomodulator, anti-cancer.", en: "Immunomodulator, anti-cancer." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "vitb12", name: { ro: "Vitamina B12", en: "Vitamin B12" }, target: "500-1000", unit: "pg/mL", optimal: [500, 1000], warning: [300, 499], bad: [0, 299], cat: "Nutrienti", imp: { ro: "Critik cu Metformina. Neurologic.", en: "Critical with Metformin. Neurological." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "folate", name: { ro: "Acid Folic (Folat)", en: "Folate" }, target: "> 10", unit: "ng/mL", optimal: [10, 30], warning: [5, 9.9], bad: [0, 4.9], cat: "Nutrienti", imp: { ro: "Metilare ADN. Esential cu B12.", en: "DNA methylation. Essential with B12." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "mgrbc", name: { ro: "Magneziu RBC", en: "RBC Magnesium" }, target: "5.5-6.5", unit: "mg/dL", optimal: [5.5, 6.5], warning: [4.5, 5.4], bad: [0, 4.4], cat: "Nutrienti", imp: { ro: "Reflecta stocurile reale.", en: "Reflects true stores." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "mgserum", name: { ro: "Magneziu Seric", en: "Serum Magnesium" }, target: "2.0-2.5", unit: "mg/dL", optimal: [2, 2.5], warning: [1.7, 1.99], bad: [0, 1.69], cat: "Nutrienti", imp: { ro: "Mai putin precis decat RBC.", en: "Less precise than RBC." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "omega3", name: { ro: "Omega-3 Index", en: "Omega-3 Index" }, target: "> 8", unit: "%", optimal: [8, 15], warning: [5, 7.9], bad: [0, 4.9], cat: "Nutrienti", imp: { ro: "Protectie cardiovasculara.", en: "Cardiovascular protection." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "ferritin", name: { ro: "Feritina", en: "Ferritin" }, target: "40-100", unit: "ng/mL", optimal: [40, 100], warning: [101, 200], bad: [201, 1000], cat: "Nutrienti", imp: { ro: "Prea mare = oxidare.", en: "Too high = oxidation." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "iron", name: { ro: "Fier Seric", en: "Serum Iron" }, target: "60-170", unit: "ug/dL", optimal: [60, 170], warning: [40, 59], bad: [0, 39], cat: "Nutrienti", imp: { ro: "Deficit sau exces = probleme.", en: "Deficiency or excess = problems." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "tibc", name: { ro: "TIBC", en: "TIBC" }, target: "250-370", unit: "ug/dL", optimal: [250, 370], warning: [371, 450], bad: [451, 600], cat: "Nutrienti", imp: { ro: "Capacitate legare fier.", en: "Iron binding capacity." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "transferrin", name: { ro: "Saturatie Transferina", en: "Transferrin Saturation" }, target: "20-45", unit: "%", optimal: [20, 45], warning: [15, 19], bad: [0, 14], cat: "Nutrienti", imp: { ro: "Transport fier.", en: "Iron transport." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "zinc", name: { ro: "Zinc", en: "Zinc" }, target: "70-120", unit: "ug/dL", optimal: [70, 120], warning: [60, 69], bad: [0, 59], cat: "Nutrienti", imp: { ro: "Imunitate, testosteron.", en: "Immunity, testosterone." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "selenium", name: { ro: "Seleniu", en: "Selenium" }, target: "70-150", unit: "ug/L", optimal: [70, 150], warning: [50, 69], bad: [0, 49], cat: "Nutrienti", imp: { ro: "Tiroida, antioxidant.", en: "Thyroid, antioxidant." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "copper", name: { ro: "Cupru", en: "Copper" }, target: "70-140", unit: "ug/dL", optimal: [70, 140], warning: [141, 180], bad: [181, 300], cat: "Nutrienti", imp: { ro: "Raport Zinc:Cupru important.", en: "Zinc:Copper ratio important." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "vita", name: { ro: "Vitamina A (Retinol)", en: "Vitamin A (Retinol)" }, target: "30-65", unit: "ug/dL", optimal: [30, 65], warning: [20, 29], bad: [0, 19], cat: "Nutrienti", imp: { ro: "Vedere, imunitate, piele.", en: "Vision, immunity, skin." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "vite", name: { ro: "Vitamina E", en: "Vitamin E" }, target: "5.5-17", unit: "mg/L", optimal: [5.5, 17], warning: [3, 5.4], bad: [0, 2.9], cat: "Nutrienti", imp: { ro: "Antioxidant liposolubil.", en: "Fat-soluble antioxidant." }, freq: { ro: "Anual", en: "Annual" } },
  // ORGANE
  { key: "egfr", name: { ro: "eGFR", en: "eGFR" }, target: "> 90", unit: "mL/min", optimal: [90, 150], warning: [60, 89], bad: [0, 59], cat: "Organe", imp: { ro: "Functia renala.", en: "Kidney function." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "creatinine", name: { ro: "Creatinina", en: "Creatinine" }, target: "0.7-1.2", unit: "mg/dL", optimal: [0.7, 1.2], warning: [1.21, 1.5], bad: [1.51, 5], cat: "Organe", imp: { ro: "Functia renala. Suplimente creatina cresc.", en: "Kidney function. Creatine supps elevate." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "bun", name: { ro: "BUN (Uree)", en: "BUN (Urea)" }, target: "7-20", unit: "mg/dL", optimal: [7, 20], warning: [21, 30], bad: [31, 100], cat: "Organe", imp: { ro: "Functia renala si hidratare.", en: "Kidney function and hydration." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "alt", name: { ro: "ALT (GPT)", en: "ALT (GPT)" }, target: "< 25", unit: "U/L", optimal: [0, 25], warning: [26, 40], bad: [41, 200], cat: "Organe", imp: { ro: "Functia hepatica.", en: "Liver function." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "ast", name: { ro: "AST (GOT)", en: "AST (GOT)" }, target: "< 25", unit: "U/L", optimal: [0, 25], warning: [26, 40], bad: [41, 200], cat: "Organe", imp: { ro: "Ficat si muschi.", en: "Liver and muscle." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "ggt", name: { ro: "GGT", en: "GGT" }, target: "< 20", unit: "U/L", optimal: [0, 20], warning: [21, 40], bad: [41, 200], cat: "Organe", imp: { ro: "Stres oxidativ hepatic.", en: "Hepatic oxidative stress." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "alp", name: { ro: "Fosfataza Alcalina", en: "Alkaline Phosphatase" }, target: "40-100", unit: "U/L", optimal: [40, 100], warning: [101, 130], bad: [131, 300], cat: "Organe", imp: { ro: "Ficat si oase.", en: "Liver and bones." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "tbili", name: { ro: "Bilirubina Totala", en: "Total Bilirubin" }, target: "0.2-1.0", unit: "mg/dL", optimal: [0.2, 1], warning: [1.1, 1.5], bad: [1.6, 10], cat: "Organe", imp: { ro: "Functia hepatica. Usor crescut = antioxidant.", en: "Liver function. Mildly elevated = antioxidant." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "albumin", name: { ro: "Albumina", en: "Albumin" }, target: "4.0-5.0", unit: "g/dL", optimal: [4, 5], warning: [3.5, 3.99], bad: [0, 3.49], cat: "Organe", imp: { ro: "Status nutritional si hepatic.", en: "Nutritional and liver status." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "totalprotein", name: { ro: "Proteine Totale", en: "Total Protein" }, target: "6.0-8.0", unit: "g/dL", optimal: [6, 8], warning: [5.5, 5.99], bad: [0, 5.49], cat: "Organe", imp: { ro: "Status nutritional general.", en: "General nutritional status." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "cysc", name: { ro: "Cystatin C", en: "Cystatin C" }, target: "< 0.9", unit: "mg/L", optimal: [0, 0.9], warning: [0.91, 1.2], bad: [1.21, 5], cat: "Organe", imp: { ro: "Mai precis decat creatinina.", en: "More precise than creatinine." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "lipase", name: { ro: "Lipaza", en: "Lipase" }, target: "< 60", unit: "U/L", optimal: [0, 60], warning: [61, 100], bad: [101, 500], cat: "Organe", imp: { ro: "Functia pancreatica.", en: "Pancreatic function." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "amylase", name: { ro: "Amilaza", en: "Amylase" }, target: "25-125", unit: "U/L", optimal: [25, 125], warning: [126, 200], bad: [201, 1000], cat: "Organe", imp: { ro: "Pancreas. Monitorizare cu GLP-1.", en: "Pancreas. Monitor with GLP-1." }, freq: { ro: "Anual", en: "Annual" } },
  // HEMOGRAMA
  { key: "wbc", name: { ro: "Leucocite (WBC)", en: "White Blood Cells" }, target: "4.5-6.5", unit: "x10^3/uL", optimal: [4.5, 6.5], warning: [3.5, 4.49], bad: [0, 3.49], cat: "Hemograma", imp: { ro: "Sistemul imunitar.", en: "Immune system." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "rbc", name: { ro: "Eritrocite (RBC)", en: "Red Blood Cells" }, target: "4.5-5.5", unit: "x10^6/uL", optimal: [4.5, 5.5], warning: [4, 4.49], bad: [0, 3.99], cat: "Hemograma", imp: { ro: "Transport oxigen.", en: "Oxygen transport." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "hgb", name: { ro: "Hemoglobina", en: "Hemoglobin" }, target: "14-17", unit: "g/dL", optimal: [14, 17], warning: [12, 13.9], bad: [0, 11.9], cat: "Hemograma", imp: { ro: "Capacitate transport oxigen.", en: "Oxygen carrying capacity." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "hct", name: { ro: "Hematocrit", en: "Hematocrit" }, target: "40-50", unit: "%", optimal: [40, 50], warning: [36, 39], bad: [0, 35], cat: "Hemograma", imp: { ro: "Volum eritrocite. Monitorizare TRT.", en: "RBC volume. Monitor on TRT." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "plt", name: { ro: "Trombocite (PLT)", en: "Platelets" }, target: "150-300", unit: "x10^3/uL", optimal: [150, 300], warning: [100, 149], bad: [0, 99], cat: "Hemograma", imp: { ro: "Coagulare sange.", en: "Blood clotting." }, freq: { ro: "6 luni", en: "6 months" } },
  { key: "mcv", name: { ro: "MCV", en: "MCV" }, target: "80-96", unit: "fL", optimal: [80, 96], warning: [97, 100], bad: [101, 120], cat: "Hemograma", imp: { ro: "Marimea eritrocitelor. Mare = deficit B12.", en: "RBC size. Large = B12 deficiency." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "mch", name: { ro: "MCH", en: "MCH" }, target: "27-33", unit: "pg", optimal: [27, 33], warning: [24, 26.9], bad: [0, 23.9], cat: "Hemograma", imp: { ro: "Hemoglobina per eritrocit.", en: "Hemoglobin per RBC." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "mchc", name: { ro: "MCHC", en: "MCHC" }, target: "32-36", unit: "g/dL", optimal: [32, 36], warning: [30, 31.9], bad: [0, 29.9], cat: "Hemograma", imp: { ro: "Concentratie hemoglobina.", en: "Hemoglobin concentration." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "neutrophils", name: { ro: "Neutrofile", en: "Neutrophils" }, target: "40-70", unit: "%", optimal: [40, 70], warning: [30, 39], bad: [0, 29], cat: "Hemograma", imp: { ro: "Prima linie de aparare.", en: "First line of defense." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "lymphocytes", name: { ro: "Limfocite", en: "Lymphocytes" }, target: "20-40", unit: "%", optimal: [20, 40], warning: [15, 19], bad: [0, 14], cat: "Hemograma", imp: { ro: "Imunitate adaptativa.", en: "Adaptive immunity." }, freq: { ro: "Anual", en: "Annual" } },
  // COAGULARE
  { key: "pt", name: { ro: "Timp Protrombina (PT)", en: "Prothrombin Time" }, target: "11-13.5", unit: "sec", optimal: [11, 13.5], warning: [13.6, 16], bad: [16.1, 30], cat: "Coagulare", imp: { ro: "Coagulare extrinseca.", en: "Extrinsic coagulation." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "inr", name: { ro: "INR", en: "INR" }, target: "0.9-1.1", unit: "", optimal: [0.9, 1.1], warning: [1.11, 1.5], bad: [1.51, 5], cat: "Coagulare", imp: { ro: "Standardizat. Important cu anticoagulante.", en: "Standardized. Important with anticoagulants." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "aptt", name: { ro: "aPTT", en: "aPTT" }, target: "25-35", unit: "sec", optimal: [25, 35], warning: [36, 45], bad: [46, 100], cat: "Coagulare", imp: { ro: "Coagulare intrinseca.", en: "Intrinsic coagulation." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "ddimer", name: { ro: "D-Dimer", en: "D-Dimer" }, target: "< 0.5", unit: "ug/mL", optimal: [0, 0.5], warning: [0.51, 1], bad: [1.1, 10], cat: "Coagulare", imp: { ro: "Marker tromboza. Creste cu varsta.", en: "Thrombosis marker. Increases with age." }, freq: { ro: "Anual", en: "Annual" } },
  // ELECTROLITI
  { key: "sodium", name: { ro: "Sodiu (Na)", en: "Sodium (Na)" }, target: "136-145", unit: "mEq/L", optimal: [136, 145], warning: [133, 135], bad: [0, 132], cat: "Electroliti", imp: { ro: "Echilibru hidric.", en: "Fluid balance." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "potassium", name: { ro: "Potasiu (K)", en: "Potassium (K)" }, target: "3.5-5.0", unit: "mEq/L", optimal: [3.5, 5], warning: [3, 3.49], bad: [0, 2.99], cat: "Electroliti", imp: { ro: "Functia cardiaca si musculara.", en: "Heart and muscle function." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "calcium", name: { ro: "Calciu Total", en: "Total Calcium" }, target: "8.5-10.2", unit: "mg/dL", optimal: [8.5, 10.2], warning: [10.3, 11], bad: [11.1, 15], cat: "Electroliti", imp: { ro: "Oase, nervi, muschi.", en: "Bones, nerves, muscles." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "phosphorus", name: { ro: "Fosfor", en: "Phosphorus" }, target: "2.5-4.5", unit: "mg/dL", optimal: [2.5, 4.5], warning: [4.6, 5.5], bad: [5.6, 10], cat: "Electroliti", imp: { ro: "Oase si energie celulara.", en: "Bones and cellular energy." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "chloride", name: { ro: "Clor (Cl)", en: "Chloride (Cl)" }, target: "98-106", unit: "mEq/L", optimal: [98, 106], warning: [95, 97], bad: [0, 94], cat: "Electroliti", imp: { ro: "Echilibru acid-baza.", en: "Acid-base balance." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "co2", name: { ro: "CO2 (Bicarbonat)", en: "CO2 (Bicarbonate)" }, target: "22-28", unit: "mEq/L", optimal: [22, 28], warning: [18, 21], bad: [0, 17], cat: "Electroliti", imp: { ro: "Echilibru acid-baza.", en: "Acid-base balance." }, freq: { ro: "Anual", en: "Annual" } },
  // TUMORI
  { key: "psa", name: { ro: "PSA Total", en: "Total PSA" }, target: "< 1.5", unit: "ng/mL", optimal: [0, 1.5], warning: [1.6, 4], bad: [4.1, 100], cat: "Markeri Tumorali", imp: { ro: "Screening prostata. Obligatoriu 40+.", en: "Prostate screening. Mandatory 40+." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "cea", name: { ro: "CEA", en: "CEA" }, target: "< 3.0", unit: "ng/mL", optimal: [0, 3], warning: [3.1, 5], bad: [5.1, 100], cat: "Markeri Tumorali", imp: { ro: "Colorectal, pulmonar.", en: "Colorectal, pulmonary." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "afp", name: { ro: "AFP", en: "AFP" }, target: "< 10", unit: "ng/mL", optimal: [0, 10], warning: [11, 20], bad: [21, 1000], cat: "Markeri Tumorali", imp: { ro: "Ficat.", en: "Liver." }, freq: { ro: "Anual", en: "Annual" } },
  { key: "ca199", name: { ro: "CA 19-9", en: "CA 19-9" }, target: "< 37", unit: "U/mL", optimal: [0, 37], warning: [38, 100], bad: [101, 5000], cat: "Markeri Tumorali", imp: { ro: "Pancreas, tract biliar.", en: "Pancreas, biliary tract." }, freq: { ro: "Anual", en: "Annual" } },
];

const CATS = ["Metabolic", "Inflamatie", "Cardiovascular", "Hormonal", "Nutrienti", "Organe", "Hemograma", "Coagulare", "Electroliti", "Markeri Tumorali"];
const CAT_EN = { Metabolic: "Metabolic", Inflamatie: "Inflammation", Cardiovascular: "Cardiovascular", Hormonal: "Hormonal", Nutrienti: "Nutrients", Organe: "Organs", Hemograma: "CBC", Coagulare: "Coagulation", Electroliti: "Electrolytes", "Markeri Tumorali": "Tumor Markers" };
const CC = {
  Metabolic: { bg: "#1a2332", border: "#3b82f6", text: "#60a5fa" }, Inflamatie: { bg: "#2d1a1a", border: "#ef4444", text: "#f87171" },
  Cardiovascular: { bg: "#1a2d1a", border: "#22c55e", text: "#4ade80" }, Hormonal: { bg: "#2d2a1a", border: "#eab308", text: "#facc15" },
  Nutrienti: { bg: "#1a2d2d", border: "#06b6d4", text: "#22d3ee" }, Organe: { bg: "#2a1a2d", border: "#a855f7", text: "#c084fc" },
  Hemograma: { bg: "#1a2228", border: "#f97316", text: "#fb923c" }, Coagulare: { bg: "#2d1a28", border: "#ec4899", text: "#f472b6" },
  Electroliti: { bg: "#1a2d28", border: "#14b8a6", text: "#2dd4bf" }, "Markeri Tumorali": { bg: "#2d1a1a", border: "#dc2626", text: "#f87171" },
};

const PROTOCOLS = [
  { name: { ro: "Rapamicină (Sirolimus)", en: "Rapamycin (Sirolimus)" }, cat: "Pharma", ev: "⭐⭐⭐⭐⭐", desc: { ro: "Inhibitor mTOR — activează autofagia, reduce senescența celulară. Cel mai validat anti-aging.", en: "mTOR inhibitor — activates autophagy, reduces cellular senescence. Most validated anti-aging drug." }, proto: { ro: "3-6 mg/săptămână, doză unică pulsatilă. Luni dimineața pe stomacul gol.", en: "3-6 mg/week, single pulsatile dose. Monday morning on empty stomach." }, study: { ro: "ITP: extensie viață 9-14%. PEARL Trial. AgelessRx RAPIDS.", en: "ITP: 9-14% lifespan extension. PEARL Trial. AgelessRx RAPIDS." }, risk: { ro: "Afte bucale (10%), trigliceride crescute temporar. Monitorizare lipide, glucoză, CBC la 3 luni.", en: "Mouth sores (10%), temporary triglyceride rise. Monitor lipids, glucose, CBC every 3 months." }, st: "off-label" },
  { name: { ro: "Metformină", en: "Metformin" }, cat: "Pharma", ev: "⭐⭐⭐⭐", desc: { ro: "Activator AMPK, reduce inflamația, îmbunătățește sensibilitatea la insulină.", en: "AMPK activator, reduces inflammation, improves insulin sensitivity." }, proto: { ro: "500mg x2/zi cu masa. Start 500mg seara. XR tolerabilitate mai bună.", en: "500mg x2/day with meals. Start 500mg evening. XR better tolerated." }, study: { ro: "TAME Trial în curs. Diabetici pe metformină trăiesc mai mult.", en: "TAME Trial ongoing. Diabetics on metformin live longer." }, risk: { ro: "Deficit B12 (suplimentează!). NU lua în zilele de antrenament intens.", en: "B12 deficiency (supplement!). DON'T take on intense training days." }, st: "off-label" },
  { name: { ro: "Acarboza", en: "Acarbose" }, cat: "Pharma", ev: "⭐⭐⭐⭐", desc: { ro: "Reduce spike-urile de glucoză postprandiale. ITP: +22% viață masculi.", en: "Reduces postprandial glucose spikes. ITP: +22% lifespan in males." }, proto: { ro: "25-50mg înainte de mese cu carbohidrați.", en: "25-50mg before carb-heavy meals." }, study: { ro: "ITP extensie viață 22% masculi.", en: "ITP 22% lifespan extension in males." }, risk: { ro: "Flatulență, disconfort GI. Start low.", en: "Flatulence, GI discomfort. Start low." }, st: "off-label" },
  { name: { ro: "Senolitice (D+Q)", en: "Senolytics (D+Q)" }, cat: "Pharma", ev: "⭐⭐⭐⭐", desc: { ro: "Dasatinib + Quercetină elimină celulele senescente ('zombie cells').", en: "Dasatinib + Quercetin eliminates senescent ('zombie') cells." }, proto: { ro: "D 100mg + Q 1000mg, 3 zile consecutive, 1x/lună. Ciclu 3 luni on, 3 luni off.", en: "D 100mg + Q 1000mg, 3 consecutive days, 1x/month. 3 months on, 3 off." }, study: { ro: "Kirkland & Tchkonia, Mayo Clinic. EBioMedicine 2019.", en: "Kirkland & Tchkonia, Mayo Clinic. EBioMedicine 2019." }, risk: { ro: "Dasatinib = med oncologic. OBLIGATORIU supervizare medicală.", en: "Dasatinib = oncology drug. MANDATORY medical supervision." }, st: "experimental" },
  { name: { ro: "GLP-1 Agonist (Semaglutid)", en: "GLP-1 Agonist (Semaglutide)" }, cat: "Pharma", ev: "⭐⭐⭐⭐", desc: { ro: "Protecție cardiovasculară, reducere inflamație, neuroprotecție potențială.", en: "Cardiovascular protection, inflammation reduction, potential neuroprotection." }, proto: { ro: "0.25-0.5mg/săptămână subcutanat (doză mică, nu pentru obezitate).", en: "0.25-0.5mg/week subcutaneous (low dose, not for obesity)." }, study: { ro: "SELECT Trial: reducere MACE 20%. Studii Alzheimer în curs.", en: "SELECT Trial: 20% MACE reduction. Alzheimer studies ongoing." }, risk: { ro: "Greață, pierdere masă musculară. Proteine mari + antrenament.", en: "Nausea, muscle loss. High protein + training to counteract." }, st: "off-label" },
  { name: { ro: "Post Intermitent (IF)", en: "Intermittent Fasting" }, cat: "Lifestyle", ev: "⭐⭐⭐⭐", desc: { ro: "Activează autofagia, reduce inflamația, îmbunătățește insulina.", en: "Activates autophagy, reduces inflammation, improves insulin." }, proto: { ro: "16:8 zilnic. 36h x2/lună. 3 zile trimestrial.", en: "16:8 daily. 36h x2/month. 3-day quarterly." }, study: { ro: "De Cabo & Mattson, NEJM 2019. Ohsumi Nobel 2016.", en: "De Cabo & Mattson, NEJM 2019. Ohsumi Nobel 2016." }, risk: { ro: "Nu combina cu antrenament intens. Electroliți.", en: "Don't combine with intense training. Electrolytes." }, st: "lifestyle" },
  { name: { ro: "Saună (Finlandeză/IR)", en: "Sauna (Finnish/IR)" }, cat: "Lifestyle", ev: "⭐⭐⭐⭐", desc: { ro: "Heat shock proteins, detox, reducere risc CV 40-50%.", en: "Heat shock proteins, detox, 40-50% CV risk reduction." }, proto: { ro: "4-7x/săpt, 80-100°C, 15-20 min. Post: duș rece 2 min.", en: "4-7x/week, 80-100°C, 15-20 min. After: cold shower 2 min." }, study: { ro: "Laukkanen et al., JAMA Int Med 2015: SCD -63% la 4-7 sesiuni.", en: "Laukkanen et al., JAMA Int Med 2015: SCD -63% at 4-7 sessions." }, risk: { ro: "Hidratare! Electroliți. Evită alcoolul.", en: "Hydration! Electrolytes. Avoid alcohol." }, st: "lifestyle" },
  { name: { ro: "Crioterapie", en: "Cold Therapy" }, cat: "Lifestyle", ev: "⭐⭐⭐", desc: { ro: "Activează grăsimea brună, norepinefrina, reduce inflamația.", en: "Activates brown fat, norepinephrine, reduces inflammation." }, proto: { ro: "Duș rece 2-3 min dimineața (11°C). Băi gheață 2x/săpt.", en: "Cold shower 2-3 min morning (11°C). Ice baths 2x/week." }, study: { ro: "Susanna Soeberg Protocol. Studii grăsime brună.", en: "Susanna Soeberg Protocol. Brown fat studies." }, risk: { ro: "Aclimatizare graduală. Contraindicat boli cardiace.", en: "Gradual acclimation. Contraindicated in heart disease." }, st: "lifestyle" },
  { name: { ro: "NMN/NR (NAD+)", en: "NMN/NR (NAD+)" }, cat: "Supplement", ev: "⭐⭐⭐", desc: { ro: "Cresc NAD+ — esențial pentru mitocondrii și reparare ADN.", en: "Boost NAD+ — essential for mitochondria and DNA repair." }, proto: { ro: "NMN 500-1000mg dimineața sublingual/oral.", en: "NMN 500-1000mg morning sublingual/oral." }, study: { ro: "Sinclair Lab, Harvard. Studii clinice umane în curs.", en: "Sinclair Lab, Harvard. Human clinical trials ongoing." }, risk: { ro: "Bine tolerat. Posibil interferă cu chimioterapia.", en: "Well tolerated. May interfere with chemotherapy." }, st: "supplement" },
  { name: { ro: "Lumină Roșie (PBM)", en: "Red Light Therapy" }, cat: "Lifestyle", ev: "⭐⭐⭐", desc: { ro: "Fotobiomodulare — stimulează mitocondriile, crește ATP.", en: "Photobiomodulation — stimulates mitochondria, boosts ATP." }, proto: { ro: "660nm + 850nm. 10-20 min/zi dimineața.", en: "660nm + 850nm. 10-20 min/day morning." }, study: { ro: "Hamblin 2017 — review mecanism mitocondrial.", en: "Hamblin 2017 — mitochondrial mechanism review." }, risk: { ro: "Minim. Evită privitul direct în LED-uri.", en: "Minimal. Avoid looking directly at LEDs." }, st: "lifestyle" },
  { name: { ro: "17α-Estradiol", en: "17α-Estradiol" }, cat: "Pharma", ev: "⭐⭐⭐⭐", desc: { ro: "Non-feminizant. Extensie viață doar masculi. Reduce inflamația hipotalamică.", en: "Non-feminizing. Lifespan extension in males only. Reduces hypothalamic inflammation." }, proto: { ro: "Cercetare activă. Doză umană nestabilită.", en: "Active research. Human dose not established." }, study: { ro: "ITP: +12-19% viață masculi.", en: "ITP: +12-19% lifespan in males." }, risk: { ro: "Date limitate la oameni. Supervizare obligatorie.", en: "Limited human data. Supervision mandatory." }, st: "experimental" },
];

const SUPPLEMENTS = [
  { name: "Omega-3 (EPA/DHA)", dose: "2-4g/zi", timing: { ro: "Cu masa (grăsimi)", en: "With meal (fats)" }, why: { ro: "Anti-inflamator, cardiovascular, cerebral.", en: "Anti-inflammatory, cardiovascular, brain." }, brand: "Nordic Naturals", p: "E" },
  { name: "Vitamina D3 + K2", dose: "5000-10000 IU + 200μg K2", timing: { ro: "Dimineața cu grăsimi", en: "Morning with fats" }, why: { ro: "Imunomodulator, anti-cancer, osos.", en: "Immunomodulator, anti-cancer, bone." }, brand: "Thorne", p: "E" },
  { name: "Magneziu (Thr+Gly)", dose: "2g Thr + 400mg Gly", timing: { ro: "Seara, 1h pre-somn", en: "Evening, 1h before sleep" }, why: { ro: "Creier + mușchi + somn.", en: "Brain + muscle + sleep." }, brand: "Magtein + Dr's Best", p: "E" },
  { name: "Creatină Monohidrat", dose: "5g/zi", timing: { ro: "Oricând", en: "Anytime" }, why: { ro: "Cogniție, masă musculară, neuroprotecție.", en: "Cognition, muscle mass, neuroprotection." }, brand: "Creapure", p: "E" },
  { name: "NMN", dose: "500-1000mg", timing: { ro: "Dimineața, stomac gol", en: "Morning, empty stomach" }, why: { ro: "Precursor NAD+. Anti-aging celular.", en: "NAD+ precursor. Cellular anti-aging." }, brand: "ProHealth", p: "I" },
  { name: "Resveratrol + Pterostilben", dose: "500mg + 100mg", timing: { ro: "Dimineața cu grăsimi", en: "Morning with fats" }, why: { ro: "Activator SIRT1.", en: "SIRT1 activator." }, brand: "ProHealth", p: "I" },
  { name: "Curcumină Longvida", dose: "500-1000mg", timing: { ro: "Cu masa", en: "With meal" }, why: { ro: "Anti-inflamator puternic.", en: "Powerful anti-inflammatory." }, brand: "Longvida", p: "I" },
  { name: "CoQ10 Ubiquinol", dose: "200-400mg", timing: { ro: "Cu masa", en: "With meal" }, why: { ro: "Esențial mitocondrii după 40.", en: "Essential mitochondria after 40." }, brand: "Kaneka", p: "I" },
  { name: "B Complex Methylated", dose: "1 caps", timing: { ro: "Dimineața", en: "Morning" }, why: { ro: "Critic cu Metformină.", en: "Critical with Metformin." }, brand: "Thorne", p: "I" },
  { name: "Zinc + Seleniu", dose: "30mg + 200μg", timing: { ro: "Cu masa", en: "With meal" }, why: { ro: "Imunitate, testosteron, tiroidă.", en: "Immunity, testosterone, thyroid." }, brand: "Thorne", p: "M" },
  { name: "Ashwagandha KSM-66", dose: "600mg", timing: { ro: "Seara", en: "Evening" }, why: { ro: "Reduce cortizol, crește testosteron.", en: "Reduces cortisol, boosts testosterone." }, brand: "Nootropics Depot", p: "M" },
  { name: "Spermidină", dose: "5-10mg", timing: { ro: "Dimineața", en: "Morning" }, why: { ro: "Inductor natural autofagie.", en: "Natural autophagy inducer." }, brand: "spermidineLIFE", p: "M" },
  { name: "Collagen Peptides", dose: "15-20g", timing: { ro: "Dimineața", en: "Morning" }, why: { ro: "Piele, articulații, tendoane.", en: "Skin, joints, tendons." }, brand: "Great Lakes", p: "M" },
  { name: "Berberine", dose: "500mg x2", timing: { ro: "Cu masa", en: "With meal" }, why: { ro: "Activator AMPK natural.", en: "Natural AMPK activator." }, brand: "Thorne", p: "M" },
];

const EXERCISE = [
  { day: { ro: "Luni", en: "Monday" }, type: { ro: "Forță — Upper Push", en: "Strength — Upper Push" }, det: { ro: "Bench 4x6, OHP 3x8, Incline DB 3x10, Laterals 3x15, Triceps 3x12", en: "Bench 4x6, OHP 3x8, Incline DB 3x10, Laterals 3x15, Triceps 3x12" }, c: "#3b82f6" },
  { day: { ro: "Marți", en: "Tuesday" }, type: { ro: "Zone 2 Cardio", en: "Zone 2 Cardio" }, det: { ro: "45-60 min, HR 106-124 bpm", en: "45-60 min, HR 106-124 bpm" }, c: "#22c55e" },
  { day: { ro: "Miercuri", en: "Wednesday" }, type: { ro: "Forță — Lower Body", en: "Strength — Lower Body" }, det: { ro: "Squat 4x6, RDL 3x8, Leg Press 3x10, Lunges 3x12", en: "Squat 4x6, RDL 3x8, Leg Press 3x10, Lunges 3x12" }, c: "#eab308" },
  { day: { ro: "Joi", en: "Thursday" }, type: { ro: "Zone 2 + Mobilitate", en: "Zone 2 + Mobility" }, det: { ro: "30-45 min Zone 2 + 20 min stretching", en: "30-45 min Zone 2 + 20 min stretching" }, c: "#22c55e" },
  { day: { ro: "Vineri", en: "Friday" }, type: { ro: "Forță — Upper Pull", en: "Strength — Upper Pull" }, det: { ro: "Deadlift 3x5, Pull-ups 4x8, Row 3x8, Face Pulls 3x15", en: "Deadlift 3x5, Pull-ups 4x8, Row 3x8, Face Pulls 3x15" }, c: "#3b82f6" },
  { day: { ro: "Sâmbătă", en: "Saturday" }, type: { ro: "VO2max / HIIT", en: "VO2max / HIIT" }, det: { ro: "4x4 min la 90-95% HR max, 3 min rest", en: "4x4 min at 90-95% HR max, 3 min rest" }, c: "#ef4444" },
  { day: { ro: "Duminică", en: "Sunday" }, type: { ro: "Recuperare", en: "Recovery" }, det: { ro: "Plimbare 60 min, saună, stretching", en: "Walk 60 min, sauna, stretching" }, c: "#8b5cf6" },
];

const SCREENINGS = [
  { test: "CAC Score", freq: "3-5y", due: "2026", why: { ro: "CT fără contrast. Calcificări coronariene.", en: "Non-contrast CT. Coronary calcification." } },
  { test: "DEXA Scan", freq: "1y", due: "2026", why: { ro: "Masă musculară, grăsime viscerală.", en: "Muscle mass, visceral fat." } },
  { test: "Whole Body MRI", freq: "1y", due: "2026", why: { ro: "Screening cancere, anevrisme.", en: "Cancer, aneurysm screening." } },
  { test: "VO2max Test", freq: "1y", due: "2026", why: { ro: "Cel mai puternic predictor mortalitate.", en: "Strongest mortality predictor." } },
  { test: "Colonoscopie", freq: "10y", due: "2027", why: { ro: "Cancer colorectal. Start 45.", en: "Colorectal cancer. Start at 45." } },
  { test: "Galleri Multi-Cancer", freq: "1y", due: "2027", why: { ro: "50+ cancere prin cfDNA.", en: "50+ cancers via cfDNA." } },
  { test: "Ecografie Carotidă", freq: "2-3y", due: "2026", why: { ro: "Ateroscleroză precoce.", en: "Early atherosclerosis." } },
  { test: "Dermatoscopie", freq: "1y", due: "2026", why: { ro: "Screening melanom.", en: "Melanoma screening." } },
  { test: "Test Genetic", freq: "1x", due: "2026", why: { ro: "APOE4, Lp(a), BRCA.", en: "APOE4, Lp(a), BRCA." } },
  { test: "Audiogramă", freq: "3-5y", due: "2026", why: { ro: "Pierdere auz = risc demență.", en: "Hearing loss = dementia risk." } },
];

// ============================================================
// HELPERS
// ============================================================
function getZone(bm, v) {
  const n = parseFloat(v); if (isNaN(n)) return null;
  if (n >= bm.optimal[0] && n <= bm.optimal[1]) return "optimal";
  if (n >= bm.warning[0] && n <= bm.warning[1]) return "warning";
  return "critical";
}
const zoneColor = { optimal: "#22c55e", warning: "#f59e0b", critical: "#ef4444" };

function MiniChart({ data, color, h = 50 }) {
  if (!data || data.length < 2) return null;
  const vals = data.map(d => d.v); const mn = Math.min(...vals); const mx = Math.max(...vals);
  const rng = mx - mn || 1; const p = 4; const ch = h - p * 2; const w = 200;
  const pts = vals.map((v, i) => `${p + (i / (vals.length - 1)) * (w - p * 2)},${p + ch - ((v - mn) / rng) * ch}`).join(" ");
  return (<svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }} preserveAspectRatio="none">
    <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {vals.map((v, i) => { const x = p + (i / (vals.length - 1)) * (w - p * 2); const y = p + ch - ((v - mn) / rng) * ch;
      return <circle key={i} cx={x} cy={y} r={i === vals.length - 1 ? 4 : 2} fill={i === vals.length - 1 ? color : `${color}88`} />; })}
  </svg>);
}

// ============================================================
// APP
// ============================================================
export default function App() {
  const [lang, setLang] = useState("ro");
  const [tab, setTab] = useState("dashboard");
  const [whoopData, setWhoopData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [showWF, setShowWF] = useState(false);
  const [showLF, setShowLF] = useState(false);
  const [wForm, setWForm] = useState({});
  const [wDate, setWDate] = useState(new Date().toISOString().split("T")[0]);
  const [lForm, setLForm] = useState({});
  const [lDate, setLDate] = useState(new Date().toISOString().split("T")[0]);
  const [lName, setLName] = useState("");
  const [labCat, setLabCat] = useState("all");
  const [expProto, setExpProto] = useState(null);
  const [expSupp, setExpSupp] = useState(null);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const chatRef = useRef(null);
  const t = T[lang];

  useEffect(() => { loadAll(); }, []);
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [chatMsgs]);

  const loadAll = async () => {
    try { const r = localStorage.getItem("whoop-v4"); if (r) setWhoopData(JSON.parse(r)); } catch {}
    try { const r = localStorage.getItem("labs-v4"); if (r) setLabData(JSON.parse(r)); } catch {}
    setReady(true);
  };

  const saveWhoop = (d) => { try { localStorage.setItem("whoop-v4", JSON.stringify(d)); } catch {} };
  const saveLabs = (d) => { try { localStorage.setItem("labs-v4", JSON.stringify(d)); } catch {} };

  const addWhoopEntry = () => {
    const entry = { date: wDate, ...wForm, ts: Date.now() };
    const updated = [...whoopData.filter(e => e.date !== wDate), entry].sort((a, b) => a.date.localeCompare(b.date));
    setWhoopData(updated); saveWhoop(updated); setShowWF(false); setWForm({});
  };

  const addLabEntry = () => {
    const entry = { date: lDate, lab: lName, values: { ...lForm }, ts: Date.now() };
    const updated = [...labData, entry].sort((a, b) => a.date.localeCompare(b.date));
    setLabData(updated); saveLabs(updated); setShowLF(false); setLForm({}); setLName("");
  };

  const delWhoop = (date) => { const u = whoopData.filter(e => e.date !== date); setWhoopData(u); saveWhoop(u); };
  const delLab = (ts) => { const u = labData.filter(e => e.ts !== ts); setLabData(u); saveLabs(u); };

  const fileRef = useRef(null);
  const [importMsg, setImportMsg] = useState("");
  const labFileRef = useRef(null);
  const [labImportMsg, setLabImportMsg] = useState("");
  const [labParsing, setLabParsing] = useState(false);

  const handleLabPdfImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = "";
    setLabParsing(true);
    setLabImportMsg(lang === "ro" ? "AI analizeaza PDF-ul..." : "AI is analyzing the PDF...");

    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = () => rej(new Error("Read failed"));
        r.readAsDataURL(file);
      });

      const bmList = BIOMARKERS.map(b => `${b.key}: ${b.name.en} (${b.unit})`).join(", ");
      const mediaType = file.type === "application/pdf" ? "application/pdf" : file.type.startsWith("image/") ? file.type : "application/pdf";
      const docType = file.type === "application/pdf" ? "document" : "image";

      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: `You are a lab results extractor. Extract ALL blood test values from this document. Return ONLY a valid JSON object mapping biomarker keys to their numeric values. No text, no explanation, no markdown backticks. Just the JSON object. Available keys and their units: ${bmList}. Example output: {"glucose":85,"hba1c":5.1,"ldl":95}. If a value is not found, don't include it. Match test names intelligently - for example "Glucoza" or "Glicemie" maps to glucose, "Hemoglobina glicozilata" maps to hba1c, "Colesterol total" maps to totalchol, etc. Parse Romanian lab formats.`,
          messages: [{
            role: "user",
            content: [
              { type: docType, source: { type: "base64", media_type: mediaType, data: base64 } },
              { type: "text", text: "Extract all blood test values from this document. Return ONLY a JSON object with the biomarker keys and numeric values." }
            ]
          }]
        })
      });

      const data = await resp.json();
      const replyText = data.reply || "";
      const cleanJson = replyText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanJson);
      const validKeys = BIOMARKERS.map(b => b.key);
      const values = {};
      let count = 0;
      for (const [k, v] of Object.entries(parsed)) {
        if (validKeys.includes(k) && v !== null && v !== undefined) {
          values[k] = String(v);
          count++;
        }
      }

      if (count === 0) {
        setLabImportMsg(lang === "ro" ? "Nu am gasit valori in document. Incearca o poza mai clara." : "No values found. Try a clearer image.");
        setLabParsing(false);
        setTimeout(() => setLabImportMsg(""), 5000);
        return;
      }

      const entry = { date: new Date().toISOString().split("T")[0], lab: "PDF Import", values, ts: Date.now() };
      const updated = [...labData, entry].sort((a, b) => a.date.localeCompare(b.date));
      setLabData(updated);
      saveLabs(updated);
      setLabImportMsg(lang === "ro" ? `Import reusit! ${count} valori extrase automat din PDF.` : `Success! ${count} values extracted from PDF.`);
      setTimeout(() => setLabImportMsg(""), 6000);
    } catch (err) {
      console.error("PDF parse error:", err);
      setLabImportMsg(lang === "ro" ? "Eroare la procesarea fisierului. Incearca o poza sau alt PDF." : "Error processing file. Try a photo or different PDF.");
      setTimeout(() => setLabImportMsg(""), 5000);
    }
    setLabParsing(false);
  };

  // WHOOP CSV IMPORT
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const name = file.name.toLowerCase();
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      if (name.endsWith(".csv")) {
        parseWhoopCSV(text);
      } else if (name.endsWith(".xml")) {
        parseAppleHealthXML(text);
      } else {
        setImportMsg(lang === "ro" ? "Format invalid. Foloseste CSV (WHOOP) sau XML (Apple Health)." : "Invalid format. Use CSV (WHOOP) or XML (Apple Health).");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const parseWhoopCSV = (text) => {
    try {
      const lines = text.split("\n");
      const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/"/g, ""));
      const entries = {};
      for (let i = 1; i < lines.length; i++) {
        const vals = lines[i].split(",").map(v => v.trim().replace(/"/g, ""));
        if (vals.length < 2) continue;
        const dateIdx = headers.findIndex(h => h.includes("date") || h.includes("cycle start") || h.includes("day"));
        const dateRaw = vals[dateIdx] || vals[0];
        const date = dateRaw.substring(0, 10);
        if (!date || date.length < 8) continue;
        if (!entries[date]) entries[date] = { date, ts: Date.now() };
        headers.forEach((h, idx) => {
          const v = parseFloat(vals[idx]);
          if (isNaN(v)) return;
          if (h.includes("recovery") && h.includes("score")) entries[date].recovery = v;
          else if (h.includes("hrv") || h.includes("heart rate variability")) entries[date].hrv = v;
          else if ((h.includes("resting") && h.includes("heart")) || h === "rhr") entries[date].rhr = v;
          else if (h.includes("strain") && !h.includes("muscular")) entries[date].strain = Math.round(v * 10) / 10;
          else if (h.includes("sleep") && h.includes("performance")) entries[date].sleepScore = v;
          else if (h.includes("light sleep") || (h.includes("deep") && h.includes("sws"))) { /* skip */ }
          else if (h.includes("deep") || h.includes("sws")) entries[date].deepSleep = Math.round(v);
          else if (h.includes("rem")) entries[date].remSleep = Math.round(v);
          else if (h.includes("sleep") && h.includes("duration") || h.includes("total sleep")) entries[date].sleepH = Math.round(v / 3600 * 10) / 10;
          else if (h.includes("respiratory") || h.includes("resp")) entries[date].resp = Math.round(v * 10) / 10;
          else if (h.includes("spo2") || h.includes("oxygen")) entries[date].spo2 = Math.round(v * 10) / 10;
          else if (h.includes("skin temp")) entries[date].skinT = Math.round(v * 10) / 10;
          else if (h.includes("calorie") || h.includes("kilojoule")) entries[date].cal = Math.round(v);
        });
      }
      const newEntries = Object.values(entries).filter(e => Object.keys(e).length > 2);
      if (newEntries.length === 0) {
        setImportMsg(lang === "ro" ? "Nu am gasit date WHOOP in fisier." : "No WHOOP data found in file.");
        return;
      }
      const merged = [...whoopData];
      newEntries.forEach(ne => {
        const idx = merged.findIndex(e => e.date === ne.date);
        if (idx >= 0) merged[idx] = { ...merged[idx], ...ne };
        else merged.push(ne);
      });
      merged.sort((a, b) => a.date.localeCompare(b.date));
      setWhoopData(merged);
      saveWhoop(merged);
      setImportMsg(lang === "ro" ? `Import reusit! ${newEntries.length} zile importate din WHOOP CSV.` : `Success! ${newEntries.length} days imported from WHOOP CSV.`);
      setTimeout(() => setImportMsg(""), 5000);
    } catch (err) {
      setImportMsg(lang === "ro" ? "Eroare la procesarea CSV." : "Error processing CSV.");
    }
  };

  const parseAppleHealthXML = (text) => {
    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const records = xml.querySelectorAll("Record");
      const entries = {};
      const getDate = (r) => {
        const d = r.getAttribute("endDate") || r.getAttribute("startDate") || "";
        return d.substring(0, 10);
      };
      records.forEach(r => {
        const type = r.getAttribute("type") || "";
        const val = parseFloat(r.getAttribute("value"));
        const date = getDate(r);
        if (!date || isNaN(val)) return;
        if (!entries[date]) entries[date] = { date, ts: Date.now(), _counts: {} };
        const e = entries[date];
        const addAvg = (key, v) => {
          if (!e._counts[key]) { e._counts[key] = 0; e[key] = 0; }
          e._counts[key]++;
          e[key] = e[key] + (v - e[key]) / e._counts[key];
        };
        if (type.includes("HeartRateVariabilitySDNN")) addAvg("hrv", val * 1000);
        else if (type.includes("RestingHeartRate")) addAvg("rhr", val);
        else if (type.includes("RespiratoryRate")) addAvg("resp", val);
        else if (type.includes("OxygenSaturation")) addAvg("spo2", val * 100);
        else if (type.includes("BodyTemperature")) addAvg("skinT", val);
        else if (type.includes("ActiveEnergyBurned")) e.cal = (e.cal || 0) + val;
      });
      const sleepRecords = xml.querySelectorAll('Record[type="HKCategoryTypeIdentifierSleepAnalysis"]');
      sleepRecords.forEach(r => {
        const date = getDate(r);
        const val = r.getAttribute("value") || "";
        const start = new Date(r.getAttribute("startDate"));
        const end = new Date(r.getAttribute("endDate"));
        const mins = (end - start) / 60000;
        if (!date || isNaN(mins) || mins <= 0) return;
        if (!entries[date]) entries[date] = { date, ts: Date.now(), _counts: {} };
        if (val.includes("Deep") || val.includes("deep")) entries[date].deepSleep = (entries[date].deepSleep || 0) + Math.round(mins);
        else if (val.includes("REM") || val.includes("rem")) entries[date].remSleep = (entries[date].remSleep || 0) + Math.round(mins);
        if (val.includes("Asleep") || val.includes("Deep") || val.includes("Core") || val.includes("REM")) {
          entries[date].sleepH = Math.round(((entries[date].sleepH || 0) * 60 + mins) / 60 * 10) / 10;
        }
      });
      const newEntries = Object.values(entries).map(e => {
        delete e._counts;
        if (e.hrv) e.hrv = Math.round(e.hrv);
        if (e.rhr) e.rhr = Math.round(e.rhr);
        if (e.resp) e.resp = Math.round(e.resp * 10) / 10;
        if (e.spo2) e.spo2 = Math.round(e.spo2 * 10) / 10;
        if (e.cal) e.cal = Math.round(e.cal);
        return e;
      }).filter(e => Object.keys(e).length > 2);
      if (newEntries.length === 0) {
        setImportMsg(lang === "ro" ? "Nu am gasit date de sanatate in XML." : "No health data found in XML.");
        return;
      }
      const merged = [...whoopData];
      newEntries.forEach(ne => {
        const idx = merged.findIndex(e => e.date === ne.date);
        if (idx >= 0) merged[idx] = { ...merged[idx], ...ne };
        else merged.push(ne);
      });
      merged.sort((a, b) => a.date.localeCompare(b.date));
      setWhoopData(merged);
      saveWhoop(merged);
      setImportMsg(lang === "ro" ? `Import reusit! ${newEntries.length} zile importate din Apple Health.` : `Success! ${newEntries.length} days imported from Apple Health.`);
      setTimeout(() => setImportMsg(""), 5000);
    } catch (err) {
      setImportMsg(lang === "ro" ? "Eroare la procesarea XML." : "Error processing XML.");
    }
  };

  const latestW = whoopData.length ? whoopData[whoopData.length - 1] : null;
  const latestL = labData.length ? labData[labData.length - 1] : null;

  const getLabValue = (key) => {
    for (let i = labData.length - 1; i >= 0; i--) { if (labData[i].values[key]) return { v: labData[i].values[key], date: labData[i].date }; }
    return null;
  };

  const getLabTrend = (key) => labData.filter(e => e.values[key]).map(e => ({ v: parseFloat(e.values[key]), date: e.date })).slice(-10);

  // AI CHAT
  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim(); setChatInput("");
    setChatMsgs(prev => [...prev, { role: "user", text: userMsg }]);
    setChatLoading(true);
    const labSummary = BIOMARKERS.map(b => { const lv = getLabValue(b.key); return lv ? `${b.name.en}: ${lv.v} ${b.unit} (${lv.date})` : null; }).filter(Boolean).join(", ");
    const whoopSummary = latestW ? WHOOP_METRICS.map(m => latestW[m.key] ? `${m.label.en}: ${latestW[m.key]}${m.unit}` : null).filter(Boolean).join(", ") : "No WHOOP data";
    const sysPrompt = `You are a longevity and health AI coach for Tahsin, a 43-year-old male (born Nov 21, 1982). He follows an advanced longevity protocol including rapamycin, metformin, NMN, and comprehensive supplementation. His target biological age is 35. He tracks with WHOOP Life.

LATEST WHOOP DATA: ${whoopSummary}
LATEST LAB VALUES: ${labSummary || "No lab data yet"}
SUPPLEMENTS: ${SUPPLEMENTS.map(s => s.name).join(", ")}
PROTOCOLS: ${PROTOCOLS.map(p => p.name.en).join(", ")}

Respond in ${lang === "ro" ? "Romanian" : "English"}. Be specific, evidence-based, and actionable. Reference his actual data when relevant. Keep responses concise but thorough. You can suggest adjustments to his protocols based on his biomarkers and WHOOP data.`;

    try {
      const resp = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, system: sysPrompt, messages: [
          ...chatMsgs.filter(m => m.role === "user" || m.role === "assistant").slice(-6).map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
          { role: "user", content: userMsg }
        ] })
      });
      const data = await resp.json();
      const aiText = data.reply || data.error || "Error processing request.";
      setChatMsgs(prev => [...prev, { role: "assistant", text: aiText }]);
    } catch (e) {
      setChatMsgs(prev => [...prev, { role: "assistant", text: lang === "ro" ? "Eroare de conexiune. Încearcă din nou." : "Connection error. Try again." }]);
    }
    setChatLoading(false);
  };

  // ============================================================
  // RENDER TABS
  // ============================================================
  const sty = {
    card: { background: "#0f172a", borderRadius: 14, padding: 20, border: "1px solid rgba(30,41,59,0.5)" },
    input: { background: "#1e293b", color: "#e2e8f0", border: "1px solid #334155", borderRadius: 8, padding: "6px 10px", fontSize: 13, width: "100%", fontFamily: "'JetBrains Mono', monospace" },
    btn: (c) => ({ background: `${c}22`, color: c, border: `1px solid ${c}44`, borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }),
    btnPrimary: { background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontSize: 14, fontWeight: 600 },
  };

  const renderDashboard = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a0a28 50%, #0a1628 100%)", borderRadius: 16, padding: 24, border: "1px solid rgba(139,92,246,0.2)", position: "relative", overflow: "hidden" }}>
        <h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 20, fontFamily: "'Playfair Display', serif" }}>{t.title}</h2>
        <p style={{ color: "#94a3b8", margin: "6px 0 0", fontSize: 12 }}>{t.subtitle} • v4.0</p>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${latestW ? 4 : 3}, 1fr)`, gap: 14, marginTop: 18 }}>
          {[{ l: t.dash.chronoAge, v: "43", s: t.dash.born }, { l: t.dash.bioTarget, v: "35", s: t.dash.reduction }, { l: t.dash.biomarkers, v: BIOMARKERS.length, s: t.dash.fullMonitor },
            ...(latestW ? [{ l: t.dash.lastRecovery, v: latestW.recovery ? `${latestW.recovery}%` : "—", s: `HRV: ${latestW.hrv || "—"} ms` }] : [])
          ].map((c, i) => (
            <div key={i} style={{ background: "rgba(15,23,42,0.6)", borderRadius: 12, padding: 14, border: "1px solid rgba(100,116,139,0.15)", textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5 }}>{c.l}</div>
              <div style={{ color: "#f1f5f9", fontSize: 24, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", margin: "4px 0" }}>{c.v}</div>
              <div style={{ color: "#475569", fontSize: 10 }}>{c.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ ...sty.card, border: "1px solid rgba(59,130,246,0.15)" }}>
          <h3 style={{ color: "#93c5fd", margin: "0 0 12px", fontSize: 13 }}>📋 {t.dash.dailyRoutine}</h3>
          {t.routine.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "4px 0", borderBottom: i < t.routine.length - 1 ? "1px solid rgba(30,41,59,0.8)" : "none" }}>
              <span style={{ color: "#3b82f6", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, minWidth: 42 }}>{r.t}</span>
              <span style={{ color: "#cbd5e1", fontSize: 11 }}>{r.a}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ ...sty.card, border: "1px solid rgba(34,197,94,0.15)" }}>
            <h3 style={{ color: "#86efac", margin: "0 0 10px", fontSize: 13 }}>🎯 {t.dash.topPriorities}</h3>
            {t.priorities.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: i < 4 ? "1px solid rgba(30,41,59,0.6)" : "none" }}>
                <span style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ color: "#e2e8f0", fontSize: 11 }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ ...sty.card, border: "1px solid rgba(234,179,8,0.15)" }}>
            <h3 style={{ color: "#fde047", margin: "0 0 10px", fontSize: 13 }}>📚 {t.dash.sources}</h3>
            {["Peter Attia — Outlive", "Andrew Huberman — Huberman Lab", "David Sinclair — Lifespan", "Bryan Johnson — Blueprint", "Rhonda Patrick — FoundMyFitness"].map((s, i) => (
              <div key={i} style={{ color: "#94a3b8", fontSize: 11, padding: "3px 0" }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWhoop = () => {
    const last7 = whoopData.slice(-7);
    const getAvg = (k) => { const v = last7.filter(e => e[k]).map(e => parseFloat(e[k])); return v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) : null; };
    const getTrend = (k) => whoopData.filter(e => e[k]).map(e => ({ v: parseFloat(e[k]), date: e.date })).slice(-14);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...sty.card, background: "linear-gradient(135deg, #0a1628, #1a2810, #0a1628)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div><h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 18 }}>⌚ {t.whoop.title}</h2><p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 11 }}>{t.whoop.subtitle} • {whoopData.length} {t.whoop.entries}</p></div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => fileRef.current?.click()} style={sty.btn("#3b82f6")}>{lang === "ro" ? "📂 Import Fisier" : "📂 Import File"}</button>
              <button onClick={() => { setShowWF(!showWF); setWForm({}); }} style={sty.btn(showWF ? "#ef4444" : "#22c55e")}>{showWF ? t.whoop.cancel : t.whoop.addData}</button>
            </div>
          </div>
          <input ref={fileRef} type="file" accept=".csv,.xml" onChange={handleFileImport} style={{ display: "none" }} />
          {importMsg && (
            <div style={{ marginTop: 10, background: importMsg.includes("reusit") || importMsg.includes("Success") ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)", color: importMsg.includes("reusit") || importMsg.includes("Success") ? "#4ade80" : "#f87171", padding: "8px 12px", borderRadius: 8, fontSize: 12 }}>{importMsg}</div>
          )}
          <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(59,130,246,0.08)", borderRadius: 8, border: "1px solid rgba(59,130,246,0.1)" }}>
            <div style={{ color: "#60a5fa", fontSize: 10, fontWeight: 600, marginBottom: 4 }}>{lang === "ro" ? "CUM EXPORTI DATELE:" : "HOW TO EXPORT DATA:"}</div>
            <div style={{ color: "#94a3b8", fontSize: 10, lineHeight: 1.6 }}>
              {lang === "ro" 
                ? "WHOOP: App > Settings > Data Export > CSV. Apple Health: iPhone > Health > Profil > Export All Health Data > ZIP (dezarhiveaza si uploadeaza export.xml)"
                : "WHOOP: App > Settings > Data Export > CSV. Apple Health: iPhone > Health > Profile > Export All Health Data > ZIP (unzip and upload export.xml)"}
            </div>
          </div>
        </div>
        {showWF && (
          <div style={sty.card}>
            <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
              <span style={{ color: "#94a3b8", fontSize: 12 }}>{t.whoop.date}:</span>
              <input type="date" value={wDate} onChange={e => setWDate(e.target.value)} style={{ ...sty.input, width: "auto" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {WHOOP_METRICS.map(m => (
                <div key={m.key} style={{ background: "#1e293b", borderRadius: 8, padding: 8 }}>
                  <div style={{ color: "#94a3b8", fontSize: 10, marginBottom: 4 }}>{m.icon} {m.label[lang]}</div>
                  <input type="number" step="any" value={wForm[m.key] || ""} onChange={e => setWForm({ ...wForm, [m.key]: e.target.value })} style={{ ...sty.input, fontSize: 14, fontWeight: 600 }} />
                </div>
              ))}
            </div>
            <div style={{ textAlign: "right", marginTop: 12 }}><button onClick={addWhoopEntry} style={sty.btnPrimary}>{t.whoop.save}</button></div>
          </div>
        )}
        {latestW && (
          <>
            <h3 style={{ color: "#e2e8f0", margin: 0, fontSize: 14 }}>{t.whoop.lastEntry} — {latestW.date}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {WHOOP_METRICS.filter(m => latestW[m.key]).map(m => {
                const v = parseFloat(latestW[m.key]); const z = getZone(m, v); const c = z ? zoneColor[z] : "#475569";
                const trend = getTrend(m.key);
                return (
                  <div key={m.key} style={{ ...sty.card, padding: 12, border: `1px solid ${c}22`, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0.12 }}><MiniChart data={trend} color={c} h={35} /></div>
                    <div style={{ position: "relative" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>{m.icon}</span>{z && <span style={{ background: `${c}22`, color: c, padding: "1px 5px", borderRadius: 5, fontSize: 8, fontWeight: 700 }}>{t.zones[z]}</span>}</div>
                      <div style={{ color: c, fontSize: 22, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", margin: "2px 0" }}>{m.key === "sleepH" ? v.toFixed(1) : Math.round(v)}</div>
                      <div style={{ color: "#64748b", fontSize: 9 }}>{m.label[lang]} {m.unit}</div>
                      {getAvg(m.key) && <div style={{ color: "#475569", fontSize: 8, marginTop: 2 }}>{t.whoop.avg7}: {getAvg(m.key)}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {whoopData.length > 0 && (
          <div style={sty.card}>
            <h3 style={{ color: "#e2e8f0", margin: "0 0 10px", fontSize: 13 }}>{t.whoop.history} ({whoopData.length} {t.whoop.days})</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                <thead><tr><th style={{ color: "#64748b", textAlign: "left", padding: "5px 6px", borderBottom: "1px solid #1e293b" }}>{t.whoop.date}</th>
                  {WHOOP_METRICS.slice(0, 7).map(m => <th key={m.key} style={{ color: "#64748b", textAlign: "center", padding: "5px 3px", borderBottom: "1px solid #1e293b" }}>{m.icon}</th>)}
                  <th></th>
                </tr></thead>
                <tbody>{[...whoopData].reverse().slice(0, 10).map((e, i) => (
                  <tr key={e.date}><td style={{ color: "#94a3b8", padding: "4px 6px", fontFamily: "'JetBrains Mono', monospace" }}>{e.date}</td>
                    {WHOOP_METRICS.slice(0, 7).map(m => { const z = getZone(m, e[m.key]); return <td key={m.key} style={{ color: z ? zoneColor[z] : "#475569", textAlign: "center", padding: "4px 3px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{e[m.key] || "—"}</td>; })}
                    <td><button onClick={() => delWhoop(e.date)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 10 }}>✕</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {!whoopData.length && !showWF && (
          <div style={{ ...sty.card, textAlign: "center", padding: 40 }}><div style={{ fontSize: 40, marginBottom: 10 }}>⌚</div><div style={{ color: "#94a3b8", fontSize: 13 }}>{t.whoop.noData}</div><div style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>{t.whoop.noDataSub}</div></div>
        )}
      </div>
    );
  };

  const renderLabs = () => {
    const cats = labCat === "all" ? CATS : [labCat];
    const filteredBM = BIOMARKERS.filter(b => cats.includes(b.cat));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...sty.card, background: "linear-gradient(135deg, #0a1628, #280a1a, #0a1628)", border: "1px solid rgba(236,72,153,0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div><h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 18 }}>🧪 {t.labs.title}</h2><p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 11 }}>{t.labs.subtitle} • {labData.length} {lang === "ro" ? "analize" : "tests"}</p></div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => labFileRef.current?.click()} disabled={labParsing} style={{ ...sty.btn("#8b5cf6"), opacity: labParsing ? 0.5 : 1 }}>{labParsing ? "⏳..." : (lang === "ro" ? "📄 Import PDF/Foto" : "📄 Import PDF/Photo")}</button>
              <button onClick={() => { setShowLF(!showLF); setLForm({}); }} style={sty.btn(showLF ? "#ef4444" : "#ec4899")}>{showLF ? t.whoop.cancel : t.labs.addLab}</button>
            </div>
          </div>
          <input ref={labFileRef} type="file" accept=".pdf,image/*" onChange={handleLabPdfImport} style={{ display: "none" }} />
          {labImportMsg && (
            <div style={{ marginTop: 10, background: labImportMsg.includes("reusit") || labImportMsg.includes("Success") ? "rgba(34,197,94,0.12)" : labImportMsg.includes("analizeaza") || labImportMsg.includes("analyzing") ? "rgba(139,92,246,0.12)" : "rgba(239,68,68,0.12)", color: labImportMsg.includes("reusit") || labImportMsg.includes("Success") ? "#4ade80" : labImportMsg.includes("analizeaza") || labImportMsg.includes("analyzing") ? "#c4b5fd" : "#f87171", padding: "10px 14px", borderRadius: 8, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
              {labParsing && <span style={{ display: "inline-block", animation: "spin 1s linear infinite", fontSize: 14 }}>⏳</span>}
              {labImportMsg}
            </div>
          )}
          <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(139,92,246,0.08)", borderRadius: 8, border: "1px solid rgba(139,92,246,0.1)" }}>
            <div style={{ color: "#a78bfa", fontSize: 10, fontWeight: 600, marginBottom: 3 }}>{lang === "ro" ? "IMPORT AUTOMAT:" : "AUTO IMPORT:"}</div>
            <div style={{ color: "#94a3b8", fontSize: 10, lineHeight: 1.5 }}>
              {lang === "ro"
                ? "Uploadeaza PDF-ul de la laborator (Synevo, MedLife, Regina Maria) sau o foto a rezultatelor. AI-ul extrage automat toate valorile."
                : "Upload your lab PDF (Synevo, MedLife, Regina Maria) or a photo of results. AI extracts all values automatically."}
            </div>
          </div>
        </div>
        {showLF && (
          <div style={sty.card}>
            <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ color: "#94a3b8", fontSize: 12 }}>{t.labs.labDate}:</span>
              <input type="date" value={lDate} onChange={e => setLDate(e.target.value)} style={{ ...sty.input, width: "auto" }} />
              <span style={{ color: "#94a3b8", fontSize: 12 }}>{t.labs.labName}:</span>
              <input type="text" value={lName} onChange={e => setLName(e.target.value)} placeholder="ex: Synevo, MedLife" style={{ ...sty.input, width: 160 }} />
            </div>
            {CATS.map(cat => (
              <div key={cat} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: CC[cat].border }} />
                  <span style={{ color: CC[cat].text, fontSize: 12, fontWeight: 600 }}>{lang === "ro" ? cat : CAT_EN[cat]}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                  {BIOMARKERS.filter(b => b.cat === cat).map(bm => (
                    <div key={bm.key} style={{ background: CC[cat].bg, borderRadius: 8, padding: 8, border: `1px solid ${CC[cat].border}15` }}>
                      <div style={{ color: "#94a3b8", fontSize: 9, marginBottom: 3 }}>{bm.name[lang]} <span style={{ color: "#475569" }}>({bm.target} {bm.unit})</span></div>
                      <input type="number" step="any" value={lForm[bm.key] || ""} onChange={e => setLForm({ ...lForm, [bm.key]: e.target.value })} style={{ ...sty.input, fontSize: 13, fontWeight: 600 }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ textAlign: "right" }}><button onClick={addLabEntry} style={sty.btnPrimary}>{t.labs.save}</button></div>
          </div>
        )}
        {/* Category filter */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button onClick={() => setLabCat("all")} style={{ ...sty.btn(labCat === "all" ? "#8b5cf6" : "#475569"), padding: "4px 10px", fontSize: 10 }}>{t.labs.all}</button>
          {CATS.map(c => <button key={c} onClick={() => setLabCat(c)} style={{ ...sty.btn(labCat === c ? CC[c].border : "#475569"), padding: "4px 10px", fontSize: 10 }}>{lang === "ro" ? c : CAT_EN[c]}</button>)}
        </div>
        {/* Latest values grid */}
        {labData.length > 0 && (
          <>
            <h3 style={{ color: "#e2e8f0", margin: 0, fontSize: 14 }}>{t.labs.latestResults}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {filteredBM.map(bm => {
                const lv = getLabValue(bm.key); const trend = getLabTrend(bm.key);
                const z = lv ? getZone(bm, lv.v) : null; const c = z ? zoneColor[z] : "#334155";
                return (
                  <div key={bm.key} style={{ ...sty.card, padding: 12, border: `1px solid ${c}22`, position: "relative", overflow: "hidden" }}>
                    {trend.length > 1 && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0.12 }}><MiniChart data={trend} color={c} h={30} /></div>}
                    <div style={{ position: "relative" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "#94a3b8", fontSize: 9 }}>{bm.name[lang]}</span>
                        {z && <span style={{ background: `${c}22`, color: c, padding: "1px 4px", borderRadius: 4, fontSize: 7, fontWeight: 700 }}>{t.zones[z]}</span>}
                      </div>
                      <div style={{ color: lv ? c : "#334155", fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", margin: "2px 0" }}>{lv ? lv.v : "—"}</div>
                      <div style={{ color: "#475569", fontSize: 8 }}>{t.labs.target}: {bm.target} {bm.unit}</div>
                      {lv && <div style={{ color: "#334155", fontSize: 8, marginTop: 1 }}>{lv.date}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {/* Lab history */}
        {labData.length > 0 && (
          <div style={sty.card}>
            <h3 style={{ color: "#e2e8f0", margin: "0 0 10px", fontSize: 13 }}>{t.labs.labHistory}</h3>
            {[...labData].reverse().slice(0, 8).map((entry, i) => {
              const filledCount = Object.keys(entry.values).filter(k => entry.values[k]).length;
              return (
                <div key={entry.ts} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < Math.min(labData.length, 8) - 1 ? "1px solid rgba(30,41,59,0.5)" : "none" }}>
                  <div><span style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>{entry.date}</span>{entry.lab && <span style={{ color: "#64748b", fontSize: 11, marginLeft: 8 }}>{entry.lab}</span>}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#475569", fontSize: 10 }}>{filledCount} {lang === "ro" ? "markeri" : "markers"}</span>
                    <button onClick={() => delLab(entry.ts)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 10 }}>✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!labData.length && !showLF && (
          <div style={{ ...sty.card, textAlign: "center", padding: 40 }}><div style={{ fontSize: 40, marginBottom: 10 }}>🧪</div><div style={{ color: "#94a3b8", fontSize: 13 }}>{t.labs.noLabs}</div><div style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>{t.labs.noLabsSub}</div></div>
        )}
      </div>
    );
  };

  const renderBiomarkers = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ ...sty.card, border: "1px solid rgba(59,130,246,0.15)" }}><h2 style={{ color: "#e2e8f0", margin: "0 0 4px", fontSize: 18 }}>{t.bio.title} ({BIOMARKERS.length})</h2><p style={{ color: "#64748b", margin: 0, fontSize: 11 }}>{t.bio.subtitle}</p></div>
      {CATS.map(cat => (
        <div key={cat}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: CC[cat].border }} /><h3 style={{ color: CC[cat].text, margin: 0, fontSize: 13 }}>{lang === "ro" ? cat : CAT_EN[cat]}</h3></div>
          {BIOMARKERS.filter(b => b.cat === cat).map((b, i) => {
            const lv = getLabValue(b.key); const z = lv ? getZone(b, lv.v) : null;
            return (
              <div key={i} style={{ background: CC[cat].bg, borderRadius: 8, padding: "8px 12px", marginBottom: 3, border: `1px solid ${CC[cat].border}22`, display: "grid", gridTemplateColumns: "1.3fr 0.8fr 0.5fr 0.5fr 1.5fr", gap: 6, alignItems: "center" }}>
                <div style={{ color: "#e2e8f0", fontSize: 11, fontWeight: 600 }}>{b.name[lang]}</div>
                <div><div style={{ color: "#475569", fontSize: 8 }}>{t.bio.targetLabel}</div><div style={{ color: CC[cat].text, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{b.target} {b.unit}</div></div>
                <div>{lv ? <><div style={{ color: "#475569", fontSize: 8 }}>{t.labs.value}</div><div style={{ color: z ? zoneColor[z] : "#475569", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{lv.v}</div></> : <div style={{ color: "#334155", fontSize: 10 }}>—</div>}</div>
                {lv && z ? <div><span style={{ background: `${zoneColor[z]}22`, color: zoneColor[z], padding: "1px 5px", borderRadius: 4, fontSize: 8, fontWeight: 700 }}>{t.zones[z]}</span></div> : <div></div>}
                <div style={{ color: "#64748b", fontSize: 9 }}>{b.imp[lang]}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const renderProtocols = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ ...sty.card, border: "1px solid rgba(168,85,247,0.15)" }}><h2 style={{ color: "#e2e8f0", margin: "0 0 4px", fontSize: 18 }}>{t.proto.title} ({PROTOCOLS.length})</h2><p style={{ color: "#64748b", margin: 0, fontSize: 11 }}>{t.proto.subtitle}</p></div>
      {PROTOCOLS.map((p, i) => (
        <div key={i} onClick={() => setExpProto(expProto === i ? null : i)} style={{ ...sty.card, padding: 14, cursor: "pointer", border: expProto === i ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(30,41,59,0.5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{p.name[lang]}</span>
                <span style={{ background: p.st === "off-label" ? "#fbbf2422" : p.st === "experimental" ? "#f8717122" : p.st === "lifestyle" ? "#4ade8022" : "#60a5fa22", color: p.st === "off-label" ? "#fbbf24" : p.st === "experimental" ? "#f87171" : p.st === "lifestyle" ? "#4ade80" : "#60a5fa", padding: "1px 6px", borderRadius: 20, fontSize: 8, textTransform: "uppercase" }}>{p.st}</span>
              </div>
              <div style={{ color: "#94a3b8", fontSize: 11 }}>{p.desc[lang]}</div>
              <div style={{ color: "#fbbf24", fontSize: 10, marginTop: 2 }}>{t.proto.evidence}: {p.ev}</div>
            </div>
            <span style={{ color: "#475569", fontSize: 14, transform: expProto === i ? "rotate(180deg)" : "none", transition: "0.2s" }}>▾</span>
          </div>
          {expProto === i && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(30,41,59,0.6)", display: "flex", flexDirection: "column", gap: 6 }}>
              <div><div style={{ color: "#8b5cf6", fontSize: 9, fontWeight: 600, textTransform: "uppercase" }}>{t.proto.protocol}</div><div style={{ color: "#cbd5e1", fontSize: 11, marginTop: 2 }}>{p.proto[lang]}</div></div>
              <div><div style={{ color: "#3b82f6", fontSize: 9, fontWeight: 600, textTransform: "uppercase" }}>{t.proto.studies}</div><div style={{ color: "#cbd5e1", fontSize: 11, marginTop: 2 }}>{p.study[lang]}</div></div>
              <div><div style={{ color: "#ef4444", fontSize: 9, fontWeight: 600, textTransform: "uppercase" }}>{t.proto.risks}</div><div style={{ color: "#fca5a5", fontSize: 11, marginTop: 2 }}>{p.risk[lang]}</div></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSupplements = () => {
    const pMap = { E: { l: t.essentials, c: "#ef4444" }, I: { l: t.important, c: "#f59e0b" }, M: { l: t.moderate, c: "#22c55e" } };
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ ...sty.card, border: "1px solid rgba(6,182,212,0.15)" }}><h2 style={{ color: "#e2e8f0", margin: "0 0 4px", fontSize: 18 }}>{t.supp.title} ({SUPPLEMENTS.length})</h2><p style={{ color: "#64748b", margin: 0, fontSize: 11 }}>{t.supp.subtitle}</p></div>
        {["E", "I", "M"].map(pr => (
          <div key={pr}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "4px 0 5px" }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: pMap[pr].c }} /><span style={{ color: pMap[pr].c, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{pMap[pr].l}</span></div>
            {SUPPLEMENTS.filter(s => s.p === pr).map((s, i) => (
              <div key={i} onClick={() => setExpSupp(expSupp === `${pr}${i}` ? null : `${pr}${i}`)} style={{ ...sty.card, padding: 10, marginBottom: 3, cursor: "pointer", border: `1px solid ${pMap[pr].c}15` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><span style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>{s.name}</span><span style={{ color: "#64748b", fontSize: 10, marginLeft: 8 }}>{s.dose}</span></div>
                  <span style={{ color: "#475569", fontSize: 12 }}>▾</span>
                </div>
                {expSupp === `${pr}${i}` && (
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(30,41,59,0.5)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    <div><div style={{ color: "#06b6d4", fontSize: 8, fontWeight: 600, textTransform: "uppercase" }}>{t.supp.timing}</div><div style={{ color: "#cbd5e1", fontSize: 10, marginTop: 1 }}>{s.timing[lang]}</div></div>
                    <div><div style={{ color: "#a855f7", fontSize: 8, fontWeight: 600, textTransform: "uppercase" }}>{t.supp.brand}</div><div style={{ color: "#cbd5e1", fontSize: 10, marginTop: 1 }}>{s.brand}</div></div>
                    <div style={{ gridColumn: "1/-1" }}><div style={{ color: "#22c55e", fontSize: 8, fontWeight: 600, textTransform: "uppercase" }}>{t.supp.why}</div><div style={{ color: "#94a3b8", fontSize: 10, marginTop: 1 }}>{s.why[lang]}</div></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderExercise = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ ...sty.card, border: "1px solid rgba(249,115,22,0.15)" }}><h2 style={{ color: "#e2e8f0", margin: "0 0 4px", fontSize: 18 }}>{t.ex.title}</h2><p style={{ color: "#64748b", margin: 0, fontSize: 11 }}>{t.ex.subtitle}</p></div>
      {EXERCISE.map((d, i) => (
        <div key={i} style={{ ...sty.card, padding: 12, borderLeft: `3px solid ${d.c}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><span style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 700 }}>{d.day[lang]}</span><span style={{ color: d.c, fontSize: 10, fontWeight: 600 }}>{d.type[lang]}</span></div>
          <div style={{ color: "#94a3b8", fontSize: 10 }}>{d.det[lang]}</div>
        </div>
      ))}
    </div>
  );

  const renderNutrition = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ ...sty.card, border: "1px solid rgba(34,197,94,0.15)" }}><h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 18 }}>{t.nut.title}</h2></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {[{ l: lang === "ro" ? "Proteine" : "Protein", v: "160-180g" }, { l: lang === "ro" ? "Carbi" : "Carbs", v: "200-300g" }, { l: lang === "ro" ? "Grăsimi" : "Fats", v: "80-100g" }, { l: lang === "ro" ? "Calorii" : "Calories", v: "2200-2600" }].map((m, i) => (
          <div key={i} style={{ ...sty.card, padding: 12, textAlign: "center", border: "1px solid rgba(34,197,94,0.1)" }}>
            <div style={{ color: "#64748b", fontSize: 9, textTransform: "uppercase" }}>{m.l}</div>
            <div style={{ color: "#4ade80", fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", margin: "3px 0" }}>{m.v}</div>
          </div>
        ))}
      </div>
      <div style={sty.card}>
        <h3 style={{ color: "#86efac", margin: "0 0 10px", fontSize: 13 }}>🥇 {t.nut.superfoods}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[{ n: "Broccoli Sprouts", w: "Sulforaphane — NRF2" }, { n: "Sardines", w: "Omega-3, Vit D, Se" }, { n: "EVOO", w: lang === "ro" ? "Polifenoli, 2-4 linguri/zi" : "Polyphenols, 2-4 tbsp/day" }, { n: "Berries", w: lang === "ro" ? "Antocianine, neuroprotective" : "Anthocyanins, neuroprotective" }, { n: lang === "ro" ? "Nuci" : "Nuts", w: "30g/day = -20% mortality" }, { n: "Matcha", w: "EGCG — autophagy" }].map((s, i) => (
            <div key={i} style={{ background: "rgba(15,23,42,0.5)", borderRadius: 8, padding: 8, border: "1px solid rgba(34,197,94,0.08)" }}>
              <div style={{ color: "#e2e8f0", fontSize: 11, fontWeight: 600 }}>{s.n}</div><div style={{ color: "#64748b", fontSize: 9 }}>{s.w}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSleep = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ ...sty.card, border: "1px solid rgba(99,102,241,0.15)" }}><h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 18 }}>{t.slp.title} — 7-8.5h</h2></div>
      <div style={sty.card}>
        <h3 style={{ color: "#a5b4fc", margin: "0 0 10px", fontSize: 13 }}>🌙 {t.slp.protocol}</h3>
        {(lang === "ro" ? ["Temperatură dormitor: 18-19°C", "Zero ecrane 1h înainte de somn", "ZERO cafeină după 14:00", "Culcare 22:30, trezire 06:00", "Mg Glycinate 400mg + L-Theanine 200mg seara", "Lumină solară în primele 30 min", "Ultima masă: min 3h înainte", "Tracking: WHOOP Life"] : ["Bedroom temperature: 18-19°C", "Zero screens 1h before sleep", "ZERO caffeine after 2 PM", "Sleep 22:30, wake 06:00", "Mg Glycinate 400mg + L-Theanine 200mg evening", "Sunlight in first 30 min", "Last meal: min 3h before bed", "Tracking: WHOOP Life"]).map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: i < 7 ? "1px solid rgba(30,41,59,0.5)" : "none" }}>
            <span style={{ color: "#6366f1", fontWeight: 700, fontSize: 11 }}>{i + 1}.</span><span style={{ color: "#cbd5e1", fontSize: 11 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScreening = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ ...sty.card, border: "1px solid rgba(236,72,153,0.15)" }}><h2 style={{ color: "#e2e8f0", margin: "0 0 4px", fontSize: 18 }}>{t.scr.title}</h2><p style={{ color: "#64748b", margin: 0, fontSize: 11 }}>{t.scr.subtitle}</p></div>
      {SCREENINGS.map((s, i) => (
        <div key={i} style={{ ...sty.card, padding: 12, borderLeft: `3px solid ${s.due === "2026" ? "#ef4444" : "#22c55e"}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>{s.test}</div><div style={{ color: "#94a3b8", fontSize: 10, marginTop: 1 }}>{s.why[lang]}</div></div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
            <div style={{ background: s.due === "2026" ? "#ef444422" : "#22c55e22", color: s.due === "2026" ? "#f87171" : "#4ade80", padding: "2px 7px", borderRadius: 20, fontSize: 9, fontWeight: 600 }}>{t.scr.due} {s.due}</div>
            <div style={{ color: "#475569", fontSize: 8, marginTop: 2 }}>{s.freq}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChat = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "70vh" }}>
      <div style={{ ...sty.card, background: "linear-gradient(135deg, #0a1628, #0a2818, #0a1628)", border: "1px solid rgba(34,197,94,0.2)", flexShrink: 0 }}>
        <h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 18 }}>🤖 {t.chat.title}</h2>
        <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 11 }}>{t.chat.subtitle}</p>
      </div>
      <div ref={chatRef} style={{ ...sty.card, flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, padding: 16 }}>
        <div style={{ background: "rgba(34,197,94,0.08)", borderRadius: 12, padding: 12, borderLeft: "3px solid #22c55e", maxWidth: "85%" }}>
          <div style={{ color: "#4ade80", fontSize: 9, fontWeight: 600, marginBottom: 4 }}>AI COACH</div>
          <div style={{ color: "#cbd5e1", fontSize: 12, lineHeight: 1.5 }}>{t.chat.welcome}</div>
        </div>
        {chatMsgs.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              background: msg.role === "user" ? "rgba(99,102,241,0.15)" : "rgba(34,197,94,0.08)",
              borderRadius: 12, padding: 12, maxWidth: "85%",
              borderLeft: msg.role === "user" ? "none" : "3px solid #22c55e",
              borderRight: msg.role === "user" ? "3px solid #6366f1" : "none",
            }}>
              <div style={{ color: msg.role === "user" ? "#818cf8" : "#4ade80", fontSize: 9, fontWeight: 600, marginBottom: 3 }}>{msg.role === "user" ? "YOU" : "AI COACH"}</div>
              <div style={{ color: "#cbd5e1", fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{msg.text}</div>
            </div>
          </div>
        ))}
        {chatLoading && (
          <div style={{ background: "rgba(34,197,94,0.08)", borderRadius: 12, padding: 12, borderLeft: "3px solid #22c55e", maxWidth: "85%" }}>
            <div style={{ color: "#4ade80", fontSize: 12 }}>⏳ {t.chat.thinking}</div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <input value={chatInput} onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendChat()}
          placeholder={t.chat.placeholder}
          style={{ ...sty.input, flex: 1, padding: "10px 14px", fontSize: 13, borderRadius: 12 }} />
        <button onClick={sendChat} disabled={chatLoading}
          style={{ ...sty.btnPrimary, opacity: chatLoading ? 0.5 : 1, borderRadius: 12, padding: "10px 20px" }}>{t.chat.send}</button>
      </div>
    </div>
  );

  const CONTENT = { dashboard: renderDashboard, whoop: renderWhoop, labs: renderLabs, biomarkers: renderBiomarkers, protocols: renderProtocols, supplements: renderSupplements, exercise: renderExercise, nutrition: renderNutrition, sleep: renderSleep, screening: renderScreening, chat: renderChat };

  if (!ready) return <div style={{ minHeight: "100vh", background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#8b5cf6", fontSize: 14 }}>⏳ Loading LONGEVITY OS...</div></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'Outfit', -apple-system, sans-serif", color: "#e2e8f0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      {/* HEADER */}
      <div style={{ background: "linear-gradient(180deg, #0a0f2e, #020617)", padding: "16px 20px 0", borderBottom: "1px solid rgba(30,41,59,0.5)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #8b5cf6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>∞</div>
            <div><h1 style={{ margin: 0, fontSize: 16, fontFamily: "'Playfair Display', serif" }}>LONGEVITY OS</h1><p style={{ margin: 0, color: "#64748b", fontSize: 9, letterSpacing: 2, textTransform: "uppercase" }}>v4.0 • {t.subtitle}</p></div>
          </div>
          <button onClick={() => setLang(lang === "ro" ? "en" : "ro")} style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
            {lang === "ro" ? "🇷🇴 RO → EN" : "🇬🇧 EN → RO"}
          </button>
        </div>
        <div style={{ display: "flex", gap: 1, overflowX: "auto", paddingBottom: 0 }}>
          {Object.entries(t.tabs).map(([id, label]) => {
            const icons = { dashboard: "◉", whoop: "⌚", labs: "🧪", biomarkers: "🧬", protocols: "⚗️", supplements: "💊", exercise: "🏋️", nutrition: "🥗", sleep: "🌙", screening: "🔬", chat: "🤖" };
            return (
              <button key={id} onClick={() => setTab(id)} style={{
                background: tab === id ? "rgba(139,92,246,0.15)" : "transparent",
                border: "none", borderBottom: tab === id ? "2px solid #8b5cf6" : "2px solid transparent",
                color: tab === id ? "#c4b5fd" : "#475569", padding: "7px 8px", cursor: "pointer",
                fontSize: 10, fontWeight: tab === id ? 600 : 400, whiteSpace: "nowrap",
                display: "flex", alignItems: "center", gap: 3
              }}><span style={{ fontSize: 11 }}>{icons[id]}</span><span>{label}</span></button>
            );
          })}
        </div>
      </div>
      {/* CONTENT */}
      <div style={{ padding: "18px 20px", maxWidth: 1100, margin: "0 auto" }}>{CONTENT[tab]?.()}</div>
      {/* FOOTER */}
      <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(30,41,59,0.3)", textAlign: "center" }}>
        <p style={{ color: "#334155", fontSize: 8, margin: 0 }}>{t.disclaimer}</p>
      </div>
    </div>
  );
}
