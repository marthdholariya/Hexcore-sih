const pool = require("../config/db");

const getAnalytics = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM analytics.v_prediction_summary
        `);

        res.json({
            success: true,
            message: "Analytics data fetched successfully",
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
    getAnalytics
};