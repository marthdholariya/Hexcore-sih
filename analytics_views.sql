-- SkillTrack Analytics Views
-- Recovered from the existing PostgreSQL database dump.
-- 37 analytics views are included.

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET search_path = '';

--
-- Name: v_assessment_performance; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_assessment_performance AS
 SELECT count(*) AS assessment_records,
    round(avg(((score * 100.0) / NULLIF(max_score, (0)::numeric))), 2) AS average_assessment_percentage,
    round(min(((score * 100.0) / NULLIF(max_score, (0)::numeric))), 2) AS minimum_assessment_percentage,
    round(max(((score * 100.0) / NULLIF(max_score, (0)::numeric))), 2) AS maximum_assessment_percentage
   FROM training.assessments;



--
-- Name: v_average_starting_salary; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_average_starting_salary AS
 SELECT count(*) AS salary_records,
    round(avg(salary_amount), 2) AS average_starting_salary,
    min(salary_amount) AS minimum_starting_salary,
    max(salary_amount) AS maximum_starting_salary
   FROM employment.salary_history;



--
-- Name: v_course_performance; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_course_performance AS
 SELECT c.course_id,
    c.course_name,
    count(DISTINCT e.enrollment_id) AS total_enrollments,
    count(DISTINCT e.enrollment_id) FILTER (WHERE ((e.completion_status)::text = 'Completed'::text)) AS completed_enrollments,
    round((((count(DISTINCT e.enrollment_id) FILTER (WHERE ((e.completion_status)::text = 'Completed'::text)))::numeric * 100.0) / (NULLIF(count(DISTINCT e.enrollment_id), 0))::numeric), 2) AS completion_rate,
    round(avg(((a.score * 100.0) / NULLIF(a.max_score, (0)::numeric))), 2) AS average_assessment_percentage
   FROM ((training.courses c
     LEFT JOIN training.enrollments e ON ((e.course_id = c.course_id)))
     LEFT JOIN training.assessments a ON ((a.enrollment_id = e.enrollment_id)))
  GROUP BY c.course_id, c.course_name;



--
-- Name: v_data_quality_by_severity; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_data_quality_by_severity AS
 SELECT severity,
    count(*) AS issue_count,
    round((((count(*))::numeric * 100.0) / (NULLIF(( SELECT count(*) AS count
           FROM planning.data_quality_issues data_quality_issues_1), 0))::numeric), 2) AS percentage
   FROM planning.data_quality_issues
  GROUP BY severity;



--
-- Name: v_data_quality_by_status; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_data_quality_by_status AS
 SELECT status,
    count(*) AS issue_count,
    round((((count(*))::numeric * 100.0) / (NULLIF(( SELECT count(*) AS count
           FROM planning.data_quality_issues data_quality_issues_1), 0))::numeric), 2) AS percentage
   FROM planning.data_quality_issues
  GROUP BY status;



--
-- Name: v_data_quality_by_type; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_data_quality_by_type AS
 SELECT issue_type,
    severity,
    count(*) AS issue_count
   FROM planning.data_quality_issues
  GROUP BY issue_type, severity;



--
-- Name: v_employment_by_district; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_employment_by_district AS
 SELECT t.district,
    count(DISTINCT t.trainee_id) AS total_trainees,
    count(DISTINCT e.trainee_id) AS employed_trainees,
    round((((count(DISTINCT e.trainee_id))::numeric * 100.0) / (NULLIF(count(DISTINCT t.trainee_id), 0))::numeric), 2) AS employment_rate
   FROM (public.trainees t
     LEFT JOIN employment.employment e ON (((e.trainee_id = t.trainee_id) AND ((e.employment_status)::text = 'Employed'::text))))
  GROUP BY t.district;



--
-- Name: v_employment_by_employer; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_employment_by_employer AS
 SELECT emp.employer_id,
    emp.company_name,
    emp.industry_sector,
    count(DISTINCT e.employment_id) AS employed_trainees,
    round(avg(sh.salary_amount), 2) AS average_starting_salary,
    count(DISTINCT e.employment_id) FILTER (WHERE (e.training_related = true)) AS training_related_employment
   FROM ((public.employers emp
     LEFT JOIN employment.employment e ON (((e.employer_id = emp.employer_id) AND ((e.employment_status)::text = 'Employed'::text))))
     LEFT JOIN employment.salary_history sh ON ((sh.employment_id = e.employment_id)))
  GROUP BY emp.employer_id, emp.company_name, emp.industry_sector;



