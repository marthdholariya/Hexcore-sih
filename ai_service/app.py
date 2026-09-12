"""
app.py
------
Flask API server for the SkillTrack AI/ML module.
Exposes 5 endpoints:
    GET  /api/health
    POST /api/ai/job-match
    POST /api/ai/skill-gap
    POST /api/ai/employment-prediction
    POST /api/ai/attrition-prediction
    POST /api/ai/what-if
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

from job_matching import match_trainee_to_job, detect_skill_gap
from prediction import (
    predict_employment,
    predict_attrition,
    train_employment_model,
)
from whatif import simulate_skill_addition

app = Flask(__name__)
CORS(app)  # allow frontend to call from any origin

# Train the model once at startup
print("[app] Starting AI service — training employment model...")
train_employment_model()
print("[app] Model ready. Service is live on port 5001.")


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "OK", "service": "SkillTrack AI/ML"})


@app.route("/api/ai/job-match", methods=["POST"])
def job_match():
    data = request.json or {}
    return jsonify(match_trainee_to_job(
        trainee_skills=data.get("trainee_skills", []),
        job_skills=data.get("job_skills", []),
    ))


@app.route("/api/ai/skill-gap", methods=["POST"])
def skill_gap():
    data = request.json or {}
    return jsonify({
        "missing_skills": detect_skill_gap(
            trainee_skills=data.get("trainee_skills", []),
            target_job_skills=data.get("target_job_skills", []),
            market_demand=data.get("market_demand", {}),
        )
    })


@app.route("/api/ai/employment-prediction", methods=["POST"])
def employment_prediction():
    d = request.json or {}
    return jsonify(predict_employment(
        attendance_pct=d.get("attendance_pct", 0),
        avg_assessment_score=d.get("avg_assessment_score", 0),
        has_certificate=d.get("has_certificate", 0),
        skill_count=d.get("skill_count", 0),
        completed_training=d.get("completed_training", 0),
    ))


@app.route("/api/ai/attrition-prediction", methods=["POST"])
def attrition_prediction():
    d = request.json or {}
    return jsonify(predict_attrition(
        salary_growth_pct=d.get("salary_growth_pct", 0),
        job_duration_months=d.get("job_duration_months", 0),
        job_changes=d.get("job_changes", 0),
        training_related=d.get("training_related", True),
    ))


@app.route("/api/ai/what-if", methods=["POST"])
def what_if():
    d = request.json or {}
    return jsonify(simulate_skill_addition(
        course_name=d.get("course_name", ""),
        new_skill=d.get("new_skill", ""),
        district=d.get("district", ""),
    ))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)