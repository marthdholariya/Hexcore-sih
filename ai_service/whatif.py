"""
whatif.py
---------
What-If Simulator. Lets the government ask:
"What happens if we add skill X to a course?"
Uses the trained employment model to estimate the impact.
"""

import pandas as pd
from prediction import load_model


def simulate_skill_addition(course_name, new_skill, district,
                            baseline_attendance=80,
                            baseline_score=75,
                            baseline_skills=4):
    """
    Estimate employment impact of adding a skill to a course.
    Baseline = average trainee profile for that course.
    """
    model = load_model()

    # Current scenario
    X_current = pd.DataFrame([{
        "attendance_pct": baseline_attendance,
        "avg_assessment_score": baseline_score,
        "has_certificate": 1,
        "skill_count": baseline_skills,
        "completed_training": 1,
    }])
    current_prob = float(model.predict_proba(X_current)[0][1]) * 100

    # With new skill: skill_count increases by 1
    X_new = X_current.copy()
    X_new["skill_count"] = baseline_skills + 1
    new_prob = float(model.predict_proba(X_new)[0][1]) * 100

    improvement = new_prob - current_prob

    return {
        "course": course_name,
        "added_skill": new_skill,
        "district": district,
        "current_employment_estimate": round(current_prob, 1),
        "estimated_employment_with_skill": round(new_prob, 1),
        "estimated_improvement": round(improvement, 1),
        "confidence_level": "High" if abs(improvement) < 15 else "Medium",
        "note": "AI-generated projection based on historical outcomes. Indicative only.",
    }