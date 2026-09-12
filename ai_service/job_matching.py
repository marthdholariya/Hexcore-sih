"""
job_matching.py
---------------
Skill-based matching between trainees and jobs.
Uses Jaccard similarity: (matched skills / required skills) * 100.
Not ML — pure algorithmic matching.
"""


def _title_skill(s):
    """Title-case a skill name, but keep known acronyms uppercase."""
    if s.lower() == "aws":
        return "AWS"
    if s.lower() == "sql":
        return "SQL"
    if s.lower() == "html":
        return "HTML"
    if s.lower() == "css":
        return "CSS"
    if s.lower() == "api":
        return "API"
    return s.title()


def match_trainee_to_job(trainee_skills, job_skills):
    """
    Compare a trainee's skills against a job's required skills.
    Returns match score, matched skills, and missing skills.
    """
    trainee_set = {s.lower().strip() for s in trainee_skills}
    job_set = {s.lower().strip() for s in job_skills}

    if not job_set:
        return {"match_score": 0, "matched_skills": [], "missing_skills": []}

    matched = trainee_set & job_set
    missing = job_set - trainee_set

    # Match score: how many required skills does trainee have?
    score = (len(matched) / len(job_set)) * 100

    return {
        "match_score": round(score, 1),
        "matched_skills": sorted(_title_skill(s) for s in matched),
        "missing_skills": sorted(_title_skill(s) for s in missing),
    }


def detect_skill_gap(trainee_skills, target_job_skills, market_demand=None):
    """
    Identify missing skills for a target job, prioritized by market demand.
    market_demand = {"python": "High", "docker": "Medium", ...}
    """
    trainee_set = {s.lower().strip() for s in trainee_skills}
    job_set = {s.lower().strip() for s in target_job_skills}
    missing = job_set - trainee_set

    priority_map = {"Very High": 4, "High": 3, "Medium": 2, "Low": 1}
    result = []

    for skill in missing:
        demand = market_demand.get(skill, "Medium") if market_demand else "Medium"
        result.append({
            "skill": _title_skill(skill),
            "priority": demand,
            "priority_score": priority_map.get(demand, 2),
        })

    result.sort(key=lambda x: x["priority_score"], reverse=True)
    return result