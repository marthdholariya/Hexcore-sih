-- SkillTrack Database Schema
-- Recovered from the existing PostgreSQL database dump.
-- No table/column definitions have been invented.

-- SkillTrack Database
-- PostgreSQL schema/data recovered from the existing skilltrack_db dump.
-- Source: hexcore_full.sql (PostgreSQL 18.6 dump)
-- Generated for GitHub project organization.

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET search_path = '';

--
-- Name: analytics; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA analytics;



--
-- Name: education; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA education;



--
-- Name: employment; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA employment;



--
-- Name: followup; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA followup;



--
-- Name: jobs; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA jobs;



--
-- Name: planning; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA planning;



--
-- Name: training; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA training;



--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;



--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';





--
-- Name: predictions; Type: TABLE; Schema: analytics; Owner: postgres
--

CREATE TABLE analytics.predictions (
    prediction_id uuid DEFAULT gen_random_uuid() NOT NULL,
    trainee_id uuid NOT NULL,
    employment_id uuid,
    prediction_type character varying(50),
    probability_score numeric(5,2),
    risk_level character varying(20),
    model_version character varying(50),
    prediction_date date,
    key_factors text
);



--
-- Name: recommendations; Type: TABLE; Schema: analytics; Owner: postgres
--

CREATE TABLE analytics.recommendations (
    recommendation_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    user_type character varying(50),
    entity_type character varying(50),
    entity_id uuid,
    recommendation_text text,
    priority character varying(20),
    status character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: skill_gap_analysis; Type: TABLE; Schema: analytics; Owner: postgres
--

CREATE TABLE analytics.skill_gap_analysis (
    gap_id uuid DEFAULT gen_random_uuid() NOT NULL,
    trainee_id uuid NOT NULL,
    job_id uuid NOT NULL,
    current_level character varying(20),
    required_level character varying(20),
    gap_level character varying(20),
    detected_date date
);



--
-- Name: assessments; Type: TABLE; Schema: training; Owner: postgres
--

CREATE TABLE training.assessments (
    assessment_id uuid DEFAULT gen_random_uuid() NOT NULL,
    enrollment_id uuid NOT NULL,
    assessment_type character varying(50),
    assessment_date date,
    score numeric(5,2),
    max_score numeric(5,2),
    pass_fail boolean,
    result character varying(20)
);



--
-- Name: salary_history; Type: TABLE; Schema: employment; Owner: postgres
--

CREATE TABLE employment.salary_history (
    salary_history_id uuid DEFAULT gen_random_uuid() NOT NULL,
    employment_id uuid NOT NULL,
    salary_amount numeric(10,2),
    effective_date date,
    salary_type character varying(20),
    source character varying(50)
);



--
-- Name: courses; Type: TABLE; Schema: training; Owner: postgres
--

CREATE TABLE training.courses (
    course_id uuid DEFAULT gen_random_uuid() NOT NULL,
    provider_id uuid NOT NULL,
    course_name character varying(100) NOT NULL,
    description text,
    sector character varying(50),
    job_role character varying(100),
    duration character varying(100),
    course_level character varying(20),
    status character varying(20)
);



--
-- Name: enrollments; Type: TABLE; Schema: training; Owner: postgres
--

CREATE TABLE training.enrollments (
    enrollment_id uuid DEFAULT gen_random_uuid() NOT NULL,
    trainee_id uuid NOT NULL,
    course_id uuid NOT NULL,
    enrollment_date date,
    start_date date,
    end_date date,
    completion_status character varying(20),
    completion_date date
);



--
-- Name: data_quality_issues; Type: TABLE; Schema: planning; Owner: postgres
--

CREATE TABLE planning.data_quality_issues (
    issue_id uuid DEFAULT gen_random_uuid() NOT NULL,
    entity_type character varying(50),
    entity_id uuid,
    issue_type character varying(50),
    issue_description text,
    severity character varying(20),
    status character varying(20),
    detected_date date,
    resolved_date date
);



--
-- Name: employment; Type: TABLE; Schema: employment; Owner: postgres
--

CREATE TABLE employment.employment (
    employment_id uuid DEFAULT gen_random_uuid() NOT NULL,
    trainee_id uuid NOT NULL,
    employer_id uuid NOT NULL,
    job_role character varying(100),
    joining_date date,
    leaving_date date,
    employment_type character varying(20),
    location character varying(100),
    training_related boolean,
    employment_status character varying(20)
);



--
-- Name: trainees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trainees (
    trainee_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    dob date,
    gender character varying(100),
    address text,
    district character varying(100),
    state character varying(100),
    profile_created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: employers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employers (
    employer_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    company_name character varying(100),
    industry_sector character varying(100),
    contact_person character varying(100),
    phone character varying(15),
    email character varying(100),
    address text,
    district character varying(100),
    state character varying(100),
    status character varying(20)
);



--
-- Name: followup_responses; Type: TABLE; Schema: followup; Owner: postgres
--

CREATE TABLE followup.followup_responses (
    response_id uuid DEFAULT gen_random_uuid() NOT NULL,
    followup_id uuid NOT NULL,
    current_employment_status_id uuid,
    current_job character varying(100),
    salary numeric(10,2),
    job_changed boolean,
    apprenticeship boolean,
    further_education boolean,
    unemployed boolean,
    comments text
);



--
-- Name: employment_status; Type: TABLE; Schema: followup; Owner: postgres
--

CREATE TABLE followup.employment_status (
    status_id uuid DEFAULT gen_random_uuid() NOT NULL,
    status_name character varying(50) NOT NULL,
    description text
);



--
-- Name: followups; Type: TABLE; Schema: followup; Owner: postgres
--

CREATE TABLE followup.followups (
    followup_id uuid DEFAULT gen_random_uuid() NOT NULL,
    trainee_id uuid NOT NULL,
    milestone_month integer,
    scheduled_date date,
    response_date date,
    status character varying(20)
);



--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(15),
    password_hash character varying(255) NOT NULL,
    role character varying(20) NOT NULL,
    account_status character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: skills; Type: TABLE; Schema: education; Owner: postgres
--

CREATE TABLE education.skills (
    skill_id uuid DEFAULT gen_random_uuid() NOT NULL,
    skill_name character varying(100) NOT NULL,
    skill_category character varying(50),
    sector character varying(50),
    description text
);



--
-- Name: job_skills; Type: TABLE; Schema: jobs; Owner: postgres
--

CREATE TABLE jobs.job_skills (
    job_skill_id uuid DEFAULT gen_random_uuid() NOT NULL,
    job_id uuid NOT NULL,
    skill_id uuid NOT NULL,
    required_level character varying(20)
);



--
-- Name: jobs; Type: TABLE; Schema: jobs; Owner: postgres
--

CREATE TABLE jobs.jobs (
    job_id uuid DEFAULT gen_random_uuid() NOT NULL,
    employer_id uuid NOT NULL,
    title character varying(100) NOT NULL,
    sector character varying(50),
    location character varying(100),
    district character varying(100),
    state character varying(100),
    employment_type character varying(20),
    salary_min numeric(10,2),
    salary_max numeric(10,2),
    experience_required character varying(50),
    education_required character varying(50),
    description text,
    posted_date date,
    closing_date date,
    status character varying(20)
);



--
-- Name: training_providers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.training_providers (
    provider_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name character varying(100),
    contact_person character varying(100),
    phone character varying(15),
    email character varying(100),
    address text,
    district character varying(100),
    state character varying(100),
    status character varying(20)
);



--
-- Name: job_market_data; Type: TABLE; Schema: jobs; Owner: postgres
--

CREATE TABLE jobs.job_market_data (
    market_data_id uuid DEFAULT gen_random_uuid() NOT NULL,
    skill_id uuid NOT NULL,
    location character varying(100),
    sector character varying(50),
    job_role character varying(100),
    time_period character varying(20),
    demand_level character varying(20),
    job_postings_count integer,
    trend character varying(20)
);



--
-- Name: trainee_skills; Type: TABLE; Schema: education; Owner: postgres
--

CREATE TABLE education.trainee_skills (
    trainee_skill_id uuid DEFAULT gen_random_uuid() NOT NULL,
    trainee_id uuid NOT NULL,
    skill_id uuid NOT NULL,
    skill_level character varying(20),
    source character varying(50),
    verification_status character varying(20),
    date_acquired date,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: attendance; Type: TABLE; Schema: training; Owner: postgres
--

CREATE TABLE training.attendance (
    attendance_id uuid DEFAULT gen_random_uuid() NOT NULL,
    enrollment_id uuid NOT NULL,
    attendance_date date,
    is_present boolean,
    total_sessions integer,
    sessions_attended integer
);



--
-- Name: education; Type: TABLE; Schema: education; Owner: postgres
--

CREATE TABLE education.education (
    education_id uuid DEFAULT gen_random_uuid() NOT NULL,
    trainee_id uuid NOT NULL,
    qualification character varying(100),
    institution character varying(100),
    field_of_study character varying(100),
    start_date date,
    end_date date,
    grade_percentage numeric(5,2)
);



--
-- Name: employment_evidence; Type: TABLE; Schema: employment; Owner: postgres
--

CREATE TABLE employment.employment_evidence (
    evidence_id uuid DEFAULT gen_random_uuid() NOT NULL,
    employment_id uuid NOT NULL,
    evidence_type character varying(50),
    evidence_url text,
    upload_date date,
    verification_status character varying(20),
    reviewer character varying(100),
    review_date date,
    comments text
);



--
-- Name: employment_verifications; Type: TABLE; Schema: employment; Owner: postgres
--

CREATE TABLE employment.employment_verifications (
    verification_id uuid DEFAULT gen_random_uuid() NOT NULL,
    employment_id uuid NOT NULL,
    employer_id uuid NOT NULL,
    verified_role character varying(100),
    verified_joining_date date,
    verified_status character varying(20),
    verification_date date,
    verified_by character varying(100),
    comments text
);



--
-- Name: attrition_reasons; Type: TABLE; Schema: followup; Owner: postgres
--

CREATE TABLE followup.attrition_reasons (
    reason_id uuid DEFAULT gen_random_uuid() NOT NULL,
    reason_name character varying(100) NOT NULL,
    description text
);



--
-- Name: non_placement_reasons; Type: TABLE; Schema: followup; Owner: postgres
--

CREATE TABLE followup.non_placement_reasons (
    reason_id uuid DEFAULT gen_random_uuid() NOT NULL,
    reason_name character varying(100) NOT NULL,
    description text
);



--
-- Name: training_effectiveness; Type: TABLE; Schema: planning; Owner: postgres
--

CREATE TABLE planning.training_effectiveness (
    effectiveness_id uuid DEFAULT gen_random_uuid() NOT NULL,
    course_id uuid NOT NULL,
    provider_id uuid NOT NULL,
    completion_rate numeric(5,2),
    placement_rate numeric(5,2),
    retention_rate numeric(5,2),
    avg_starting_salary numeric(10,2),
    effectiveness_score numeric(5,2),
    calculated_date date
);



--
-- Name: whatif_scenarios; Type: TABLE; Schema: planning; Owner: postgres
--

CREATE TABLE planning.whatif_scenarios (
    scenario_id uuid DEFAULT gen_random_uuid() NOT NULL,
    scenario_name character varying(100) NOT NULL,
    description text,
    target_course_id uuid,
    target_skill_id uuid,
    assumptions text,
    estimated_impact text,
    confidence_level character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: certificates; Type: TABLE; Schema: training; Owner: postgres
--

CREATE TABLE training.certificates (
    certificate_id uuid DEFAULT gen_random_uuid() NOT NULL,
    enrollment_id uuid NOT NULL,
    certificate_name character varying(100),
    certificate_number character varying(100),
    issue_date date,
    expiry_date date,
    issuing_organization character varying(100),
    verification_status character varying(20),
    certificate_url text
);



--
-- Name: predictions predictions_pkey; Type: CONSTRAINT; Schema: analytics; Owner: postgres
--

ALTER TABLE ONLY analytics.predictions
    ADD CONSTRAINT predictions_pkey PRIMARY KEY (prediction_id);



--
-- Name: recommendations recommendations_pkey; Type: CONSTRAINT; Schema: analytics; Owner: postgres
--

ALTER TABLE ONLY analytics.recommendations
    ADD CONSTRAINT recommendations_pkey PRIMARY KEY (recommendation_id);



--
-- Name: skill_gap_analysis skill_gap_analysis_pkey; Type: CONSTRAINT; Schema: analytics; Owner: postgres
--

ALTER TABLE ONLY analytics.skill_gap_analysis
    ADD CONSTRAINT skill_gap_analysis_pkey PRIMARY KEY (gap_id);



--
-- Name: education education_pkey; Type: CONSTRAINT; Schema: education; Owner: postgres
--

ALTER TABLE ONLY education.education
    ADD CONSTRAINT education_pkey PRIMARY KEY (education_id);



--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: education; Owner: postgres
--

ALTER TABLE ONLY education.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (skill_id);



--
-- Name: trainee_skills trainee_skills_pkey; Type: CONSTRAINT; Schema: education; Owner: postgres
--

ALTER TABLE ONLY education.trainee_skills
    ADD CONSTRAINT trainee_skills_pkey PRIMARY KEY (trainee_skill_id);



--
-- Name: employment_evidence employment_evidence_pkey; Type: CONSTRAINT; Schema: employment; Owner: postgres
--

ALTER TABLE ONLY employment.employment_evidence
    ADD CONSTRAINT employment_evidence_pkey PRIMARY KEY (evidence_id);



--
-- Name: employment employment_pkey; Type: CONSTRAINT; Schema: employment; Owner: postgres
--

ALTER TABLE ONLY employment.employment
    ADD CONSTRAINT employment_pkey PRIMARY KEY (employment_id);



--
-- Name: employment_verifications employment_verifications_pkey; Type: CONSTRAINT; Schema: employment; Owner: postgres
--

ALTER TABLE ONLY employment.employment_verifications
    ADD CONSTRAINT employment_verifications_pkey PRIMARY KEY (verification_id);



--
-- Name: salary_history salary_history_pkey; Type: CONSTRAINT; Schema: employment; Owner: postgres
--

ALTER TABLE ONLY employment.salary_history
    ADD CONSTRAINT salary_history_pkey PRIMARY KEY (salary_history_id);



--
-- Name: attrition_reasons attrition_reasons_pkey; Type: CONSTRAINT; Schema: followup; Owner: postgres
--

ALTER TABLE ONLY followup.attrition_reasons
    ADD CONSTRAINT attrition_reasons_pkey PRIMARY KEY (reason_id);



--
-- Name: employment_status employment_status_pkey; Type: CONSTRAINT; Schema: followup; Owner: postgres
--

ALTER TABLE ONLY followup.employment_status
    ADD CONSTRAINT employment_status_pkey PRIMARY KEY (status_id);



--
-- Name: followup_responses followup_responses_pkey; Type: CONSTRAINT; Schema: followup; Owner: postgres
--

ALTER TABLE ONLY followup.followup_responses
    ADD CONSTRAINT followup_responses_pkey PRIMARY KEY (response_id);



--
-- Name: followups followups_pkey; Type: CONSTRAINT; Schema: followup; Owner: postgres
--

ALTER TABLE ONLY followup.followups
    ADD CONSTRAINT followups_pkey PRIMARY KEY (followup_id);



--
-- Name: non_placement_reasons non_placement_reasons_pkey; Type: CONSTRAINT; Schema: followup; Owner: postgres
--

ALTER TABLE ONLY followup.non_placement_reasons
    ADD CONSTRAINT non_placement_reasons_pkey PRIMARY KEY (reason_id);



--
-- Name: job_market_data job_market_data_pkey; Type: CONSTRAINT; Schema: jobs; Owner: postgres
--

ALTER TABLE ONLY jobs.job_market_data
    ADD CONSTRAINT job_market_data_pkey PRIMARY KEY (market_data_id);



--
-- Name: job_skills job_skills_pkey; Type: CONSTRAINT; Schema: jobs; Owner: postgres
--

ALTER TABLE ONLY jobs.job_skills
    ADD CONSTRAINT job_skills_pkey PRIMARY KEY (job_skill_id);



--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: jobs; Owner: postgres
--

ALTER TABLE ONLY jobs.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (job_id);



--
-- Name: data_quality_issues data_quality_issues_pkey; Type: CONSTRAINT; Schema: planning; Owner: postgres
--

ALTER TABLE ONLY planning.data_quality_issues
    ADD CONSTRAINT data_quality_issues_pkey PRIMARY KEY (issue_id);



--
-- Name: training_effectiveness training_effectiveness_pkey; Type: CONSTRAINT; Schema: planning; Owner: postgres
--

ALTER TABLE ONLY planning.training_effectiveness
    ADD CONSTRAINT training_effectiveness_pkey PRIMARY KEY (effectiveness_id);



--
-- Name: whatif_scenarios whatif_scenarios_pkey; Type: CONSTRAINT; Schema: planning; Owner: postgres
--

ALTER TABLE ONLY planning.whatif_scenarios
    ADD CONSTRAINT whatif_scenarios_pkey PRIMARY KEY (scenario_id);



--
-- Name: employers employers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employers
    ADD CONSTRAINT employers_pkey PRIMARY KEY (employer_id);



--
-- Name: employers employers_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employers
    ADD CONSTRAINT employers_user_id_key UNIQUE (user_id);



--
-- Name: trainees trainees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trainees
    ADD CONSTRAINT trainees_pkey PRIMARY KEY (trainee_id);



--
-- Name: trainees trainees_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trainees
    ADD CONSTRAINT trainees_user_id_key UNIQUE (user_id);



--
-- Name: training_providers training_providers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_providers
    ADD CONSTRAINT training_providers_pkey PRIMARY KEY (provider_id);



--
-- Name: training_providers training_providers_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_providers
    ADD CONSTRAINT training_providers_user_id_key UNIQUE (user_id);



--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);



--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);



--
-- Name: assessments assessments_pkey; Type: CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.assessments
    ADD CONSTRAINT assessments_pkey PRIMARY KEY (assessment_id);



--
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (attendance_id);



--
-- Name: certificates certificates_certificate_number_key; Type: CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.certificates
    ADD CONSTRAINT certificates_certificate_number_key UNIQUE (certificate_number);



--
-- Name: certificates certificates_pkey; Type: CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.certificates
    ADD CONSTRAINT certificates_pkey PRIMARY KEY (certificate_id);



--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (course_id);



--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (enrollment_id);



--
-- Name: skill_gap_analysis fk_gap_job; Type: FK CONSTRAINT; Schema: analytics; Owner: postgres
--

ALTER TABLE ONLY analytics.skill_gap_analysis
    ADD CONSTRAINT fk_gap_job FOREIGN KEY (job_id) REFERENCES jobs.jobs(job_id);



--
-- Name: skill_gap_analysis fk_gap_trainee; Type: FK CONSTRAINT; Schema: analytics; Owner: postgres
--

ALTER TABLE ONLY analytics.skill_gap_analysis
    ADD CONSTRAINT fk_gap_trainee FOREIGN KEY (trainee_id) REFERENCES public.trainees(trainee_id);



--
-- Name: predictions fk_prediction_employment; Type: FK CONSTRAINT; Schema: analytics; Owner: postgres
--

ALTER TABLE ONLY analytics.predictions
    ADD CONSTRAINT fk_prediction_employment FOREIGN KEY (employment_id) REFERENCES employment.employment(employment_id);



--
-- Name: predictions fk_prediction_trainee; Type: FK CONSTRAINT; Schema: analytics; Owner: postgres
--

ALTER TABLE ONLY analytics.predictions
    ADD CONSTRAINT fk_prediction_trainee FOREIGN KEY (trainee_id) REFERENCES public.trainees(trainee_id);



--
-- Name: recommendations fk_recommendation_user; Type: FK CONSTRAINT; Schema: analytics; Owner: postgres
--

ALTER TABLE ONLY analytics.recommendations
    ADD CONSTRAINT fk_recommendation_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);



--
-- Name: education fk_education_trainee; Type: FK CONSTRAINT; Schema: education; Owner: postgres
--

ALTER TABLE ONLY education.education
    ADD CONSTRAINT fk_education_trainee FOREIGN KEY (trainee_id) REFERENCES public.trainees(trainee_id);



--
-- Name: trainee_skills fk_trainee_skills_skill; Type: FK CONSTRAINT; Schema: education; Owner: postgres
--

ALTER TABLE ONLY education.trainee_skills
    ADD CONSTRAINT fk_trainee_skills_skill FOREIGN KEY (skill_id) REFERENCES education.skills(skill_id);



--
-- Name: trainee_skills fk_trainee_skills_trainee; Type: FK CONSTRAINT; Schema: education; Owner: postgres
--

ALTER TABLE ONLY education.trainee_skills
    ADD CONSTRAINT fk_trainee_skills_trainee FOREIGN KEY (trainee_id) REFERENCES public.trainees(trainee_id);



--
-- Name: employment fk_employment_employer; Type: FK CONSTRAINT; Schema: employment; Owner: postgres
--

ALTER TABLE ONLY employment.employment
    ADD CONSTRAINT fk_employment_employer FOREIGN KEY (employer_id) REFERENCES public.employers(employer_id);



--
-- Name: employment fk_employment_trainee; Type: FK CONSTRAINT; Schema: employment; Owner: postgres
--

ALTER TABLE ONLY employment.employment
    ADD CONSTRAINT fk_employment_trainee FOREIGN KEY (trainee_id) REFERENCES public.trainees(trainee_id);



--
-- Name: employment_evidence fk_evidence_employment; Type: FK CONSTRAINT; Schema: employment; Owner: postgres
--

ALTER TABLE ONLY employment.employment_evidence
    ADD CONSTRAINT fk_evidence_employment FOREIGN KEY (employment_id) REFERENCES employment.employment(employment_id);



--
-- Name: salary_history fk_salary_employment; Type: FK CONSTRAINT; Schema: employment; Owner: postgres
--

ALTER TABLE ONLY employment.salary_history
    ADD CONSTRAINT fk_salary_employment FOREIGN KEY (employment_id) REFERENCES employment.employment(employment_id);



--
-- Name: employment_verifications fk_verification_employer; Type: FK CONSTRAINT; Schema: employment; Owner: postgres
--

ALTER TABLE ONLY employment.employment_verifications
    ADD CONSTRAINT fk_verification_employer FOREIGN KEY (employer_id) REFERENCES public.employers(employer_id);



--
-- Name: employment_verifications fk_verification_employment; Type: FK CONSTRAINT; Schema: employment; Owner: postgres
--

ALTER TABLE ONLY employment.employment_verifications
    ADD CONSTRAINT fk_verification_employment FOREIGN KEY (employment_id) REFERENCES employment.employment(employment_id);



--
-- Name: followups fk_followup_trainee; Type: FK CONSTRAINT; Schema: followup; Owner: postgres
--

ALTER TABLE ONLY followup.followups
    ADD CONSTRAINT fk_followup_trainee FOREIGN KEY (trainee_id) REFERENCES public.trainees(trainee_id);



--
-- Name: followup_responses fk_response_followup; Type: FK CONSTRAINT; Schema: followup; Owner: postgres
--

ALTER TABLE ONLY followup.followup_responses
    ADD CONSTRAINT fk_response_followup FOREIGN KEY (followup_id) REFERENCES followup.followups(followup_id);



--
-- Name: followup_responses fk_response_status; Type: FK CONSTRAINT; Schema: followup; Owner: postgres
--

ALTER TABLE ONLY followup.followup_responses
    ADD CONSTRAINT fk_response_status FOREIGN KEY (current_employment_status_id) REFERENCES followup.employment_status(status_id);



--
-- Name: jobs fk_job_employer; Type: FK CONSTRAINT; Schema: jobs; Owner: postgres
--

ALTER TABLE ONLY jobs.jobs
    ADD CONSTRAINT fk_job_employer FOREIGN KEY (employer_id) REFERENCES public.employers(employer_id);



--
-- Name: job_skills fk_job_skill_job; Type: FK CONSTRAINT; Schema: jobs; Owner: postgres
--

ALTER TABLE ONLY jobs.job_skills
    ADD CONSTRAINT fk_job_skill_job FOREIGN KEY (job_id) REFERENCES jobs.jobs(job_id);



--
-- Name: job_skills fk_job_skill_skill; Type: FK CONSTRAINT; Schema: jobs; Owner: postgres
--

ALTER TABLE ONLY jobs.job_skills
    ADD CONSTRAINT fk_job_skill_skill FOREIGN KEY (skill_id) REFERENCES education.skills(skill_id);



--
-- Name: job_market_data fk_market_skill; Type: FK CONSTRAINT; Schema: jobs; Owner: postgres
--

ALTER TABLE ONLY jobs.job_market_data
    ADD CONSTRAINT fk_market_skill FOREIGN KEY (skill_id) REFERENCES education.skills(skill_id);



--
-- Name: training_effectiveness fk_effectiveness_course; Type: FK CONSTRAINT; Schema: planning; Owner: postgres
--

ALTER TABLE ONLY planning.training_effectiveness
    ADD CONSTRAINT fk_effectiveness_course FOREIGN KEY (course_id) REFERENCES training.courses(course_id);



--
-- Name: training_effectiveness fk_effectiveness_provider; Type: FK CONSTRAINT; Schema: planning; Owner: postgres
--

ALTER TABLE ONLY planning.training_effectiveness
    ADD CONSTRAINT fk_effectiveness_provider FOREIGN KEY (provider_id) REFERENCES public.training_providers(provider_id);



--
-- Name: whatif_scenarios fk_scenario_course; Type: FK CONSTRAINT; Schema: planning; Owner: postgres
--

ALTER TABLE ONLY planning.whatif_scenarios
    ADD CONSTRAINT fk_scenario_course FOREIGN KEY (target_course_id) REFERENCES training.courses(course_id);



--
-- Name: whatif_scenarios fk_scenario_skill; Type: FK CONSTRAINT; Schema: planning; Owner: postgres
--

ALTER TABLE ONLY planning.whatif_scenarios
    ADD CONSTRAINT fk_scenario_skill FOREIGN KEY (target_skill_id) REFERENCES education.skills(skill_id);



--
-- Name: employers fk_employer_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employers
    ADD CONSTRAINT fk_employer_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);