--
-- Name: v_employment_by_job_role; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_employment_by_job_role AS
 SELECT e.job_role,
    count(DISTINCT e.employment_id) AS employed_count,
    count(DISTINCT e.employment_id) FILTER (WHERE (e.training_related = true)) AS training_related_count,
    round(avg(sh.salary_amount), 2) AS average_starting_salary,
    min(sh.salary_amount) AS minimum_starting_salary,
    max(sh.salary_amount) AS maximum_starting_salary
   FROM (employment.employment e
     LEFT JOIN employment.salary_history sh ON ((sh.employment_id = e.employment_id)))
  WHERE ((e.employment_status)::text = 'Employed'::text)
  GROUP BY e.job_role;



--
-- Name: v_employment_change_indicators; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_employment_change_indicators AS
 SELECT count(*) AS total_responses,
    count(*) FILTER (WHERE (job_changed = true)) AS job_changed_count,
    count(*) FILTER (WHERE (unemployed = true)) AS unemployed_count,
    count(*) FILTER (WHERE ((job_changed = true) OR (unemployed = true))) AS employment_change_or_unemployed_count,
    round((((count(*) FILTER (WHERE (job_changed = true)))::numeric * 100.0) / (NULLIF(count(*), 0))::numeric), 2) AS job_change_rate,
    round((((count(*) FILTER (WHERE (unemployed = true)))::numeric * 100.0) / (NULLIF(count(*), 0))::numeric), 2) AS unemployment_rate
   FROM followup.followup_responses;



--
-- Name: v_employment_rate; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_employment_rate AS
 SELECT count(DISTINCT t.trainee_id) AS total_trainees,
    count(DISTINCT e.trainee_id) AS employed_trainees,
    round((((count(DISTINCT e.trainee_id))::numeric * 100.0) / (NULLIF(count(DISTINCT t.trainee_id), 0))::numeric), 2) AS employment_rate
   FROM (public.trainees t
     LEFT JOIN employment.employment e ON (((e.trainee_id = t.trainee_id) AND ((e.employment_status)::text = 'Employed'::text))));



--
-- Name: v_employment_status_by_milestone; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_employment_status_by_milestone AS
 SELECT f.milestone_month,
    es.status_name AS employment_status,
    count(*) AS trainee_count
   FROM ((followup.followups f
     JOIN followup.followup_responses fr ON ((fr.followup_id = f.followup_id)))
     JOIN followup.employment_status es ON ((es.status_id = fr.current_employment_status_id)))
  GROUP BY f.milestone_month, es.status_name;



--
-- Name: v_employment_status_coverage; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_employment_status_coverage AS
 SELECT f.milestone_month,
    count(*) AS responded_followups,
    count(*) FILTER (WHERE (fr.current_employment_status_id IS NOT NULL)) AS responses_with_status,
    round((((count(*) FILTER (WHERE (fr.current_employment_status_id IS NOT NULL)))::numeric * 100.0) / (NULLIF(count(*), 0))::numeric), 2) AS status_coverage_rate
   FROM (followup.followups f
     JOIN followup.followup_responses fr ON ((fr.followup_id = f.followup_id)))
  GROUP BY f.milestone_month;



--
-- Name: v_followup_employment_status; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_followup_employment_status AS
 SELECT es.status_name AS employment_status,
    count(DISTINCT fr.response_id) AS trainee_count,
    round((((count(DISTINCT fr.response_id))::numeric * 100.0) / (NULLIF(( SELECT count(*) AS count
           FROM followup.followup_responses), 0))::numeric), 2) AS percentage
   FROM (followup.followup_responses fr
     JOIN followup.employment_status es ON ((es.status_id = fr.current_employment_status_id)))
  GROUP BY es.status_name;



--
-- Name: v_followup_milestone_coverage; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_followup_milestone_coverage AS
 SELECT f.milestone_month,
    count(*) AS total_followups,
    count(*) FILTER (WHERE (f.response_date IS NOT NULL)) AS responded_followups,
    count(*) FILTER (WHERE (fr.current_employment_status_id IS NOT NULL)) AS with_employment_status
   FROM (followup.followups f
     LEFT JOIN followup.followup_responses fr ON ((fr.followup_id = f.followup_id)))
  GROUP BY f.milestone_month;



