"""Flask AI service for the Skill‑Tracking System
Provides simple placeholder prediction endpoints that can be extended later.
All endpoints return dummy data suitable for integration testing.
"""

import os
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Directory where model files would live (optional)
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

# Attempt to load models; if missing, use None and return dummy values
def load_model(filename):
    path = os.path.join(MODEL_DIR, filename)
    try:
        return joblib.load(path)
    except Exception:
        return None

placement_model = load_model('placement_model.pkl')
skill_gap_model = load_model('skill_gap_model.pkl')
program_effect_model = load_model('program_effect_model.pkl')

def dummy_response(key, value):
    return {"status": "ok", key: value}

@app.route('/api/analytics/placement', methods=['GET'])
def placement():
    trainee_id = request.args.get('trainee_id')
    # In a real implementation, use placement_model to predict.
    return jsonify(dummy_response('placement_probability', 0.73))

@app.route('/api/analytics/skill-gap', methods=['GET'])
def skill_gap():
    trainee_id = request.args.get('trainee_id')
    recommendations = [
        {"course_id": "crs-001", "course_name": "Advanced JavaScript"},
        {"course_id": "crs-002", "course_name": "Data Analytics Basics"}
    ]
    return jsonify({"trainee_id": trainee_id, "recommendations": recommendations})

@app.route('/api/analytics/program-effectiveness', methods=['GET'])
def program_effectiveness():
    provider_id = request.args.get('provider_id')
    metrics = {"average_placement_rate": 0.82, "average_salary": 35000}
    return jsonify({"provider_id": provider_id, "metrics": metrics})

if __name__ == '__main__':
    # Run on all interfaces so the Node backend can reach it.
    app.run(host='0.0.0.0', port=5001, debug=True)