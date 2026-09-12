const pool = require("../config/db");

const getUsers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT user_id, name, email, phone, role, account_status, created_at, updated_at
             FROM public.users
             ORDER BY created_at DESC`
        );

        res.json({
            success: true,
            message: "Users fetched successfully",
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
    getUsers
};