from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from metrics_engine import calculate_phase1_kpis, get_funnel_analytics, get_district_analytics

app = FastAPI(title="Maharashtra Skilling Analytics Engine")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "SIH Analytics Engine Online"}

@app.get("/api/analytics/kpis")
def get_kpis():
    return calculate_phase1_kpis()

@app.get("/api/analytics/funnel")
def get_funnel():
    return get_funnel_analytics()

@app.get("/api/analytics/districts")
def get_districts():
    return get_district_analytics()