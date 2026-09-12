"""
prediction.py
-------------
Trains and serves the employment prediction model.

Algorithm: Random Forest Classifier (scikit-learn).
Input features: attendance %, assessment %, certificate flag, skill count, completion flag.
Output: probability of employment (0-100) + risk level + feature importances.
"""

import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score

MODEL_PATH = "employment_model.pkl"

FEATURES = [
    "attendance_pct",
    "avg_assessment_score",
    "has_certificate",
    "skill_count",
    "completed_training",
]


def train_employment_model(df=None, verbose=True):
    """Train the Random Forest on historical trainee data."""
    if df is None:
        from data_loader import load_training_data
        df = load_training_data()

    X = df[FEATURES].fillna(0)
    y = df["employed"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    metrics = {
        "accuracy": round(accuracy_score(y_test, preds), 3),
        "precision": round(precision_score(y_test, preds, zero_division=0), 3),
        "recall": round(recall_score(y_test, preds, zero_division=0), 3),
    }

    joblib.dump(model, MODEL_PATH)

    if verbose:
        print(f"[prediction] Model trained. Metrics: {metrics}")

    return model, metrics


def load_model():
    """Load saved model or train a new one if missing."""
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    model, _ = train_employment_model()
    return model


def predict_employment(attendance_pct, avg_assessment_score, has_certificate,
                       skill_count, completed_training):
    """
    Predict probability of employment for a single trainee.
    Returns probability, risk level, and feature importances (explainability).
    """
    model = load_model()

    X = pd.DataFrame([{
        "attendance_pct": attendance_pct,
        "avg_assessment_score": avg_assessment_score,
        "has_certificate": int(bool(has_certificate)),
        "skill_count": skill_count,
        "completed_training": int(bool(completed_training)),
    }])

    prob = float(model.predict_proba(X)[0][1])

    # Feature importance for explainability
    importances = dict(zip(FEATURES, model.feature_importances_.round(3).tolist()))
    top_factors = sorted(importances.items(), key=lambda x: -x[1])[:3]

    if prob > 0.75:
        risk = "Low"
    elif prob > 0.45:
        risk = "Medium"
    else:
        risk = "High"

    return {
        "employment_probability": round(prob * 100, 1),
        "risk_level": risk,
        "top_factors": [{"factor": k, "importance": v} for k, v in top_factors],
        "model": "RandomForestClassifier",
        "note": "AI-generated estimate based on historical patterns. Indicative only",
    }


def predict_attrition(salary_growth_pct, job_duration_months,
                      job_changes, training_related):
    """
    Rule-based attrition risk. (A trained attrition model can be added later
    once we have enough historical job-change data.)
    """
    risk_score = 0
    reasons = []

    if salary_growth_pct < 10:
        risk_score += 2
        reasons.append("Low salary growth")
    if job_duration_months < 6:
        risk_score += 2
        reasons.append("Short job duration")
    if job_changes > 2:
        risk_score += 1
        reasons.append("Frequent job changes")
    if not training_related:
        risk_score += 2
        reasons.append("Job not related to training")

    if risk_score >= 5:
        risk = "High"
    elif risk_score >= 3:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "attrition_risk": risk,
        "risk_score": risk_score,
        "reasons": reasons or ["No major risk factors detected"],
        "note": "AI-assisted risk assessment. Indicative only.",
    }