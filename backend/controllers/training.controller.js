const pool = require("../config/db");

const getTraining = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT c.*
             FROM training.courses c
             JOIN training.enrollments e
             ON c.course_id = e.course_id
             JOIN public.trainees t
             ON e.trainee_id = t.trainee_id
             WHERE t.user_id = $1`,
            [req.user.user_id]
        );

        res.json({
            success: true,
            message: "Training data fetched successfully",
            data: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    getTraining
};