--
-- Name: training_providers fk_provider_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_providers
    ADD CONSTRAINT fk_provider_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);



--
-- Name: trainees fk_trainee_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trainees
    ADD CONSTRAINT fk_trainee_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);



--
-- Name: assessments fk_assessment_enrollment; Type: FK CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.assessments
    ADD CONSTRAINT fk_assessment_enrollment FOREIGN KEY (enrollment_id) REFERENCES training.enrollments(enrollment_id);



--
-- Name: attendance fk_attendance_enrollment; Type: FK CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.attendance
    ADD CONSTRAINT fk_attendance_enrollment FOREIGN KEY (enrollment_id) REFERENCES training.enrollments(enrollment_id);



--
-- Name: certificates fk_certificate_enrollment; Type: FK CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.certificates
    ADD CONSTRAINT fk_certificate_enrollment FOREIGN KEY (enrollment_id) REFERENCES training.enrollments(enrollment_id);



--
-- Name: courses fk_course_provider; Type: FK CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.courses
    ADD CONSTRAINT fk_course_provider FOREIGN KEY (provider_id) REFERENCES public.training_providers(provider_id);



--
-- Name: enrollments fk_enrollment_course; Type: FK CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.enrollments
    ADD CONSTRAINT fk_enrollment_course FOREIGN KEY (course_id) REFERENCES training.courses(course_id);



--
-- Name: enrollments fk_enrollment_trainee; Type: FK CONSTRAINT; Schema: training; Owner: postgres
--

ALTER TABLE ONLY training.enrollments
    ADD CONSTRAINT fk_enrollment_trainee FOREIGN KEY (trainee_id) REFERENCES public.trainees(trainee_id);


-- Completed on 2026-09-11 20:08:10

--
-- PostgreSQL database dump complete
--


