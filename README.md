<div align="center">

<img src="https://img.shields.io/badge/Smart%20India%20Hackathon-2026-orange?style=for-the-badge&logo=india&logoColor=white" /> 
<img src="https://img.shields.io/badge/Problem%20Statement-SIH%2026135-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Ministry-MSSDS%20%E2%80%A2%20-green?style=for-the-badge" />

# 🎓 SkillTrack
### Employment Outcomes, Skill Gaps & Impact of Skilling Initiatives

**A longitudinal skilling outcome tracking system built for the Government of Maharashtra**

*Tracing every trainee from Training → Certification → Employment → Career Growth*

---

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql)
![Python](https://img.shields.io/badge/Python-FastAPI-3776AB?style=flat-square&logo=python)

</div>

---

## 🎯 The Problem We Solve

Maharashtra invests crores in skilling programmes — but **does it actually work?**

Today there is **no system** to track:
- ❌ Whether trainees get employed after training
- ❌ How long they stay in jobs
- ❌ Whether the skills taught match market demand
- ❌ Which training centres actually deliver outcomes

**SkillTrack fixes this.** It creates a complete longitudinal record for every trainee — from the day they enrol in training to their career milestones years later.

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🧠 AI-Powered Intelligence
- **AI Job Matching** — matches trainee skills to live job openings
- **Skill Gap Detection** — identifies missing skills before job applications
- **Employment Prediction** — predicts placement probability per trainee
- **What-If Simulator** — models impact of training improvements
- **Smart Recommendations** — personalized next steps for every user

</td>
<td width="50%">

### 📊 Government Analytics
- **Real-time KPI Dashboard** — placement rates, salary trends, retention
- **District & State Insights** — geographic breakdown of outcomes
- **Training Effectiveness Score** — ranks training providers by outcomes
- **Job Market Intelligence** — live demand data by sector & location
- **Data Quality Monitoring** — flags gaps, duplicates, pending verifications

</td>
</tr>
<tr>
<td width="50%">

### 💼 Employment Lifecycle
- **Employer Verification** — employers confirm employment details directly
- **Employment Evidence Upload** — offer letters, certificates as proof
- **Salary History Tracking** — monitors income growth over time
- **Attrition Analysis** — tracks why trainees leave jobs

</td>
<td width="50%">

### 📞 Automated Follow-ups
- **3-Month, 6-Month, 12-Month** milestone follow-up system
- Automated scheduling with response tracking
- Non-placement reason classification
- Re-engagement recommendations for unemployed trainees

</td>
</tr>
</table>

---

## 👥 User Portals

| Portal | Users | Key Capabilities |
|--------|-------|------------------|
| 🧑‍🎓 **Trainee** | Enrolled trainees | Skill passport, job matches, follow-ups, recommendations |
| 🏢 **Employer** | Hiring companies | Verify employment, post jobs, view market intelligence |
| 🏫 **Training Provider** | Skill centres | Enrollment tracking, effectiveness score, gap analytics |
| 🏛️ **Government Admin** | MSSDS officials | Full analytics, what-if simulator, national oversight |

---

## 🧩 System Architecture

```
┌───────────────────────────────────────────────────────────┐
│                  REACT FRONTEND                           │
│        Trainee │ Employer │ Provider │ Admin              │
└───────────────────────────┬───────────────────────────────┘
                            │ HTTPS / REST API
            ┌───────────────▼───────────────┐
            │    NODE.js / EXPRESS BACKEND  │
            │                               │
            │  Auth │ Controllers │ Routes  │
            └─────┬────────────────────┬────┘
                  │                    │ REST
       ┌──────────▼────────┐  ┌────────▼─────────┐
       │  8 Schemas        │  │  FastAPI Service │
       │  30+ Tables       │  │  ML Predictions  │
       └───────────────────┘  └──────────────────┘
```

---

## 🛠️ Tech Stack

|     Layer     |              Technology                 |              Purpose |
|---------------|-----------------------------------------|------------------------------------|
| **Frontend**  | React 19 + React Router v7 + Vite       | Multi-portal SPA                   |
| **Backend**   | Node.js + Express 5 + JWT + bcrypt      | REST API + Auth                    | 
| **Database**  | PostgreSQL via `pg` driver              | Primary data store                 |
| **AI/ML**     | Python + FastAPI                        | Job matching, predictions, what-if |
| **Analytics** | Python (KPI engine + feature pipelines) | Government metrics                 |

---

## 🗄️ Database Design

8 PostgreSQL schemas with **30+ tables** covering the complete skilling lifecycle:

```
┌─────────────────────┐  ┌─────────────────────┐
│  public             │  │  training           │
│  users, trainees,   │  │  courses,enrollments│
│  employers,         │  │  assessments,       │
│  training_providers │  │  attendance,certs   │
└─────────────────────┘  └─────────────────────┘
┌─────────────────────┐  ┌─────────────────────┐
│  employment         │  │  followup           │
│  employment records │  │  followups,responses│
│  salary_history     │  │  employment_status  │
│  evidence,verifs    │  │  attrition_reasons  │
└─────────────────────┘  └─────────────────────┘
┌─────────────────────┐  ┌─────────────────────┐
│  analytics          │  │  jobs               │
│  predictions        │  │  jobs, job_skills   │
│  recommendations    │  │  job_market_data    │
│  skill_gap_analysis │  │                     │
└─────────────────────┘  └─────────────────────┘
┌─────────────────────┐  ┌─────────────────────┐
│  education          │  │  planning           │
│  education records  │  │  training_effective-│
│  skills             │  │  ness, whatif_scen- │
│  trainee_skills     │  │  arios, dq_issues   │
└─────────────────────┘  └─────────────────────┘
```

🗂️ See [`Database/schema.sql`](Database/schema.sql) • [`Database/ER diagram.png`](Database/ER%20diagram.png) • [`Database/README.md`](Database/README.md)

---

## 📂 Project Structure

```
SIH26135-Skill-Tracking-System/
│
├── 🎭 frontend/
│   ├── src/
│   │   ├── Portals/
│   │   │   ├── Trainee/       # Trainee portal pages & components
│   │   │   ├── Employer/      # Employer portal pages & components
│   │   │   ├── Provider/      # Training provider portal
│   │   │   └── Admin/         # Government admin dashboard
│   │   ├── App.jsx           # Routing + portal switching
│   │   ├── AuthContext.jsx   # JWT auth context
│   │   └── Login.jsx         # Role-based login
│   └── package.json
│
├── ⚙️  backend/
│   ├── controllers/       # Business logic (auth, training, employment...)
│   ├── routes/            # Express route definitions
│   ├── models/            # Database query models
│   ├── middleware/        # Auth, roles, validation, error handling
│   ├── config/db.js       # PostgreSQL connection
│   ├── server.js          # App entry point
│   └── API_DOCUMENTATION.md
│
├── 🧠 ai_service/
│   ├── app.py             # FastAPI entry point
│   ├── job_matching.py    # AI job-to-trainee matching
│   ├── prediction.py      # Employment probability model
│   ├── whatif.py          # What-if scenario simulation
│   ├── data_loader.py     # DB data loading for models
│   └── requirements.txt
│
├── 📊 analytics/
│   ├── analytics/kpi_engine.py    # KPI calculations
│   ├── pipelines/feature_prep.py  # Feature engineering
│   ├── metrics_engine.py          # Metrics aggregation
│   ├── database.py                # Analytics DB connection
│   └── main.py                    # Analytics entry point
│
├── 🗄️  Database/
│   ├── schema.sql                 # Full PostgreSQL schema
│   ├── seed.sql                   # Demo/seed data
│   ├── analytics_views.sql        # Reporting views
│   ├── ER diagram.png             # Entity-relationship diagram
│   └── README.md
│
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites

```
✓ Node.js 18+
✓ Python 3.10+
✓ PostgreSQL 14+ (or cloud PostgreSQL)
✓ npm / pip
```

### Step 1 — Clone & Setup

```bash
git clone https://github.com/your-org/SIH26135-Skill-Tracking-System.git
cd SIH26135-Skill-Tracking-System
```

### Step 2 — Database

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE skilltrack_db;"

# Run schema
psql -U postgres -d skilltrack_db -f Database/schema.sql

# Load demo data
psql -U postgres -d skilltrack_db -f Database/seed.sql
```

### Step 3 — Backend

```bash
cd backend
npm install

# Create .env
cp .env.example .env
# Fill in your DATABASE_URL and JWT_SECRET

npm run dev     # Development (nodemon)
npm start       # Production
```

> Backend runs at **`http://localhost:5000`**

### Step 4 — AI Service

```bash
cd ai_service
pip install -r requirements.txt

# Create .env with DATABASE_URL
uvicorn app:app --reload --port 8000
```

> AI service runs at **`http://localhost:8000`**

### Step 5 — Frontend

```bash
cd frontend
npm install

# Create .env
echo "VITE_API_URL=http://localhost:5000" > .env
echo "VITE_AI_URL=http://localhost:8000" >> .env

npm run dev
```

> Frontend runs at **`http://localhost:5173`**

---

## 🔑 Demo Credentials

> ⚠️ For **presentation/development use only**. Change all passwords in production.

| Role | Portal | Email | Password |
|------|--------|-------|----------|
| 🧑‍🎓 Trainee | `/trainee` | `aarav.sharma@skilltrack.demo` | `trainee123` |
| 🏢 Employer | `/employer` | `neha.mehta@skilltrack.demo` | `employer123` |
| 🏫 Training Provider | `/provider` | `kavita.joshi@skilltrack.demo` | `provider123` |
| 🏛️ Government Admin | `/admin` | `analyst@skilltrack.demo` | `admin123` |

---

## 📝 API Reference

Full documentation: [`backend/API_DOCUMENTATION.md`](backend/API_DOCUMENTATION.md)


```
POST   /api/auth/login              →  JWT login
GET    /api/training/courses         →  List courses
GET    /api/employment/:id           →  Trainee employment record
GET    /api/analytics/dashboard      →  Government KPI dashboard
GET    /api/analytics/predictions    →  ML employment predictions
GET    /api/analytics/skill-gaps     →  Skill gap analysis
POST   /api/planning/whatif          →  What-if simulation
GET    /api/jobs/market-data         →  Job market intelligence
POST   /api/followup/schedule        →  Schedule a follow-up
```

---

## 👨‍💻 Team SIH 26135

| Member | Role | Responsibility |
|--------|------|----------------|
| **Shreya** | 🗄️ Database Architect | PostgreSQL schema design, 8-schema structure |
| **Marth** | ⚙️ Backend Developer | Node.js API, authentication, business logic |
| **Rinal** | 🎨 Frontend Developer | React portals, UI/UX, responsive design |
| **Bhargav** | 🧠 AI/ML Engineer | Job matching, employment prediction, what-if |
| **Paranjay** | 📊 Analytics Engineer | KPI engine, government dashboards, metrics |
| **Neel** | 🚀 Integration Lead | Service integration & team coordination |

---

## 📊 Impact & Scale

- 🏢 **3 employer types** tracked (IT, Renewable Energy, FinTech)
- 🏫 **2 training providers** with **6 course tracks**
- 🧑‍🎓 **6 trainee profiles** across 6 states of India
- 🧠 **AI predictions** with up to **95% confidence** (Low Risk trainees)
- 📍 **Coverage:** Maharashtra, Gujarat, Karnataka, Tamil Nadu, Kerala
- 💼 **Sectors:** IT, Data Science, Renewable Energy, Electrical, Marketing, Services

---

## 📄 License

Built for **Smart India Hackathon 2025** — Problem Statement **SIH 26135**.

Client: **MSSDS • MAHA-SKILL**, Government of Maharashtra.

---

<div align="center">

**Made with ❤️ by Team SIH 26135**

*Empowering skilling outcomes through data — one trainee at a time.*

</div>