--
-- Name: v_followup_response_rate; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_followup_response_rate AS
 SELECT count(*) AS total_followups,
    count(*) FILTER (WHERE (response_date IS NOT NULL)) AS responded_followups,
    round((((count(*) FILTER (WHERE (response_date IS NOT NULL)))::numeric * 100.0) / (NULLIF(count(*), 0))::numeric), 2) AS response_rate
   FROM followup.followups;



--
-- Name: v_followup_status; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_followup_status AS
 SELECT status,
    count(*) AS followup_count,
    round((((count(*))::numeric * 100.0) / (NULLIF(( SELECT count(*) AS count
           FROM followup.followups followups_1), 0))::numeric), 2) AS percentage
   FROM followup.followups
  GROUP BY status;



--
-- Name: v_individual_predictions; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_individual_predictions AS
 SELECT u.name AS trainee_name,
    p.prediction_type,
    round((p.probability_score * (100)::numeric), 2) AS probability_percentage,
    p.risk_level,
    p.model_version,
    p.prediction_date,
    p.key_factors
   FROM ((analytics.predictions p
     JOIN public.trainees t ON ((t.trainee_id = p.trainee_id)))
     JOIN public.users u ON ((u.user_id = t.user_id)));



--
-- Name: v_job_skill_requirements; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_job_skill_requirements AS
 SELECT j.job_id,
    j.title AS job_title,
    s.skill_name,
    js.required_level
   FROM ((jobs.jobs j
     JOIN jobs.job_skills js ON ((js.job_id = j.job_id)))
     JOIN education.skills s ON ((s.skill_id = js.skill_id)));



--
-- Name: v_open_data_quality_issues; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_open_data_quality_issues AS
 SELECT issue_id,
    entity_type,
    entity_id,
    issue_type,
    severity,
    issue_description,
    detected_date
   FROM planning.data_quality_issues
  WHERE ((status)::text = 'Open'::text);



--
-- Name: v_open_issues_by_severity; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_open_issues_by_severity AS
 SELECT severity,
    count(*) AS open_issue_count,
    round((((count(*))::numeric * 100.0) / (NULLIF(( SELECT count(*) AS count
           FROM planning.data_quality_issues data_quality_issues_1
          WHERE ((data_quality_issues_1.status)::text = 'Open'::text)), 0))::numeric), 2) AS percentage_of_open_issues
   FROM planning.data_quality_issues
  WHERE ((status)::text = 'Open'::text)
  GROUP BY severity;



--
-- Name: v_prediction_probability; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_prediction_probability AS
 SELECT count(*) AS total_predictions,
    round((avg(probability_score) * (100)::numeric), 2) AS average_probability,
    round((min(probability_score) * (100)::numeric), 2) AS minimum_probability,
    round((max(probability_score) * (100)::numeric), 2) AS maximum_probability
   FROM analytics.predictions;



--
-- Name: v_prediction_risk_distribution; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_prediction_risk_distribution AS
 SELECT risk_level,
    count(*) AS prediction_count,
    round((((count(*))::numeric * 100.0) / (NULLIF(( SELECT count(*) AS count
           FROM analytics.predictions predictions_1), 0))::numeric), 2) AS percentage
   FROM analytics.predictions
  GROUP BY risk_level;



--
-- Name: v_prediction_summary; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_prediction_summary AS
 SELECT prediction_type,
    risk_level,
    count(*) AS prediction_count,
    round((avg(probability_score) * (100)::numeric), 2) AS average_probability
   FROM analytics.predictions
  GROUP BY prediction_type, risk_level;



--
-- Name: v_provider_performance; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_provider_performance AS
 SELECT tp.provider_id,
    tp.name AS provider_name,
    count(DISTINCT c.course_id) AS total_courses,
    count(DISTINCT e.enrollment_id) AS total_enrollments,
    count(DISTINCT e.enrollment_id) FILTER (WHERE ((e.completion_status)::text = 'Completed'::text)) AS completed_enrollments,
    round((((count(DISTINCT e.enrollment_id) FILTER (WHERE ((e.completion_status)::text = 'Completed'::text)))::numeric * 100.0) / (NULLIF(count(DISTINCT e.enrollment_id), 0))::numeric), 2) AS completion_rate,
    round(avg(((a.score * 100.0) / NULLIF(a.max_score, (0)::numeric))), 2) AS average_assessment_percentage
   FROM (((public.training_providers tp
     LEFT JOIN training.courses c ON ((c.provider_id = tp.provider_id)))
     LEFT JOIN training.enrollments e ON ((e.course_id = c.course_id)))
     LEFT JOIN training.assessments a ON ((a.enrollment_id = e.enrollment_id)))
  GROUP BY tp.provider_id, tp.name;



