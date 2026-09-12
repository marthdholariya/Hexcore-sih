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

const allowedOrigins = ['http://localhost:5174','https://your-vercel-frontend.vercel.app'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
}));

// Ensure CORS header matches request origin (fallback to '*')
app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  if (requestOrigin) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

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