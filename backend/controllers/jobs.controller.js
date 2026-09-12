const pool = require("../config/db");

const getJobs = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM jobs.jobs
             ORDER BY job_id`
        );

        res.json({
            success: true,
            message: "Jobs fetched successfully",
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
    getJobs
};