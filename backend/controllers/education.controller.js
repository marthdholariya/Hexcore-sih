const pool = require("../config/db");

const getEducation = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT e.*
             FROM education.education e
             JOIN public.trainees t
             ON e.trainee_id = t.trainee_id
             WHERE t.user_id = $1
             ORDER BY e.education_id`,
            [req.user.user_id]
        );

        res.json({
            success: true,
            message: "Education data fetched successfully",
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
    getEducation
};