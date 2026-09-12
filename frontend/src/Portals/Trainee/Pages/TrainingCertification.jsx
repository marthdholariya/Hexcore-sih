import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

export default function TrainingCertifications() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const savedSession = localStorage.getItem("maha_user_session");

        if (!savedSession) {
          throw new Error("Session not found. Please login again.");
        }

        const session = JSON.parse(savedSession);

        if (!session.token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(`${API_BASE}/api/training`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.token}`,
            "Content-Type": "application/json",
          },
        });

        const body = await response.json();

        if (!response.ok) {
          throw new Error(
            body.message || "Failed to fetch training data."
          );
        }

        setCourses(body.data || []);
      } catch (err) {
        console.error("Training error:", err);
        setError(err.message || "Unable to load training data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm font-semibold text-slate-500">
          Loading training data...
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Training & Certifications
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Track your active training courses and certification information.
          </p>
        </div>

        <button
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto"
          onClick={() => window.location.href = "/trainee/passport"}
        >
          👁️ View Skill Passport
        </button>
      </div>

      {/* Course Statistics */}
      {(() => {
        const allCertificates = courses.flatMap((c) => c.certificates || []);
        const totalCertificates = allCertificates.length;
        const activeCount = courses.filter((c) => {
          const s = (c.completion_status || c.course_status || c.status || "").toLowerCase();
          return s === "active" || s === "in progress";
        }).length;
        const completedCount = courses.filter((c) => {
          const s = (c.completion_status || c.course_status || c.status || "").toLowerCase();
          return s === "completed";
        }).length;

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Courses */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Total Enrolled Courses
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {courses.length}
              </p>
              <p className="text-[11px] font-medium text-slate-500 mt-2">
                Courses linked to your profile
              </p>
            </div>

            {/* Active Courses */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active / In-Progress
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {activeCount}
              </p>
              <p className="text-[11px] font-medium text-emerald-600 mt-2">
                ✓ Currently training
              </p>
            </div>

            {/* Completed */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Completed Courses
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {completedCount}
              </p>
              <p className="text-[11px] font-medium text-slate-500 mt-2">
                Successfully finished
              </p>
            </div>

            {/* Certifications */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Verified Certificates
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {totalCertificates}
              </p>
              <p className="text-[11px] font-medium text-indigo-600 mt-2">
                ✓ Official verified credentials
              </p>
            </div>
          </div>
        );
      })()}

      {/* Training Courses */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">

        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              🎓 My Training Courses
            </h2>

            <p className="text-[11px] text-slate-500 mt-1">
              Training records fetched from the backend.
            </p>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            {courses.length} Course{courses.length !== 1 ? "s" : ""}
          </span>

        </div>

        {courses.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">
            No training records found.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {courses.map((course) => (
              <div
                key={course.course_id}
                className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200/70 space-y-4"
              >

                {/* Course Header */}
                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-start space-x-3">

                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                      💻
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {course.course_name}
                      </h3>

                      <p className="text-[11px] text-slate-500 mt-1">
                        {course.description}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                      (course.completion_status || course.status)?.toLowerCase() === "completed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                    }`}
                  >
                    • {course.completion_status || course.status}
                  </span>

                </div>

                {/* Course Information */}
                <div className="grid grid-cols-2 gap-3">

                  <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Sector
                    </p>

                    <p className="text-xs font-bold text-slate-900 mt-1">
                      {course.sector || "Not available"}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Job Role
                    </p>

                    <p className="text-xs font-bold text-slate-900 mt-1">
                      {course.job_role || "Not available"}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Duration
                    </p>

                    <p className="text-xs font-bold text-slate-900 mt-1">
                      {course.duration || "Not available"}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Course Level
                    </p>

                    <p className="text-xs font-bold text-slate-900 mt-1">
                      {course.course_level || "Not available"}
                    </p>
                  </div>

                </div>

                {/* Provider */}
                <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Training Provider
                  </p>
                  <p className="text-xs font-bold text-slate-800 mt-1">
                    {course.provider_name || course.provider_id || "SkillForge Training Centre"}
                    {course.provider_district && (
                      <span className="text-[10px] font-normal text-slate-500 ml-1.5">
                        ({course.provider_district})
                      </span>
                    )}
                  </p>
                </div>

                {/* Linked Certificates */}
                {course.certificates && course.certificates.length > 0 && (
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <span>🎓</span>
                      <span>Verified Certificate Issued</span>
                    </p>
                    {course.certificates.map((cert) => (
                      <div key={cert.certificate_id} className="flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-900">{cert.certificate_name}</p>
                          <p className="text-[10px] font-mono text-slate-500">
                            ID: {cert.certificate_number} • Issued: {cert.issue_date}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                          ✓ {cert.verification_status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Course ID */}
                <div className="pt-2 border-t border-slate-200/70">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Course ID
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 mt-1 break-all">
                    {course.course_id}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Data Not Available Yet */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">

        <h3 className="text-sm font-bold text-slate-900">
          📋 Additional Training Information
        </h3>

        <p className="text-xs text-slate-600 mt-1">
          Attendance, syllabus progress, assessments, evaluations and
          certificates will appear here once their respective backend APIs
          are connected.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">

          <div className="bg-white/70 border border-amber-100 rounded-xl p-3">
            <p className="text-[10px] font-bold text-slate-400">
              Attendance
            </p>
            <p className="text-xs font-bold text-slate-700 mt-1">
              API Required
            </p>
          </div>

          <div className="bg-white/70 border border-amber-100 rounded-xl p-3">
            <p className="text-[10px] font-bold text-slate-400">
              Syllabus
            </p>
            <p className="text-xs font-bold text-slate-700 mt-1">
              API Required
            </p>
          </div>

          <div className="bg-white/70 border border-amber-100 rounded-xl p-3">
            <p className="text-[10px] font-bold text-slate-400">
              Assessments
            </p>
            <p className="text-xs font-bold text-slate-700 mt-1">
              API Required
            </p>
          </div>

          <div className="bg-white/70 border border-amber-100 rounded-xl p-3">
            <p className="text-[10px] font-bold text-slate-400">
              Certificates
            </p>
            <p className="text-xs font-bold text-slate-700 mt-1">
              API Required
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}