import React, { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";

const API_BASE = "http://localhost:5000";

export default function MyProfile() {
  const { user } = useAuth();

  const [education, setEducation] = useState([]);
  const [employment, setEmployment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
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

        const [educationResponse, employmentResponse] = await Promise.all([
          fetch(`${API_BASE}/api/education`, {
            method: "GET",
            headers,
          }),
          fetch(`${API_BASE}/api/employment`, {
            method: "GET",
            headers,
          }),
        ]);

        const educationBody = await educationResponse.json();
        const employmentBody = await employmentResponse.json();

        if (!educationResponse.ok) {
          throw new Error(
            educationBody.message || "Failed to fetch education data."
          );
        }

        if (!employmentResponse.ok) {
          throw new Error(
            employmentBody.message || "Failed to fetch employment data."
          );
        }

        setEducation(educationBody.data || []);
        setEmployment(employmentBody.data || []);
      } catch (err) {
        console.error("Profile error:", err);
        setError(err.message || "Unable to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  };

  const formatDateRange = (start, end) => {
    return `${formatDate(start)} – ${formatDate(end)}`;
  };

  const currentEmployment = employment[0] || null;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "TR";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm font-semibold text-slate-500">
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 font-sans text-slate-800">

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        <div className="flex items-center space-x-4">

          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            {initials}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900">
                {user?.name || "Trainee"}
              </h1>

              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                {user?.user_id || "ID unavailable"}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              📍 Maharashtra
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">

          <button
            onClick={() => alert("Edit Profile feature coming soon")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
          >
            <span>✏️</span>
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs transition-all shadow-xs"
            title="Print Profile"
          >
            🖨️
          </button>

        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Personal Details */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">

            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span>🪪</span>
              <span>Personal Details</span>
            </h2>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              ✓ Account Active
            </span>

          </div>

          <div className="space-y-3.5 text-xs">

            {/* Name */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Full Name
              </label>

              <input
                type="text"
                readOnly
                value={user?.name || ""}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-slate-500">
                  Email Address
                </label>

                <span className="text-[10px] text-emerald-600 font-bold">
                  ✓ Verified
                </span>
              </div>

              <input
                type="text"
                readOnly
                value={user?.email || ""}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Account Role
              </label>

              <input
                type="text"
                readOnly
                value={user?.role || "trainee"}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Account Status */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Account Status
              </label>

              <input
                type="text"
                readOnly
                value={user?.account_status || "active"}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none capitalize"
              />
            </div>

          </div>
        </div>

        {/* Education */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">

          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">

            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span>🎓</span>
              <span>Education & Academic History</span>
            </h2>

          </div>

          <div className="space-y-3">

            {education.length > 0 ? (
              education.map((item) => (
                <div
                  key={item.education_id}
                  className="p-3.5 bg-slate-50/70 border border-slate-200/70 rounded-xl space-y-1.5"
                >

                  <div className="flex items-start justify-between gap-2">

                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {item.qualification}
                    </h3>

                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
                      Education
                    </span>

                  </div>

                  <p className="text-[11px] font-semibold text-slate-700">
                    {item.field_of_study || "Field not available"}
                  </p>

                  <p className="text-[10px] text-slate-500">
                    {item.institution || "Institution not available"}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/40 text-[10px]">

                    <span className="text-slate-400 font-medium">
                      📅 {formatDateRange(item.start_date, item.end_date)}
                    </span>

                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.grade_percentage}%
                    </span>

                  </div>

                </div>
              ))
            ) : (
              <div className="py-10 text-center text-sm text-slate-500">
                No education records found.
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Employment */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">

        <div className="flex items-center justify-between border-b border-slate-100 pb-3">

          <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <span>💼</span>
            <span>Employment Status</span>
          </h2>

          {currentEmployment && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
              <span>• Employment Record Found</span>
            </span>
          )}

        </div>

        {currentEmployment ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">

                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Employment Status
                </p>

                <p className="text-xs font-bold text-slate-900 mt-1">
                  {currentEmployment.employment_status ||
                    "Not available"}
                </p>

              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">

                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Job Role
                </p>

                <p className="text-xs font-bold text-slate-900 mt-1">
                  {currentEmployment.job_role ||
                    "Not available"}
                </p>

              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">

                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Joining Date
                </p>

                <p className="text-xs font-bold text-slate-900 mt-1">
                  {formatDate(currentEmployment.joining_date)}
                </p>

              </div>

            </div>

            <div className="text-right pt-1">

              <a
                href="/trainee/employment"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                View Full Records in Employment & Evidence →
              </a>

            </div>
          </>
        ) : (
          <div className="py-8 text-center text-sm text-slate-500">
            No employment record found.
          </div>
        )}

      </div>

    </div>
  );
}