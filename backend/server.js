const cors = require("cors");
const express = require("express");
const pool = require("./config/db");
const userRoutes = require("./routes/user.routes");
const educationRoutes = require("./routes/education.routes");
const trainingRoutes = require("./routes/training.routes");
const employmentRoutes = require("./routes/employment.routes");
const followupRoutes = require("./routes/followup.routes");
const jobsRoutes = require("./routes/jobs.routes");
const planningRoutes = require("./routes/planning.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000"
    ],
    credentials: true
}));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/employment", employmentRoutes);
app.use("/api/followup", followupRoutes);
app.use("/api/followups", followupRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/planning", planningRoutes);
app.use("/api/analytics", analyticsRoutes);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("SIH 26135 Backend is Running!");
});

app.get("/api/health", (req, res) => {
    res.json({ status: "OK", service: "SIH 26135 Backend" });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

pool.query("SELECT NOW()", (error, result) => {
    if (error) {
        console.error("Database connection failed:", error.message);
    } else {
        console.log("Database connected successfully!");
    }
});