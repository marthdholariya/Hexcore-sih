-- Aggregated District & Sector Metrics for API Endpoints
SELECT 
    district_code,
    sector_id,
    COUNT(trainee_id) AS total_enrolled,
    SUM(CASE WHEN status_3m = 'Employed' THEN 1 ELSE 0 END) AS count_employed_3m,
    SUM(CASE WHEN status_6m = 'Employed' THEN 1 ELSE 0 END) AS count_employed_6m,
    ROUND(AVG(pre_salary), 2) AS avg_pre_salary,
    ROUND(AVG(post_salary), 2) AS avg_post_salary,
    ROUND(
        (SUM(CASE WHEN status_3m = 'Employed' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(trainee_id), 0)), 
        2
    ) AS employment_rate_pct
FROM trainees
GROUP BY district_code, sector_id;