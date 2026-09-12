import React, { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";

const API_BASE = "http://localhost:5000";

export default function Dashboard() {
  const { user } = useAuth();

  const [training, setTraining] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [followups, setFollowups] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const savedSession = localStorage.getItem("maha_user_session");

        if (!savedSession) {
          throw new Error("Session not found. Please login again.");
        }

        const session = JSON.parse(savedSession);

        if (!session.token) {
          throw new Error("Authentication token not found.");
        }

        const headers = {
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "application/json",
        };

        const [trainingResponse, employmentResponse, followupResponse] =
          await Promise.all([
            fetch(`${API_BASE}/api/training`, {
              method: "GET",
              headers,
            }),
            fetch(`${API_BASE}/api/employment`, {
              method: "GET",
              headers,
            }),
            fetch(`${API_BASE}/api/followups`, {
              method: "GET",
              headers,
            }),
          ]);

        const trainingBody = await trainingResponse.json();
        const employmentBody = await employmentResponse.json();
        const followupBody = await followupResponse.json();

        if (!trainingResponse.ok) {
          throw new Error(
            trainingBody.message || "Failed to fetch training data."
          );
        }

        if (!employmentResponse.ok) {
          throw new Error(
            employmentBody.message || "Failed to fetch employment data."
          );
        }

        if (!followupResponse.ok) {
          throw new Error(
            followupBody.message || "Failed to fetch follow-up data."
          );
        }

        setTraining(trainingBody.data || []);
        setEmployment(employmentBody.data || []);
        setFollowups(followupBody.data || []);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message || "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const currentTraining = training[0] || null;
  const currentJob = employment[0] || null;
  const latestFollowup = followups[followups.length - 1] || null;

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const trainingStatus = currentTraining
    ? currentTraining.status
        ?.charAt(0)
        .toUpperCase() +
      currentTraining.status?.slice(1).toLowerCase()
    : "No Training";

  const employmentStatus = currentJob?.employment_status || "Not Employed";

  const followupDue =
    latestFollowup && latestFollowup.status?.toLowerCase() !== "completed";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm font-semibold text-slate-500">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-slate-800">

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Welcome Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold mb-3">
          <span>🛡️ MSSDS Unified Trainee Portal</span>
        </div>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Welcome back, {user?.name || "Trainee"}!
        </h1>

        <p className="text-xs text-slate-500 mt-1 font-medium">
          MSSDS Unified Trainee Portal • Maharashtra State Skill Development
          Society
        </p>

        <p className="text-[10px] text-slate-400 mt-2">
          User ID: {user?.user_id || "Not available"}
        </p>
      </div>

      {/* Follow-up Banner */}
      {latestFollowup && (
        <div
          className={`${
            followupDue
              ? "bg-amber-50/70 border-amber-200"
              : "bg-emerald-50/70 border-emerald-200"
          } border rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
        >
          <div className="flex items-start space-x-3.5">
            <div
              className={`w-10 h-10 rounded-xl ${
                followupDue ? "bg-amber-500" : "bg-emerald-500"
              } text-white flex items-center justify-center shrink-0 font-bold shadow-xs`}
            >
              {followupDue ? "⏱️" : "✓"}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {followupDue
                    ? "Employment Follow-up Due"
                    : "Employment Follow-up Completed"}
                </h3>

                <span
                  className={`px-2 py-0.5 rounded-md ${
                    followupDue
                      ? "bg-amber-200/80 text-amber-900"
                      : "bg-emerald-200/80 text-emerald-900"
                  } text-[10px] font-black uppercase tracking-wider`}
                >
                  {latestFollowup.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-0.5">
                {latestFollowup.milestone_month}-Month Employment Follow-up
                {" • "}
                Scheduled: {formatDate(latestFollowup.scheduled_date)}
              </p>
            </div>
          </div>

          {followupDue && (
            <button className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0">
              Complete Survey Now →
            </button>
          )}
        </div>
      )}

      {/* Training & Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Training Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-sm font-bold text-slate-900">
                🎓 Current Training
              </h2>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                • {trainingStatus}
              </span>
            </div>

            {currentTraining ? (
              <>
                <h3 className="text-lg font-bold text-slate-900">
                  {currentTraining.course_name}
                </h3>

                <p className="text-xs text-slate-500 font-medium mt-1">
                  Job Role:{" "}
                  <span className="text-slate-700 font-semibold">
                    {currentTraining.job_role || "Not available"}
                  </span>
                </p>

                <div className="grid grid-cols-2 gap-4 my-5">

                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Sector
                    </p>

                    <p className="text-base font-black text-slate-900 mt-0.5">
                      {currentTraining.sector || "Not available"}
                    </p>

                    <span className="inline-block mt-1 text-[9px] font-extrabold px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded border border-indigo-200">
                      {currentTraining.course_level || "Level not available"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Duration
                    </p>

                    <p className="text-xl font-black text-slate-900 mt-0.5">
                      {currentTraining.duration || "N/A"}
                    </p>

                    <p className="text-[10px] font-semibold text-slate-500 mt-1">
                      Course duration
                    </p>
                  </div>

                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                    <span>Course Status</span>
                    <span className="text-slate-800">
                      {trainingStatus}
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-2 rounded-full w-full"></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-10 text-center text-sm text-slate-500">
                No training record found.
              </div>
            )}
          </div>
        </div>

        {/* Job Status Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-sm font-bold text-slate-900">
                💼 Current Job Status
              </h2>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  currentJob
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-50 text-slate-500 border border-slate-200"
                }`}
              >
                {currentJob ? "✓" : "•"} {employmentStatus}
              </span>
            </div>

            {currentJob ? (
              <>
                <h3 className="text-lg font-bold text-slate-900">
                  {currentJob.job_role || "Job role not available"}
                </h3>

                <p className="text-xs text-slate-500 font-medium mt-1">
                  Start Date:{" "}
                  <span className="text-slate-700 font-semibold">
                    {formatDate(currentJob.joining_date)}
                  </span>
                </p>

                <div className="grid grid-cols-2 gap-4 my-5">

                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Location
                    </p>

                    <p className="text-base font-bold text-slate-900 mt-0.5">
                      {currentJob.location || "Not available"}
                    </p>

                    <span className="inline-block mt-1 text-[9px] font-extrabold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                      ✓ Training Related:{" "}
                      {currentJob.training_related ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Employment Type
                    </p>

                    <p className="text-base font-bold text-slate-900 mt-0.5">
                      {currentJob.employment_type || "Not available"}
                    </p>

                    <p className="text-[10px] font-semibold text-slate-500 mt-1">
                      Status: {currentJob.employment_status || "N/A"}
                    </p>
                  </div>

                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-500 mb-1">
                    Active Employment
                  </p>

                  <div
                    className={`w-full h-2 rounded-full ${
                      currentJob.employment_status?.toLowerCase() ===
                      "employed"
                        ? "bg-emerald-500"
                        : "bg-slate-300"
                    }`}
                  ></div>
                </div>
              </>
            ) : (
              <div className="py-10 text-center text-sm text-slate-500">
                No employment record found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI / Information Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">

          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
            💡
          </div>

          <div>
            <h3 className="text-sm font-bold text-indigo-950">
              Training & Employment Overview
            </h3>

            <p className="text-xs text-indigo-800/80 mt-0.5">
              {currentTraining
                ? `You are enrolled in ${currentTraining.course_name}${
                    currentJob
                      ? ` and currently employed as ${currentJob.job_role}.`
                      : "."
                  }`
                : "No active training information is currently available."}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}