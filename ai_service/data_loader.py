"""
data_loader.py
--------------
Loads training data for the ML model.

Strategy:
1. If a cached CSV exists at data/training_data.csv, use it.
2. Otherwise, generate synthetic data that mirrors the statistical 
   distribution observed in the SkillTrack seed data:
      - Avg attendance ~88%
      - Avg assessment ~80%
      - Completion rate ~87.5%
      - Employment driven by attendance + assessment + certificate

In production, this would query PostgreSQL directly (see load_from_db()).
"""

import os
import numpy as np
import pandas as pd

CSV_PATH = "data/training_data.csv"


def load_training_data():
    """Main entry point. Returns a pandas DataFrame."""
    if os.path.exists(CSV_PATH):
        df = pd.read_csv(CSV_PATH)
        print(f"[data_loader] Loaded {len(df)} rows from {CSV_PATH}")
        return df
    else:
        print("[data_loader] No cached CSV. Generating synthetic data...")
        df = generate_synthetic_data(n=500)
        os.makedirs("data", exist_ok=True)
        df.to_csv(CSV_PATH, index=False)
        print(f"[data_loader] Saved {len(df)} rows to {CSV_PATH}")
        return df


def generate_synthetic_data(n=500):
    """
    Generate synthetic trainee data with the same statistical 
    characteristics as the SkillTrack seed data.
    """
    np.random.seed(42)

    # Attendance: normal distribution centered at 88%, clipped 40-100
    attendance = np.random.normal(88, 8, n).clip(40, 100).round(2)

    # Assessment: normal distribution centered at 80%, clipped 30-100
    assessment = np.random.normal(80, 10, n).clip(30, 100).round(2)

    # Certificate: 87.5% completion (7/8 in seed)
    has_certificate = np.random.binomial(1, 0.875, n)

    # Skill count: 2-6 skills per trainee
    skill_count = np.random.randint(2, 7, n)

    # Completed training flag: 87.5% in seed
    completed_training = np.random.binomial(1, 0.875, n)

    df = pd.DataFrame({
        "trainee_id": [f"T{i:04d}" for i in range(n)],
        "attendance_pct": attendance,
        "avg_assessment_score": assessment,
        "has_certificate": has_certificate,
        "skill_count": skill_count,
        "completed_training": completed_training,
    })

    # Employment probability: weighted combination + noise
    # Weights chosen so employment rate lands near the seed's 100%
    score = (
        (df["attendance_pct"] / 100) * 0.30
        + (df["avg_assessment_score"] / 100) * 0.30
        + df["has_certificate"] * 0.20
        + (df["skill_count"] / 7) * 0.25
        + df["completed_training"] * 0.10
    )
    noise = np.random.normal(0, 0.08, n)
    df["employed"] = ((score + noise) > 0.82).astype(int)

    return df


def load_from_db(connection_string):
    """
    Optional: load real training data from PostgreSQL.
    Only used when the database has enough historical records.
    Currently unused — synthetic data is used for the demo.
    """
    import psycopg2

    query = """
        SELECT
            t.trainee_id,
            COALESCE(AVG(
                CASE WHEN a.is_present THEN 1.0 ELSE 0.0 END
            ) * 100, 0)                                        AS attendance_pct,
            COALESCE(AVG(
                ass.score / NULLIF(ass.max_score, 0) * 100
            ), 0)                                               AS avg_assessment_score,
            CASE WHEN COUNT(DISTINCT c.certificate_id) > 0
                 THEN 1 ELSE 0 END                              AS has_certificate,
            COUNT(DISTINCT ts.skill_id)                         AS skill_count,
            CASE WHEN COUNT(DISTINCT e.enrollment_id) > 0
                 THEN 1 ELSE 0 END                              AS completed_training,
            CASE WHEN COUNT(DISTINCT emp.employment_id) > 0
                 THEN 1 ELSE 0 END                              AS employed
        FROM public.trainees t
        LEFT JOIN training.enrollments e
               ON t.trainee_id = e.trainee_id
        LEFT JOIN training.attendance a
               ON e.enrollment_id = a.enrollment_id
        LEFT JOIN training.assessments ass
               ON e.enrollment_id = ass.enrollment_id
        LEFT JOIN training.certificates c
               ON e.enrollment_id = c.enrollment_id
        LEFT JOIN education.trainee_skills ts
               ON t.trainee_id = ts.trainee_id
        LEFT JOIN employment.employment emp
               ON t.trainee_id = emp.trainee_id
        GROUP BY t.trainee_id;
    """
    conn = psycopg2.connect(connection_string)
    df = pd.read_sql(query, conn)
    conn.close()
    return df


# Allow running this file directly to generate + inspect data
if __name__ == "__main__":
    df = load_training_data()
    print("\n--- Summary ---")
    print(f"Rows:              {len(df)}")
    print(f"Employment rate:   {df['employed'].mean() * 100:.1f}%")
    print(f"Avg attendance:    {df['attendance_pct'].mean():.1f}%")
    print(f"Avg assessment:    {df['avg_assessment_score'].mean():.1f}%")
    print(f"Certificate rate:  {df['has_certificate'].mean() * 100:.1f}%")
    print(f"Avg skill count:   {df['skill_count'].mean():.1f}")
    print(f"\nColumns: {list(df.columns)}")
    print("\nFirst 3 rows:")
    print(df.head(3).to_string())