const pool = require("../config/db");

const getPlanning = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM planning.training_effectiveness
             ORDER BY effectiveness_id`
        );

        res.json({
            success: true,
            message: "Planning data fetched successfully",
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
    getPlanning
};