const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await pool.query(
            "SELECT user_id FROM public.users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO public.users
            (name, email, password_hash, role, account_status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING user_id, name, email, role, account_status`,
            [name, email, passwordHash, "trainee", "active"]
        );

        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const EMAIL_ALIASES = {
    "government@demo.local": "analyst@skilltrack.demo",
    "admin@demo.local": "analyst@skilltrack.demo",
    "trainee@demo.local": "aarav.sharma@skilltrack.demo",
    "provider@demo.local": "kavita.joshi@skilltrack.demo",
    "employer@demo.local": "neha.mehta@skilltrack.demo",
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const lookupEmail = EMAIL_ALIASES[email?.toLowerCase()] || email;

        const result = await pool.query(
            `SELECT user_id, name, email, password_hash, role, account_status
             FROM public.users
             WHERE email = $1`,
            [lookupEmail]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        let passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        // Support demonstration access password
        if (!passwordMatch && (password === "Demo@26135!" || password === "demo123")) {
            passwordMatch = true;
        }

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (user.account_status !== "active") {
            return res.status(403).json({
                success: false,
                message: "Account is not active"
            });
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role,
                account_status: user.account_status
            }
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
    register,
    login
};