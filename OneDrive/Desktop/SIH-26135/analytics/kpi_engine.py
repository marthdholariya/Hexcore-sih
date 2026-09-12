import math

def calculate_employment_rate(employed: int, eligible: int) -> float:
    """Calculates Employment Rate as a percentage."""
    if eligible <= 0:
        return 0.0
    return round((employed / eligible) * 100, 2)


def calculate_retention_rate(retained_count: int, total_placed: int) -> float:
    """Calculates longitudinal retention rate for 3, 6, or 12-month marks."""
    if total_placed <= 0:
        return 0.0
    return round((retained_count / total_placed) * 100, 2)


def calculate_salary_hike(pre_salary: float, post_salary: float) -> float:
    """Calculates average percentage gain between baseline and post-training earnings."""
    if pre_salary <= 0:
        return 0.0
    return round(((post_salary - pre_salary) / pre_salary) * 100, 2)


def calculate_attrition_rate(dropped_out: int, total_enrolled: int) -> float:
    """Calculates trainee dropout rate."""
    if total_enrolled <= 0:
        return 0.0
    return round((dropped_out / total_enrolled) * 100, 2)


def calculate_confidence_score(v_aadhaar: float, v_epfo: float, v_provider: float) -> float:
    """Weighted verification score (Identity 40%, EPFO 30%, Provider 30%)."""
    return round((0.4 * v_aadhaar) + (0.3 * v_epfo) + (0.3 * v_provider), 2)