--
-- Name: v_recommendation_coverage; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_recommendation_coverage AS
 SELECT count(DISTINCT t.trainee_id) AS total_trainees,
    count(DISTINCT t.trainee_id) FILTER (WHERE (r.recommendation_id IS NOT NULL)) AS trainees_with_recommendations,
    round((((count(DISTINCT t.trainee_id) FILTER (WHERE (r.recommendation_id IS NOT NULL)))::numeric * 100.0) / (NULLIF(count(DISTINCT t.trainee_id), 0))::numeric), 2) AS recommendation_coverage_rate
   FROM ((public.trainees t
     LEFT JOIN public.users u ON ((u.user_id = t.user_id)))
     LEFT JOIN analytics.recommendations r ON (((r.user_id = u.user_id) AND ((r.status)::text = 'Active'::text))));



--
-- Name: v_recommendation_summary; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_recommendation_summary AS
 SELECT entity_type,
    priority,
    status,
    count(*) AS recommendation_count
   FROM analytics.recommendations
  GROUP BY entity_type, priority, status;



--
-- Name: v_skill_demand; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_skill_demand AS
 SELECT s.skill_id,
    s.skill_name,
    sum(jm.job_postings_count) AS total_job_postings,
    max((jm.demand_level)::text) AS demand_level,
    max((jm.trend)::text) AS trend
   FROM (education.skills s
     JOIN jobs.job_market_data jm ON ((jm.skill_id = s.skill_id)))
  GROUP BY s.skill_id, s.skill_name;



--
-- Name: v_skill_gap_analysis; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_skill_gap_analysis AS
 SELECT t.trainee_id,
    u.name AS trainee_name,
    j.job_id,
    j.title AS job_title,
    sga.current_level,
    sga.required_level,
    sga.gap_level,
    sga.detected_date
   FROM (((analytics.skill_gap_analysis sga
     JOIN public.trainees t ON ((t.trainee_id = sga.trainee_id)))
     JOIN public.users u ON ((u.user_id = t.user_id)))
     JOIN jobs.jobs j ON ((j.job_id = sga.job_id)));



--
-- Name: v_skill_gap_summary; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_skill_gap_summary AS
 SELECT gap_level,
    count(*) AS trainee_count,
    round((((count(*))::numeric * 100.0) / sum(count(*)) OVER ()), 2) AS percentage
   FROM analytics.skill_gap_analysis
  GROUP BY gap_level;



--
-- Name: v_trainee_job_matching; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_trainee_job_matching AS
 WITH skill_levels AS (
         SELECT 'Beginner'::text AS skill_level,
            1 AS level_value
        UNION ALL
         SELECT 'Intermediate'::text,
            2
        UNION ALL
         SELECT 'Advanced'::text,
            3
        ), trainee_skills_verified AS (
         SELECT ts.trainee_id,
            ts.skill_id,
            ts.skill_level
           FROM education.trainee_skills ts
          WHERE ((ts.verification_status)::text = 'Verified'::text)
        )
 SELECT t.trainee_id,
    u.name AS trainee_name,
    j.job_id,
    j.title AS job_title,
    count(js.job_skill_id) AS required_skill_count,
    count(js.job_skill_id) FILTER (WHERE ((tsv.skill_id IS NOT NULL) AND (tsl.level_value >= rsl.level_value))) AS matched_skill_count,
    round((((count(js.job_skill_id) FILTER (WHERE ((tsv.skill_id IS NOT NULL) AND (tsl.level_value >= rsl.level_value))))::numeric * 100.0) / (NULLIF(count(js.job_skill_id), 0))::numeric), 2) AS match_percentage
   FROM ((((((public.trainees t
     JOIN public.users u ON ((u.user_id = t.user_id)))
     CROSS JOIN jobs.jobs j)
     JOIN jobs.job_skills js ON ((js.job_id = j.job_id)))
     JOIN skill_levels rsl ON ((rsl.skill_level = (js.required_level)::text)))
     LEFT JOIN trainee_skills_verified tsv ON (((tsv.trainee_id = t.trainee_id) AND (tsv.skill_id = js.skill_id))))
     LEFT JOIN skill_levels tsl ON ((tsl.skill_level = (tsv.skill_level)::text)))
  GROUP BY t.trainee_id, u.name, j.job_id, j.title;



