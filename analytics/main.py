from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from metrics_engine import calculate_phase1_kpis, get_funnel_analytics, get_district_analytics
from analytics.kpi_engine import (
    calculate_employment_rate,
    calculate_retention_rate,
    calculate_salary_hike,
    calculate_attrition_rate
)

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
    return {
        "status": "success",
        "data": {
            "employment_rate": calculate_employment_rate(75, 100),
            "retention_rate_6m": calculate_retention_rate(60, 75),
            "avg_salary_hike_pct": calculate_salary_hike(10000, 14000),
            "attrition_rate": calculate_attrition_rate(5, 100)
        }
    }
@app.get("/api/analytics/funnel")
def get_funnel():
    return get_funnel_analytics()

@app.get("/api/analytics/districts")
def get_districts():
    return get_district_analytics()