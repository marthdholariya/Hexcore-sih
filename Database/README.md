# SkillTrack Database

PostgreSQL database package for the **SkillTrack / SIH26135** project.

This package was recovered from the existing PostgreSQL database dump `hexcore_full.sql`, so the SQL definitions are based on the database that was already built and verified rather than being manually guessed.

## Database Summary

| Item | Verified value |
|---|---:|
| Database | `skilltrack_db` |
| PostgreSQL | 18.6 dump |
| Schemas | 8 |
| Tables | 30 |
| Foreign-key relationships | 34 |
| Analytics views | 37 |
| Seed/data blocks | 30 |

### Schemas

- `public` — users, trainees, employers, training providers
- `education` — education and skill information
- `training` — courses, enrollments, attendance, assessments, certificates
- `jobs` — jobs, job-skill requirements, market data
- `employment` — employment records, salary, verification, evidence
- `followup` — follow-up tracking and status/reason reference data
- `analytics` — predictions, recommendations, skill-gap analysis, analytical views
- `planning` — training effectiveness, what-if scenarios, data-quality issues

## Repository Files

```text
database/
├── schema.sql
├── seed.sql
├── analytics_views.sql
└── README.md
```

### `schema.sql`

Contains the recovered database structure:

- 8 schemas
- pgcrypto extension
- 30 tables
- primary keys
- unique constraints
- 34 foreign keys
- original column types/defaults/nullability from the dump

The analytics views are intentionally kept in `analytics_views.sql` so the repository has a clean separation between base schema and analytical layer.

### `seed.sql`

Contains the demo/sample data currently present in the recovered database. It contains 30 `COPY` data blocks with the following verified row counts:

| Schema | Table | Rows |
|---|---|---:|
| analytics | predictions | 6 |
| analytics | recommendations | 6 |
| analytics | skill_gap_analysis | 6 |
| education | education | 6 |
| education | skills | 12 |
| education | trainee_skills | 20 |
| employment | employment | 6 |
| employment | employment_evidence | 6 |
| employment | employment_verifications | 6 |
| employment | salary_history | 6 |
| followup | attrition_reasons | 6 |
| followup | employment_status | 5 |
| followup | followup_responses | 5 |
| followup | followups | 6 |
| followup | non_placement_reasons | 6 |
| jobs | job_market_data | 12 |
| jobs | job_skills | 25 |
| jobs | jobs | 9 |
| planning | data_quality_issues | 5 |
| planning | training_effectiveness | 6 |
| planning | whatif_scenarios | 5 |
| public | employers | 3 |
| public | trainees | 6 |
| public | training_providers | 2 |
| public | users | 12 |
| training | assessments | 12 |
| training | attendance | 16 |
| training | certificates | 7 |
| training | courses | 6 |
| training | enrollments | 8 |

The seed data is **demo data**, not production data.

### `analytics_views.sql`

Contains all **37 recovered analytics views**, including employment, training, skill-gap, job matching, follow-up, prediction, recommendation, and data-quality views.

## Installation

Create the database first:

```sql
CREATE DATABASE skilltrack_db;
```

Connect to `skilltrack_db`, then run the files in this order:

```text
1. schema.sql
2. seed.sql
3. analytics_views.sql
```

For example with `psql`:

```bash
psql -d skilltrack_db -f database/schema.sql
psql -d skilltrack_db -f database/seed.sql
psql -d skilltrack_db -f database/analytics_views.sql
```

If the database already exists and already contains these objects, **do not run the setup files against it** unless you intend to recreate/restore the database. These files are intended primarily for setting up another copy of the project database.

## Verification

The recovered database was previously checked against the project baseline:

- 30 tables present
- 34 foreign-key relationships present
- no orphan records across the verified foreign keys
- duplicate/uniqueness checks passed
- logical consistency checks passed
- trainee coverage for education, skills, training, employment, and follow-up was 100%
- jobs with skill requirements: 9/9
- courses with effectiveness records: 6/6
- 37 analytics views were present

The sample database also produced the previously verified headline demo metrics, including:

- Employment rate: **100.00%** (6/6)
- Training completion rate: **87.50%** (7/8)
- Average starting salary: **₹475,000/year**
- Training-related employment: **100.00%** (6/6)
- Average attendance: **89.38%**
- Average assessment percentage: **81.08%**

These figures describe the supplied demo dataset and should not be presented as real-world outcomes.

## Security

Do not commit:

- `.env` files
- PostgreSQL passwords
- API keys
- production credentials
- real employment evidence/documents
- private user information

If demo credentials are used by the application, keep them clearly marked as development/demo credentials and replace them before production deployment.

## Backend Integration

The backend should connect to PostgreSQL through environment variables rather than hard-coded credentials. A typical development configuration is:

```text
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skilltrack_db
DB_USER=<your_local_user>
DB_PASSWORD=<your_local_password>
```

The backend can then expose API endpoints over the database layer for the React frontend and analytics/AI modules.

## Development Notes

The database is organized around the project's main data flow:

```text
Users / Trainees
      ↓
Education & Skills
      ↓
Training & Certification
      ↓
Jobs & Employment
      ↓
Follow-up & Verification
      ↓
Analytics / Predictions / Recommendations
      ↓
Planning & Government Dashboard
```

The `analytics` views provide reusable SQL-level datasets for dashboards, KPI calculations, skill-gap analysis, job matching, follow-up analysis, prediction summaries, recommendations, and data-quality monitoring.

## Important

`hexcore_full.sql` was the source dump used to recover these files. The generated repository files intentionally omit PostgreSQL dump-control metadata and ownership statements such as `ALTER ... OWNER TO postgres` to make the project files more portable between PostgreSQL installations. The table definitions, constraints, foreign keys, data, and analytics view SQL are taken from the dump itself.