--
-- Name: v_top_job_recommendations; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_top_job_recommendations AS
 SELECT trainee_id,
    trainee_name,
    job_id,
    job_title,
    required_skill_count,
    matched_skill_count,
    match_percentage,
    dense_rank() OVER (PARTITION BY trainee_id ORDER BY match_percentage DESC) AS recommendation_rank
   FROM analytics.v_trainee_job_matching;



--
-- Name: v_trainee_skill_profile; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_trainee_skill_profile AS
 SELECT t.trainee_id,
    u.name AS trainee_name,
    s.skill_name,
    ts.skill_level,
    ts.verification_status,
    ts.date_acquired,
    ts.last_updated
   FROM (((education.trainee_skills ts
     JOIN public.trainees t ON ((t.trainee_id = ts.trainee_id)))
     JOIN public.users u ON ((u.user_id = t.user_id)))
     JOIN education.skills s ON ((s.skill_id = ts.skill_id)));



--
-- Name: v_training_attendance; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_training_attendance AS
 SELECT count(*) AS attendance_records,
    round(avg((((sessions_attended)::numeric * 100.0) / (NULLIF(total_sessions, 0))::numeric)), 2) AS average_attendance,
    round(min((((sessions_attended)::numeric * 100.0) / (NULLIF(total_sessions, 0))::numeric)), 2) AS minimum_attendance,
    round(max((((sessions_attended)::numeric * 100.0) / (NULLIF(total_sessions, 0))::numeric)), 2) AS maximum_attendance
   FROM training.attendance;



--
-- Name: v_training_completion; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_training_completion AS
 SELECT count(*) AS total_enrollments,
    count(*) FILTER (WHERE ((completion_status)::text = 'Completed'::text)) AS completed_enrollments,
    round((((count(*) FILTER (WHERE ((completion_status)::text = 'Completed'::text)))::numeric * 100.0) / (NULLIF(count(*), 0))::numeric), 2) AS completion_rate
   FROM training.enrollments;



--
-- Name: v_training_employment_effectiveness; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_training_employment_effectiveness AS
 WITH completed_trainees AS (
         SELECT enrollments.course_id,
            enrollments.trainee_id
           FROM training.enrollments
          WHERE ((enrollments.completion_status)::text = 'Completed'::text)
        )
 SELECT c.course_id,
    c.course_name,
    count(DISTINCT e.enrollment_id) AS total_enrollments,
    count(DISTINCT e.trainee_id) FILTER (WHERE ((e.completion_status)::text = 'Completed'::text)) AS completed_trainees,
    count(DISTINCT ct.trainee_id) FILTER (WHERE (emp.trainee_id IS NOT NULL)) AS employed_completed_trainees,
    round((((count(DISTINCT ct.trainee_id) FILTER (WHERE (emp.trainee_id IS NOT NULL)))::numeric * 100.0) / (NULLIF(count(DISTINCT ct.trainee_id), 0))::numeric), 2) AS employment_rate_among_completed
   FROM (((training.courses c
     LEFT JOIN training.enrollments e ON ((e.course_id = c.course_id)))
     LEFT JOIN completed_trainees ct ON (((ct.course_id = c.course_id) AND (ct.trainee_id = e.trainee_id))))
     LEFT JOIN employment.employment emp ON ((emp.trainee_id = ct.trainee_id)))
  GROUP BY c.course_id, c.course_name;



--
-- Name: v_training_related_employment; Type: VIEW; Schema: analytics; Owner: postgres
--

CREATE VIEW analytics.v_training_related_employment AS
 SELECT count(DISTINCT trainee_id) AS total_employed,
    count(DISTINCT trainee_id) FILTER (WHERE (training_related = true)) AS training_related_employed,
    round((((count(DISTINCT trainee_id) FILTER (WHERE (training_related = true)))::numeric * 100.0) / (NULLIF(count(DISTINCT trainee_id), 0))::numeric), 2) AS training_related_employment_rate
   FROM employment.employment
  WHERE ((employment_status)::text = 'Employed'::text);
