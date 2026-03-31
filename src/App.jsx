import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// TRANSLATIONS
// ============================================================
const T = {
  ro: {
    title: "LONGEVITY OS", subtitle: "Protocol Personalizat • Tahsin",
    tabs: { dashboard: "Dashboard", tracker: "Tracker", whoop: "WHOOP", labs: "Analize", biomarkers: "Biomarkeri", protocols: "Protocoale", supplements: "Suplimente", exercise: "Exercitii", nutrition: "Nutritie", sleep: "Somn", screening: "Screening", chat: "AI Coach" },
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
    tabs: { dashboard: "Dashboard", tracker: "Tracker", whoop: "WHOOP", labs: "Lab Results", biomarkers: "Biomarkers", protocols: "Protocols", supplements: "Supplements", exercise: "Exercise", nutrition: "Nutrition", sleep: "Sleep", screening: "Screening", chat: "AI Coach" },
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
  const [chatMsgs, setChatMsgs] = useState(() => {
    try { const saved = localStorage.getItem("chat-v4"); return saved ? JSON.parse(saved) : []; } catch { return []; }
  });
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [trackerData, setTrackerData] = useState(() => {
    try { const s = localStorage.getItem("tracker-v4"); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });

  const today = new Date().toISOString().split("T")[0];
  const todayTracker = trackerData[today] || { weight: "", water: 0, mood: 0, energy: 0, fasting: false, fastStart: null, checklist: {} };
  const CHECKLIST_ITEMS = [
    { key: "supplements_am", label: { ro: "Suplimente dimineata", en: "Morning supplements" }, icon: "💊" },
    { key: "supplements_pm", label: { ro: "Suplimente seara", en: "Evening supplements" }, icon: "💊" },
    { key: "cold_shower", label: { ro: "Dus rece", en: "Cold shower" }, icon: "🥶" },
    { key: "sunlight", label: { ro: "Lumina solara 10 min", en: "Sunlight 10 min" }, icon: "☀️" },
    { key: "workout", label: { ro: "Antrenament", en: "Workout" }, icon: "🏋️" },
    { key: "sauna", label: { ro: "Sauna", en: "Sauna" }, icon: "🧖" },
    { key: "meditation", label: { ro: "Meditatie", en: "Meditation" }, icon: "🧘" },
    { key: "no_alcohol", label: { ro: "Zero alcool", en: "Zero alcohol" }, icon: "🚫" },
    { key: "sleep_routine", label: { ro: "Rutina somn (22:30)", en: "Sleep routine (22:30)" }, icon: "🌙" },
    { key: "blue_block", label: { ro: "Blue-blocking glasses", en: "Blue-blocking glasses" }, icon: "👓" },
    { key: "protein_target", label: { ro: "Proteine 160g+", en: "Protein 160g+" }, icon: "🥩" },
    { key: "no_processed", label: { ro: "Zero procesate", en: "Zero processed" }, icon: "🥗" },
  ];

  const updateTracker = (field, value) => {
    const updated = { ...trackerData, [today]: { ...todayTracker, [field]: value } };
    setTrackerData(updated);
    try { localStorage.setItem("tracker-v4", JSON.stringify(updated)); } catch {}
  };

  const toggleCheck = (key) => {
    const checks = { ...todayTracker.checklist, [key]: !todayTracker.checklist[key] };
    updateTracker("checklist", checks);
  };

  const getStreak = () => {
    let streak = 0; let d = new Date();
    for (let i = 0; i < 365; i++) {
      const ds = d.toISOString().split("T")[0];
      const day = trackerData[ds];
      if (day && day.checklist && Object.values(day.checklist).filter(Boolean).length >= 5) { streak++; d.setDate(d.getDate() - 1); }
      else if (i === 0) { d.setDate(d.getDate() - 1); }
      else break;
    }
    return streak;
  };

  const getWeightTrend = () => {
    return Object.entries(trackerData).filter(([_, v]) => v.weight).map(([d, v]) => ({ date: d, v: parseFloat(v.weight) })).sort((a, b) => a.date.localeCompare(b.date)).slice(-30);
  };

  const getLongevityScore = () => {
    let score = 50; let factors = 0;
    if (latestW) {
      if (latestW.recovery) { const r = parseFloat(latestW.recovery); score += r >= 67 ? 10 : r >= 34 ? 5 : -5; factors++; }
      if (latestW.hrv) { const h = parseFloat(latestW.hrv); score += h >= 50 ? 10 : h >= 30 ? 5 : -5; factors++; }
      if (latestW.sleepScore) { const s = parseFloat(latestW.sleepScore); score += s >= 85 ? 10 : s >= 70 ? 5 : -5; factors++; }
    }
    const criticalBMs = ["glucose", "hba1c", "hscrp", "apob", "ldl", "testTotal", "vitd"];
    criticalBMs.forEach(key => {
      const lv = getLabValue(key); const bm = BIOMARKERS.find(b => b.key === key);
      if (lv && bm) { const z = getZone(bm, lv.v); score += z === "optimal" ? 5 : z === "warning" ? 0 : -5; factors++; }
    });
    const checkCount = todayTracker.checklist ? Object.values(todayTracker.checklist).filter(Boolean).length : 0;
    score += Math.round(checkCount / CHECKLIST_ITEMS.length * 10);
    return Math.max(0, Math.min(100, score));
  };
  const chatRef = useRef(null);
  const t = T[lang];

  useEffect(() => { loadAll(); }, []);
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [chatMsgs]);
  useEffect(() => { try { localStorage.setItem("chat-v4", JSON.stringify(chatMsgs.slice(-50))); } catch {} }, [chatMsgs]);
  const clearChat = () => { setChatMsgs([]); try { localStorage.removeItem("chat-v4"); } catch {} };

  const [infoPopup, setInfoPopup] = useState(null);

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
    infoBtn: { background: "rgba(99,102,241,0.2)", color: "#818cf8", border: "none", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 10, fontWeight: 700, flexShrink: 0 },
  };

  const BM_INFO = {
    glucose: { ro: { w: "Nivelul zaharului din sange dupa 8h fara mancare.", h: "Rezistenta la insulina, prediabet, diabet tip 2. Risc cardiovascular crescut.", l: "Hipoglicemie: ameteala, tremur, confuzie.", a: "Reduce carbohidratii rafinati. Miscare dupa mese. Metformina/Acarboza." }, en: { w: "Blood sugar level after 8h fasting.", h: "Insulin resistance, prediabetes, type 2 diabetes. Increased cardiovascular risk.", l: "Hypoglycemia: dizziness, tremor, confusion.", a: "Reduce refined carbs. Walk after meals. Metformin/Acarbose." } },
    hba1c: { ro: { w: "Media glucozei din ultimele 3 luni. Cel mai bun marker de control glicemic.", h: "Diabet sau prediabet. Risc de neuropatie, retinopatie, boli de rinichi.", l: "Rar problematic. Posibil anemie.", a: "Dieta low-glycemic. Post intermitent. Berberine sau Metformina." }, en: { w: "3-month glucose average. Best glycemic control marker.", h: "Diabetes or prediabetes. Risk of neuropathy, retinopathy, kidney disease.", l: "Rarely problematic. Possible anemia.", a: "Low-glycemic diet. Intermittent fasting. Berberine or Metformin." } },
    insulin: { ro: { w: "Cat de multa insulina produce pancreasul. Marker precoce - se schimba cu ANII inainte de diabet.", h: "Rezistenta la insulina. Inflamatie cronica. Risc cancer. Imbatranire accelerata.", l: "Normal daca glucoza e normala.", a: "Post intermitent 16:8. Exercitii de forta. Reduce zaharul." }, en: { w: "How much insulin the pancreas produces. Early marker - changes YEARS before diabetes.", h: "Insulin resistance. Chronic inflammation. Cancer risk. Accelerated aging.", l: "Normal if glucose is normal.", a: "Intermittent fasting 16:8. Strength training. Reduce sugar." } },
    homair: { ro: { w: "Index calculat din glucoza si insulina. Cel mai precis marker de rezistenta la insulina.", h: "Rezistenta la insulina confirmata. Risc de diabet, boli cardiace, cancer.", l: "Sensibilitate excelenta la insulina.", a: "Exercitii aerobice + forta. Reducere greutate. Metformina." }, en: { w: "Index from glucose and insulin. Most precise insulin resistance marker.", h: "Confirmed insulin resistance. Risk of diabetes, heart disease, cancer.", l: "Excellent insulin sensitivity.", a: "Aerobic + strength exercise. Weight loss. Metformin." } },
    hscrp: { ro: { w: "Masoara inflamatia din tot corpul. Cel mai important marker de inflamatie cronica.", h: "Inflamatie cronica = accelereaza TOATE bolile: inima, cancer, Alzheimer, imbatranire.", l: "Excelent! Inflamatie minima.", a: "Omega-3 (4g/zi). Curcumina. Elimina zahar si alimente procesate. Somn 7-8h." }, en: { w: "Measures whole-body inflammation. Most important chronic inflammation marker.", h: "Chronic inflammation accelerates ALL diseases: heart, cancer, Alzheimer, aging.", l: "Excellent! Minimal inflammation.", a: "Omega-3 (4g/day). Curcumin. Eliminate sugar and processed food. Sleep 7-8h." } },
    homocysteine: { ro: { w: "Aminoacid legat de sanatatea inimii si creierului. Creste fara B12 si folat.", h: "Risc crescut de infarct, AVC, dementa Alzheimer, depresie.", l: "Normal.", a: "Vitamina B12 metilcobalamina. Folat (5-MTHF). Vitamina B6." }, en: { w: "Amino acid linked to heart and brain health. Rises without B12 and folate.", h: "Increased risk of heart attack, stroke, Alzheimer dementia, depression.", l: "Normal.", a: "Vitamin B12 methylcobalamin. Folate (5-MTHF). Vitamin B6." } },
    apob: { ro: { w: "Numarul de particule aterogene din sange. MAI BUN decat LDL pentru predictia riscului cardiac.", h: "Ateroscleroza progresiva. Risc major de infarct si AVC. Placile se acumuleaza in artere.", l: "Protectie cardiovasculara excelenta.", a: "Statine sau Ezetimib (discuta cu medicul). Dieta, exercitii. PCSK9 inhibitori." }, en: { w: "Number of atherogenic particles in blood. BETTER than LDL for cardiac risk prediction.", h: "Progressive atherosclerosis. Major risk of heart attack and stroke.", l: "Excellent cardiovascular protection.", a: "Statins or Ezetimibe (discuss with doctor). Diet, exercise. PCSK9 inhibitors." } },
    ldl: { ro: { w: "Colesterolul 'rau'. Cauza directa a aterosclerozei - se depune in peretii arterelor.", h: "Placi aterosclerotice. Risc de infarct si AVC. Artere inguste.", l: "Bine pentru longevitate.", a: "Statine. Dieta saraca in grasimi saturate. Exercitii aerobice." }, en: { w: "The 'bad' cholesterol. Direct cause of atherosclerosis - deposits in artery walls.", h: "Atherosclerotic plaques. Risk of heart attack and stroke. Narrowed arteries.", l: "Good for longevity.", a: "Statins. Low saturated fat diet. Aerobic exercise." } },
    hdl: { ro: { w: "Colesterolul 'bun'. Curata colesterolul din artere si il duce la ficat.", h: "Foarte bine - protectie cardiovasculara.", l: "Risc cardiovascular crescut. Lipsa protectiei arteriale.", a: "Exercitii aerobice. EVOO (ulei masline). Omega-3. Evita fumatul." }, en: { w: "The 'good' cholesterol. Cleans cholesterol from arteries and returns it to liver.", h: "Very good - cardiovascular protection.", l: "Increased cardiovascular risk. Lack of arterial protection.", a: "Aerobic exercise. EVOO (olive oil). Omega-3. Avoid smoking." } },
    trig: { ro: { w: "Grasimi din sange. Indicator de rezistenta la insulina si risc cardiac.", h: "Sindrom metabolic. Risc pancreatita (peste 500). Risc cardiovascular.", l: "Excelent.", a: "Reduce carbohidratii. Omega-3 (4g). Post intermitent. Elimina alcoolul." }, en: { w: "Blood fats. Indicator of insulin resistance and cardiac risk.", h: "Metabolic syndrome. Pancreatitis risk (above 500). Cardiovascular risk.", l: "Excellent.", a: "Reduce carbs. Omega-3 (4g). Intermittent fasting. Eliminate alcohol." } },
    testTotal: { ro: { w: "Hormonul masculin principal. Esential pentru masa musculara, energie, libido, cognitie.", h: "Rar problematic natural. Posibil tumor.", l: "Oboseala cronica, pierdere masa musculara, depresie, libido scazut, grasime abdominala.", a: "Somn 7-8h. Antrenament forta. Zinc. Ashwagandha. TRT daca e sub 300 (cu medic)." }, en: { w: "Main male hormone. Essential for muscle mass, energy, libido, cognition.", h: "Rarely problematic naturally. Possible tumor.", l: "Chronic fatigue, muscle loss, depression, low libido, abdominal fat.", a: "Sleep 7-8h. Strength training. Zinc. Ashwagandha. TRT if under 300 (with doctor)." } },
    testFree: { ro: { w: "Testosteronul activ, nelegat de proteine. Cel care chiar functioneaza in corp.", h: "Rar problematic.", l: "Aceleasi simptome ca testosteron total scazut, chiar daca totalul pare normal.", a: "Reduce SHBG: zinc, magneziu. Scade grasimea corporala." }, en: { w: "Active testosterone, unbound to proteins. The one that actually works in the body.", h: "Rarely problematic.", l: "Same symptoms as low total T, even if total appears normal.", a: "Reduce SHBG: zinc, magnesium. Lower body fat." } },
    tsh: { ro: { w: "Controlorul tiroidei. Arata cat de tare trebuie sa lucreze tiroida.", h: "Hipotiroidism: oboseala, ingrasare, frig, piele uscata, depresie, metabolism lent.", l: "Hipertiroidism: anxietate, pierdere greutate, tremor, palpitati.", a: "Seleniu. Iod. Zinc. Consult endocrinolog daca e in afara rangului." }, en: { w: "Thyroid controller. Shows how hard the thyroid needs to work.", h: "Hypothyroidism: fatigue, weight gain, cold, dry skin, depression, slow metabolism.", l: "Hyperthyroidism: anxiety, weight loss, tremor, palpitations.", a: "Selenium. Iodine. Zinc. See endocrinologist if out of range." } },
    vitd: { ro: { w: "Nu e doar vitamina - e un HORMON. Controleaza peste 200 de gene. Majoritatea sunt deficitari.", h: "Toxicitate rara (peste 150). Calcificare.", l: "Imunitate slaba. Risc cancer crescut. Depresie. Osteoporoza. Inflamatie cronica.", a: "Suplimenteaza D3 5000-10000 IU/zi + K2. Expunere solara. Testeaza la 6 luni." }, en: { w: "Not just a vitamin - it's a HORMONE. Controls 200+ genes. Most people are deficient.", h: "Rare toxicity (above 150). Calcification.", l: "Weak immunity. Increased cancer risk. Depression. Osteoporosis. Chronic inflammation.", a: "Supplement D3 5000-10000 IU/day + K2. Sun exposure. Test every 6 months." } },
    vitb12: { ro: { w: "Esentiala pentru nervi, creier, ADN, si producerea de sange. CRITICA daca iei Metformina.", h: "Rar problematic.", l: "Neuropatie (amorteala, furnicaturi), anemie, oboseala, probleme cognitive, depresie.", a: "Metilcobalamina sublinguala 1000-5000mcg/zi. OBLIGATORIU cu Metformina." }, en: { w: "Essential for nerves, brain, DNA, and blood production. CRITICAL if taking Metformin.", h: "Rarely problematic.", l: "Neuropathy (numbness, tingling), anemia, fatigue, cognitive issues, depression.", a: "Sublingual methylcobalamin 1000-5000mcg/day. MANDATORY with Metformin." } },
    ferritin: { ro: { w: "Depozitul de fier din corp. Prea mult sau prea putin - ambele sunt rele.", h: "Stres oxidativ. Inflamatie. Risc organ damage. Hemochromatoza.", l: "Anemie: oboseala extrema, paloare, caderea parului, unghii fragile.", a: "Daca e prea mare: doneaza sange. Daca e prea mic: fier bisglicinat + vitamina C." }, en: { w: "Iron storage in the body. Too much or too little - both are bad.", h: "Oxidative stress. Inflammation. Organ damage risk. Hemochromatosis.", l: "Anemia: extreme fatigue, pallor, hair loss, brittle nails.", a: "If too high: donate blood. If too low: iron bisglycinate + vitamin C." } },
    egfr: { ro: { w: "Cat de bine filtreaza rinichii sangele. Scade cu varsta - monitorizare ESENTIALA cu suplimente.", h: "Bine - rinichi sanatosi.", l: "Boala renala. Sub 60 = boala cronica. Sub 30 = severa. Necesita nefrolog.", a: "Hidratare 2-3L/zi. Reduce sarea. Evita excesul de proteine daca e scazut." }, en: { w: "How well kidneys filter blood. Decreases with age - ESSENTIAL monitoring with supplements.", h: "Good - healthy kidneys.", l: "Kidney disease. Below 60 = chronic disease. Below 30 = severe. Needs nephrologist.", a: "Hydration 2-3L/day. Reduce salt. Avoid excess protein if low." } },
    alt: { ro: { w: "Enzima din ficat. Cel mai sensibil marker de leziune hepatica.", h: "Leziune hepatica: steatoza (ficat gras), hepatita, alcool, medicamente, suplimente.", l: "Normal - ficat sanatos.", a: "Elimina alcoolul. Reduce zahar/procesate. Verifica medicamente hepatotoxice." }, en: { w: "Liver enzyme. Most sensitive marker of liver damage.", h: "Liver damage: fatty liver, hepatitis, alcohol, medications, supplements.", l: "Normal - healthy liver.", a: "Eliminate alcohol. Reduce sugar/processed food. Check hepatotoxic meds." } },
    psa: { ro: { w: "Marker pentru prostata. Screening cancer prostata - OBLIGATORIU dupa 40 ani.", h: "Posibil cancer de prostata, hiperplazie benigna, sau infectie. Necesita investigatii suplimentare.", l: "Normal.", a: "Consult urolog daca e peste 4. RMN prostata multiparametric." }, en: { w: "Prostate marker. Prostate cancer screening - MANDATORY after 40.", h: "Possible prostate cancer, benign hyperplasia, or infection. Needs further investigation.", l: "Normal.", a: "See urologist if above 4. Multiparametric prostate MRI." } },
    wbc: { ro: { w: "Celulele albe - armata imunitara a corpului.", h: "Infectie, inflamatie, stres, sau (rar) leucemie.", l: "Imunitate slaba. Risc crescut de infectii. Posibil efect medicamentos.", a: "Daca persistent anormal, consult hematolog." }, en: { w: "White cells - the body's immune army.", h: "Infection, inflammation, stress, or (rarely) leukemia.", l: "Weak immunity. Increased infection risk. Possible drug effect.", a: "If persistently abnormal, see hematologist." } },
    hgb: { ro: { w: "Proteina care transporta oxigenul in sange. Esentiala pentru energie.", h: "Policitemie. Deshidratare. Risc de cheaguri.", l: "Anemie: oboseala severa, paloare, dispnee, tahicardie.", a: "Daca e scazut: fier, B12, folat. Daca e crescut: hidratare, consult." }, en: { w: "Protein that carries oxygen in blood. Essential for energy.", h: "Polycythemia. Dehydration. Clot risk.", l: "Anemia: severe fatigue, pallor, shortness of breath, tachycardia.", a: "If low: iron, B12, folate. If high: hydration, consult doctor." } },
  };

  const getInfoForBM = (bm) => {
    const detail = BM_INFO[bm.key];
    if (detail) return detail[lang];
    return {
      w: bm.imp[lang],
      h: lang === "ro" ? "Valoare in afara rangului optim. Consulta un medic." : "Value outside optimal range. Consult a doctor.",
      l: lang === "ro" ? "Valoare sub rangul optim." : "Value below optimal range.",
      a: lang === "ro" ? "Discuta cu medicul tau. Verifica la urmatoarea analiza." : "Discuss with your doctor. Recheck at next test."
    };
  };

  const renderInfoPopup = () => {
    if (!infoPopup) return null;
    const bm = BIOMARKERS.find(b => b.key === infoPopup);
    if (!bm) return null;
    const info = getInfoForBM(bm);
    const lv = getLabValue(bm.key);
    const z = lv ? getZone(bm, lv.v) : null;
    const cc = CC[bm.cat] || CC.Metabolic;
    return (
      <div onClick={() => setInfoPopup(null)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div onClick={e => e.stopPropagation()} style={{ background: "#0f172a", borderRadius: 16, padding: 24, maxWidth: 480, width: "100%", border: `1px solid ${cc.border}44`, maxHeight: "80vh", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <h3 style={{ color: "#e2e8f0", margin: 0, fontSize: 18 }}>{bm.name[lang]}</h3>
              <div style={{ color: cc.text, fontSize: 12, marginTop: 4 }}>{lang === "ro" ? bm.cat : CAT_EN[bm.cat]} • {bm.target} {bm.unit}</div>
            </div>
            <button onClick={() => setInfoPopup(null)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20 }}>✕</button>
          </div>
          {lv && (
            <div style={{ background: `${z ? zoneColor[z] : "#475569"}15`, borderRadius: 10, padding: 12, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8", fontSize: 12 }}>{lang === "ro" ? "Ultima valoare" : "Last value"}</span>
              <div><span style={{ color: z ? zoneColor[z] : "#475569", fontSize: 22, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{lv.v}</span><span style={{ color: "#64748b", fontSize: 12, marginLeft: 6 }}>{bm.unit}</span>
              {z && <span style={{ background: `${zoneColor[z]}22`, color: zoneColor[z], padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 600, marginLeft: 8 }}>{t.zones[z]}</span>}</div>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#1e293b", borderRadius: 10, padding: 12 }}>
              <div style={{ color: "#60a5fa", fontSize: 10, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{lang === "ro" ? "CE MASOARA" : "WHAT IT MEASURES"}</div>
              <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 }}>{info.w}</div>
            </div>
            <div style={{ background: "rgba(239,68,68,0.08)", borderRadius: 10, padding: 12, borderLeft: "3px solid #ef4444" }}>
              <div style={{ color: "#f87171", fontSize: 10, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{lang === "ro" ? "RISC CAND E PREA MARE" : "RISK WHEN TOO HIGH"}</div>
              <div style={{ color: "#fca5a5", fontSize: 13, lineHeight: 1.5 }}>{info.h}</div>
            </div>
            <div style={{ background: "rgba(234,179,8,0.08)", borderRadius: 10, padding: 12, borderLeft: "3px solid #eab308" }}>
              <div style={{ color: "#fbbf24", fontSize: 10, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{lang === "ro" ? "RISC CAND E PREA MIC" : "RISK WHEN TOO LOW"}</div>
              <div style={{ color: "#fde68a", fontSize: 13, lineHeight: 1.5 }}>{info.l}</div>
            </div>
            <div style={{ background: "rgba(34,197,94,0.08)", borderRadius: 10, padding: 12, borderLeft: "3px solid #22c55e" }}>
              <div style={{ color: "#4ade80", fontSize: 10, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{lang === "ro" ? "CE SA FACI" : "WHAT TO DO"}</div>
              <div style={{ color: "#bbf7d0", fontSize: 13, lineHeight: 1.5 }}>{info.a}</div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <div style={{ flex: 1, background: "#22c55e15", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                <div style={{ color: "#475569", fontSize: 9 }}>OPTIM</div>
                <div style={{ color: "#4ade80", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{bm.optimal[0]}-{bm.optimal[1]}</div>
              </div>
              <div style={{ flex: 1, background: "#f59e0b15", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                <div style={{ color: "#475569", fontSize: 9 }}>{lang === "ro" ? "ATENTIE" : "WARNING"}</div>
                <div style={{ color: "#fbbf24", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{bm.warning[0]}-{bm.warning[1]}</div>
              </div>
              <div style={{ flex: 1, background: "#ef444415", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                <div style={{ color: "#475569", fontSize: 9 }}>CRITIC</div>
                <div style={{ color: "#f87171", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{bm.bad[0]}-{bm.bad[1]}</div>
              </div>
            </div>
          </div>
          <button onClick={() => { setInfoPopup(null); setTab("chat"); setChatInput(lang === "ro" ? `Explica-mi detaliat ce inseamna ${bm.name[lang]} si cum pot sa-l optimizez.` : `Explain in detail what ${bm.name[lang]} means and how I can optimize it.`); }}
            style={{ ...sty.btnPrimary, width: "100%", marginTop: 14, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", textAlign: "center" }}>
            {lang === "ro" ? "Intreaba AI Coach pentru mai multe detalii" : "Ask AI Coach for more details"}
          </button>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a0a28 50%, #0a1628 100%)", borderRadius: 16, padding: 24, border: "1px solid rgba(139,92,246,0.2)", position: "relative", overflow: "hidden" }}>
        <h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 20, fontFamily: "'Playfair Display', serif" }}>{t.title}</h2>
        <p style={{ color: "#94a3b8", margin: "6px 0 0", fontSize: 12 }}>{t.subtitle} • v4.0</p>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${latestW ? 4 : 3}, 1fr)`, gap: 14, marginTop: 18 }}>
          {[{ l: t.dash.chronoAge, v: "43", s: t.dash.born }, { l: t.dash.bioTarget, v: "35", s: t.dash.reduction }, { l: lang === "ro" ? "Scor Longevitate" : "Longevity Score", v: getLongevityScore(), s: lang === "ro" ? "din 100" : "out of 100" },
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
                      <div style={{ color: "#94a3b8", fontSize: 9, marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}>{bm.name[lang]} <span style={{ color: "#475569" }}>({bm.target} {bm.unit})</span> <button onClick={(e) => { e.stopPropagation(); setInfoPopup(bm.key); }} style={sty.infoBtn}>i</button></div>
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
                        <span style={{ color: "#94a3b8", fontSize: 9, display: "flex", alignItems: "center", gap: 3 }}>{bm.name[lang]} <button onClick={() => setInfoPopup(bm.key)} style={{ ...sty.infoBtn, width: 14, height: 14, fontSize: 8 }}>i</button></span>
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
              <div key={i} style={{ background: CC[cat].bg, borderRadius: 8, padding: "8px 12px", marginBottom: 3, border: `1px solid ${CC[cat].border}22`, display: "grid", gridTemplateColumns: "auto 1.3fr 0.8fr 0.5fr 0.5fr 1.5fr", gap: 6, alignItems: "center" }}>
                <button onClick={() => setInfoPopup(b.key)} style={sty.infoBtn}>i</button>
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

  const renderTracker = () => {
    const streak = getStreak();
    const longevityScore = getLongevityScore();
    const weightTrend = getWeightTrend();
    const checkCount = todayTracker.checklist ? Object.values(todayTracker.checklist).filter(Boolean).length : 0;
    const checkPct = Math.round(checkCount / CHECKLIST_ITEMS.length * 100);
    const nextScreening = SCREENINGS.filter(s => s.due === "2026").length;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Longevity Score + Streak + Next Screening */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div style={{ ...sty.card, textAlign: "center", border: "1px solid rgba(139,92,246,0.2)", background: "linear-gradient(135deg, #0a1628, #1a0a28)" }}>
            <div style={{ color: "#64748b", fontSize: 9, textTransform: "uppercase", letterSpacing: 1 }}>{lang === "ro" ? "Scor Longevitate" : "Longevity Score"}</div>
            <div style={{ color: longevityScore >= 70 ? "#4ade80" : longevityScore >= 50 ? "#fbbf24" : "#f87171", fontSize: 36, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", margin: "4px 0" }}>{longevityScore}</div>
            <div style={{ color: "#475569", fontSize: 10 }}>{lang === "ro" ? "din 100" : "out of 100"}</div>
            <div style={{ background: "#1e293b", borderRadius: 6, height: 6, marginTop: 8, overflow: "hidden" }}>
              <div style={{ background: longevityScore >= 70 ? "#22c55e" : longevityScore >= 50 ? "#eab308" : "#ef4444", height: "100%", width: `${longevityScore}%`, borderRadius: 6, transition: "width 0.5s" }} />
            </div>
          </div>
          <div style={{ ...sty.card, textAlign: "center", border: "1px solid rgba(249,115,22,0.2)" }}>
            <div style={{ color: "#64748b", fontSize: 9, textTransform: "uppercase", letterSpacing: 1 }}>Streak</div>
            <div style={{ color: "#fb923c", fontSize: 36, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", margin: "4px 0" }}>{streak}</div>
            <div style={{ color: "#475569", fontSize: 10 }}>{lang === "ro" ? "zile consecutive" : "consecutive days"}</div>
            <div style={{ color: "#f97316", fontSize: 18, marginTop: 4 }}>{streak >= 30 ? "🏆" : streak >= 7 ? "🔥" : streak >= 3 ? "⚡" : "💪"}</div>
          </div>
          <div style={{ ...sty.card, textAlign: "center", border: "1px solid rgba(239,68,68,0.2)" }}>
            <div style={{ color: "#64748b", fontSize: 9, textTransform: "uppercase", letterSpacing: 1 }}>{lang === "ro" ? "Screening-uri Due" : "Screenings Due"}</div>
            <div style={{ color: nextScreening > 0 ? "#f87171" : "#4ade80", fontSize: 36, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", margin: "4px 0" }}>{nextScreening}</div>
            <div style={{ color: "#475569", fontSize: 10 }}>{lang === "ro" ? "programeaza ASAP" : "schedule ASAP"}</div>
          </div>
        </div>

        {/* Weight Tracker */}
        <div style={{ ...sty.card, border: "1px solid rgba(6,182,212,0.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ color: "#22d3ee", margin: 0, fontSize: 14 }}>⚖️ {lang === "ro" ? "Greutate" : "Weight"}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="number" step="0.1" value={todayTracker.weight} placeholder="kg"
                onChange={e => updateTracker("weight", e.target.value)}
                style={{ ...sty.input, width: 80, textAlign: "center", fontSize: 16, fontWeight: 700 }} />
              <span style={{ color: "#475569", fontSize: 12 }}>kg</span>
              <span style={{ color: "#64748b", fontSize: 10 }}>{lang === "ro" ? "Target: 84 kg" : "Target: 84 kg"}</span>
            </div>
          </div>
          {weightTrend.length > 1 && (
            <div>
              <MiniChart data={weightTrend} color="#22d3ee" h={60} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ color: "#334155", fontSize: 9 }}>{weightTrend[0]?.date}</span>
                <span style={{ color: "#22d3ee", fontSize: 10, fontWeight: 600 }}>{weightTrend[weightTrend.length - 1]?.v} kg</span>
                <span style={{ color: "#334155", fontSize: 9 }}>{weightTrend[weightTrend.length - 1]?.date}</span>
              </div>
            </div>
          )}
        </div>

        {/* Water + Mood + Energy */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div style={{ ...sty.card, border: "1px solid rgba(59,130,246,0.15)" }}>
            <h3 style={{ color: "#60a5fa", margin: "0 0 10px", fontSize: 13 }}>💧 {lang === "ro" ? "Apa (pahare)" : "Water (glasses)"}</h3>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <button onClick={() => updateTracker("water", Math.max(0, todayTracker.water - 1))} style={{ ...sty.btn("#ef4444"), padding: "4px 12px", fontSize: 16 }}>-</button>
              <span style={{ color: todayTracker.water >= 8 ? "#4ade80" : "#60a5fa", fontSize: 28, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{todayTracker.water}</span>
              <button onClick={() => updateTracker("water", todayTracker.water + 1)} style={{ ...sty.btn("#22c55e"), padding: "4px 12px", fontSize: 16 }}>+</button>
            </div>
            <div style={{ color: "#475569", fontSize: 10, textAlign: "center", marginTop: 4 }}>{lang === "ro" ? "Target: 8-10" : "Target: 8-10"} {todayTracker.water >= 8 ? "✅" : ""}</div>
          </div>
          <div style={{ ...sty.card, border: "1px solid rgba(234,179,8,0.15)" }}>
            <h3 style={{ color: "#fbbf24", margin: "0 0 10px", fontSize: 13 }}>😊 Mood</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => updateTracker("mood", n)} style={{ background: todayTracker.mood === n ? "#fbbf2433" : "transparent", border: todayTracker.mood === n ? "2px solid #fbbf24" : "1px solid #334155", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16 }}>
                  {["😫","😕","😐","🙂","😄"][n-1]}
                </button>
              ))}
            </div>
          </div>
          <div style={{ ...sty.card, border: "1px solid rgba(34,197,94,0.15)" }}>
            <h3 style={{ color: "#4ade80", margin: "0 0 10px", fontSize: 13 }}>⚡ {lang === "ro" ? "Energie" : "Energy"}</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => updateTracker("energy", n)} style={{ background: todayTracker.energy === n ? "#4ade8033" : "transparent", border: todayTracker.energy === n ? "2px solid #4ade80" : "1px solid #334155", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 14, color: todayTracker.energy >= n ? "#4ade80" : "#334155" }}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fasting Timer */}
        <div style={{ ...sty.card, border: "1px solid rgba(168,85,247,0.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ color: "#c4b5fd", margin: 0, fontSize: 14 }}>⏱️ {lang === "ro" ? "Post Intermitent" : "Intermittent Fasting"}</h3>
            <div style={{ display: "flex", gap: 8 }}>
              {!todayTracker.fastStart ? (
                <button onClick={() => updateTracker("fastStart", Date.now())} style={sty.btn("#8b5cf6")}>{lang === "ro" ? "Incepe Postul" : "Start Fast"}</button>
              ) : (
                <>
                  <span style={{ color: "#c4b5fd", fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                    {(() => { const h = Math.floor((Date.now() - todayTracker.fastStart) / 3600000); const m = Math.floor(((Date.now() - todayTracker.fastStart) % 3600000) / 60000); return `${h}h ${m}m`; })()}
                  </span>
                  <button onClick={() => updateTracker("fastStart", null)} style={sty.btn("#ef4444")}>{lang === "ro" ? "Stop" : "Stop"}</button>
                </>
              )}
            </div>
          </div>
          {todayTracker.fastStart && (
            <div style={{ marginTop: 10 }}>
              <div style={{ background: "#1e293b", borderRadius: 6, height: 8, overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(90deg, #8b5cf6, #6366f1)", height: "100%", width: `${Math.min(100, ((Date.now() - todayTracker.fastStart) / 3600000) / 16 * 100)}%`, borderRadius: 6, transition: "width 1s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ color: "#475569", fontSize: 9 }}>0h</span>
                <span style={{ color: "#8b5cf6", fontSize: 9 }}>16h {lang === "ro" ? "(target)" : "(target)"}</span>
                <span style={{ color: "#475569", fontSize: 9 }}>24h</span>
              </div>
            </div>
          )}
        </div>

        {/* Daily Checklist */}
        <div style={{ ...sty.card, border: "1px solid rgba(34,197,94,0.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ color: "#86efac", margin: 0, fontSize: 14 }}>✅ {lang === "ro" ? "Checklist Zilnic" : "Daily Checklist"} ({checkCount}/{CHECKLIST_ITEMS.length})</h3>
            <span style={{ color: checkPct === 100 ? "#4ade80" : "#fbbf24", fontSize: 14, fontWeight: 700 }}>{checkPct}%</span>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 6, height: 6, marginBottom: 12, overflow: "hidden" }}>
            <div style={{ background: checkPct === 100 ? "#22c55e" : "linear-gradient(90deg, #22c55e, #16a34a)", height: "100%", width: `${checkPct}%`, borderRadius: 6, transition: "width 0.3s" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {CHECKLIST_ITEMS.map(item => {
              const checked = todayTracker.checklist?.[item.key];
              return (
                <button key={item.key} onClick={() => toggleCheck(item.key)} style={{
                  background: checked ? "rgba(34,197,94,0.1)" : "#1e293b", border: checked ? "1px solid #22c55e44" : "1px solid #33415544",
                  borderRadius: 10, padding: "10px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s"
                }}>
                  <span style={{ width: 20, height: 20, borderRadius: 6, border: checked ? "2px solid #22c55e" : "2px solid #475569", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#22c55e", flexShrink: 0 }}>
                    {checked ? "✓" : ""}
                  </span>
                  <span style={{ fontSize: 12 }}>{item.icon}</span>
                  <span style={{ color: checked ? "#4ade80" : "#94a3b8", fontSize: 12, textDecoration: checked ? "line-through" : "none" }}>{item.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* History mini */}
        {Object.keys(trackerData).length > 1 && (
          <div style={{ ...sty.card }}>
            <h3 style={{ color: "#e2e8f0", margin: "0 0 10px", fontSize: 13 }}>📅 {lang === "ro" ? "Ultimele 7 zile" : "Last 7 days"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
              {Array.from({ length: 7 }, (_, i) => {
                const d = new Date(); d.setDate(d.getDate() - (6 - i));
                const ds = d.toISOString().split("T")[0];
                const day = trackerData[ds];
                const checks = day?.checklist ? Object.values(day.checklist).filter(Boolean).length : 0;
                const pct = Math.round(checks / CHECKLIST_ITEMS.length * 100);
                return (
                  <div key={ds} style={{ textAlign: "center", padding: 6, background: ds === today ? "#1e293b" : "transparent", borderRadius: 8, border: ds === today ? "1px solid #33415588" : "none" }}>
                    <div style={{ color: "#475569", fontSize: 9 }}>{["Du","Lu","Ma","Mi","Jo","Vi","Sa"][d.getDay()]}</div>
                    <div style={{ color: pct >= 80 ? "#4ade80" : pct > 0 ? "#fbbf24" : "#334155", fontSize: 16, margin: "2px 0" }}>{pct >= 80 ? "🟢" : pct > 0 ? "🟡" : "⚫"}</div>
                    <div style={{ color: "#475569", fontSize: 9 }}>{day?.weight ? `${day.weight}kg` : ""}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderChat = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "70vh" }}>
      <div style={{ ...sty.card, background: "linear-gradient(135deg, #0a1628, #0a2818, #0a1628)", border: "1px solid rgba(34,197,94,0.2)", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 18 }}>🤖 {t.chat.title}</h2>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 11 }}>{t.chat.subtitle}</p>
        </div>
        {chatMsgs.length > 0 && <button onClick={clearChat} style={sty.btn("#ef4444")}>{lang === "ro" ? "Sterge Chat" : "Clear Chat"}</button>}
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

  const CONTENT = { dashboard: renderDashboard, tracker: renderTracker, whoop: renderWhoop, labs: renderLabs, biomarkers: renderBiomarkers, protocols: renderProtocols, supplements: renderSupplements, exercise: renderExercise, nutrition: renderNutrition, sleep: renderSleep, screening: renderScreening, chat: renderChat };

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
            const icons = { dashboard: "◉", tracker: "📊", whoop: "⌚", labs: "🧪", biomarkers: "🧬", protocols: "⚗️", supplements: "💊", exercise: "🏋️", nutrition: "🥗", sleep: "🌙", screening: "🔬", chat: "🤖" };
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
      {renderInfoPopup()}
      {/* FOOTER */}
      <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(30,41,59,0.3)", textAlign: "center" }}>
        <p style={{ color: "#334155", fontSize: 8, margin: 0 }}>{t.disclaimer}</p>
      </div>
    </div>
  );
}
