const pool = require("../config/db");

const getTraining = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                c.course_id,
                c.course_name,
                c.description,
                c.sector,
                c.job_role,
                c.duration,
                c.course_level,
                c.status AS course_status,
                c.provider_id,
                e.enrollment_id,
                e.enrollment_date,
                e.start_date,
                e.end_date,
                COALESCE(e.completion_status, c.status) AS completion_status,
                e.completion_date,
                tp.name AS provider_name,
                tp.district AS provider_district,
                COALESCE(
                    (
                        SELECT json_agg(
                            json_build_object(
                                'certificate_id', cert.certificate_id,
                                'certificate_name', cert.certificate_name,
                                'certificate_number', cert.certificate_number,
                                'issue_date', cert.issue_date,
                                'issuing_organization', cert.issuing_organization,
                                'verification_status', cert.verification_status,
                                'certificate_url', cert.certificate_url
                            )
                        )
                        FROM training.certificates cert
                        WHERE cert.enrollment_id = e.enrollment_id
                    ),
                    '[]'::json
                ) AS certificates
            FROM training.courses c
            JOIN training.enrollments e ON c.course_id = e.course_id
            JOIN public.trainees t ON e.trainee_id = t.trainee_id
            LEFT JOIN public.training_providers tp ON c.provider_id = tp.provider_id
            WHERE t.user_id = $1
            ORDER BY e.start_date DESC NULLS LAST`,
            [req.user.user_id]
        );

        res.json({
            success: true,
            message: "Training data fetched successfully",
            data: result.rows
        });

    } catch (error) {
        console.error("Training error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    getTraining
};