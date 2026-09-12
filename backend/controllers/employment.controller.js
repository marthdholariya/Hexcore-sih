const pool = require("../config/db");

const getEmployment = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT e.*
             FROM employment.employment e
             JOIN public.trainees t
             ON e.trainee_id = t.trainee_id
             WHERE t.user_id = $1
             ORDER BY e.employment_id`,
            [req.user.user_id]
        );

        res.json({
            success: true,
            message: "Employment data fetched successfully",
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
    getEmployment
};