const pool = require("../config/db");

const getFollowups = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT f.*
             FROM followup.followups f
             JOIN public.trainees t
             ON f.trainee_id = t.trainee_id
             WHERE t.user_id = $1
             ORDER BY f.scheduled_date`,
            [req.user.user_id]
        );

        res.json({
            success: true,
            message: "Follow-up data fetched successfully",
            data: result.rows
        });

    } catch (error) {
        console.error("Follow-up error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    getFollowups
};