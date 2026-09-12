const pool = require("../config/db");

const getEmployment = async (req, res) => {
    try {
        const result = await pool.query(
            `
            SELECT
                e.employment_id,
                e.trainee_id,
                e.employer_id,
                e.job_role,
                e.joining_date,
                e.leaving_date,
                e.employment_type,
                e.location,
                e.training_related,
                e.employment_status,

                emp.company_name,
                emp.industry_sector,
                emp.address AS employer_address,
                emp.district AS employer_district,
                emp.state AS employer_state,

                sh.salary_amount,
                sh.effective_date AS salary_effective_date,
                sh.salary_type,
                sh.source AS salary_source,

                v.verification_id,
                v.verified_role,
                v.verified_joining_date,
                v.verified_status,
                v.verification_date,
                v.verified_by,

                COALESCE(
                    (
                        SELECT json_agg(
                            json_build_object(
                                'evidence_id', ee.evidence_id,
                                'evidence_type', ee.evidence_type,
                                'evidence_url', ee.evidence_url,
                                'upload_date', ee.upload_date,
                                'verification_status', ee.verification_status,
                                'reviewer', ee.reviewer,
                                'review_date', ee.review_date,
                                'comments', ee.comments
                            )
                            ORDER BY ee.upload_date DESC
                        )
                        FROM employment.employment_evidence ee
                        WHERE ee.employment_id = e.employment_id
                    ),
                    '[]'::json
                ) AS evidence

            FROM employment.employment e

            JOIN public.trainees t
                ON e.trainee_id = t.trainee_id

            LEFT JOIN public.employers emp
                ON e.employer_id = emp.employer_id

            LEFT JOIN LATERAL (
                SELECT
                    salary_amount,
                    effective_date,
                    salary_type,
                    source
                FROM employment.salary_history
                WHERE employment_id = e.employment_id
                ORDER BY effective_date DESC NULLS LAST
                LIMIT 1
            ) sh ON TRUE

            LEFT JOIN LATERAL (
                SELECT
                    verification_id,
                    verified_role,
                    verified_joining_date,
                    verified_status,
                    verification_date,
                    verified_by
                FROM employment.employment_verifications
                WHERE employment_id = e.employment_id
                ORDER BY verification_date DESC NULLS LAST
                LIMIT 1
            ) v ON TRUE

            WHERE t.user_id = $1

            ORDER BY
                e.leaving_date IS NULL DESC,
                e.joining_date DESC
            `,
            [req.user.user_id]
        );

        res.json({
            success: true,
            message: "Employment data fetched successfully",
            data: result.rows
        });

    } catch (error) {
        console.error("Employment error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    getEmployment
};