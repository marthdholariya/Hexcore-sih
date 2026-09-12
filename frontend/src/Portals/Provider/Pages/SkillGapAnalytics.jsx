import React, { useState } from 'react';

// Mock Data mapped to ER Diagram: training + analytics schemas
const MOCK_PROVIDER_DATA = {
  // Schema: training (courses, enrollments, attendance, assessments)
  courses: [
    {
      course_id: "crs-2026-101",
      course_name: "Full-Stack Web Development",
      sector: "IT-ITeS",
      job_role: "Full Stack Developer",
      total_enrolled: 48,
      avg_attendance: "89.5%",
      completion_rate: "76%",
      assessments_passed: "42/48 Trainees"
    },
    {
      course_id: "crs-2026-102",
      course_name: "Cloud Infrastructure & DevOps",
      sector: "IT-ITeS",
      job_role: "DevOps Engineer",
      total_enrolled: 32,
      avg_attendance: "92.0%",
      completion_rate: "81%",
      assessments_passed: "28/32 Trainees"
    }
  ],

  // Schema: analytics (skill_gap_analysis) - Provider View across Batch Trainees
  batchSkillGaps: [
    {
      gap_id: "gap-provider-01",
      skill_name: "Docker & Containerization",
      job_title: "Full Stack Developer",
      affected_trainees: 18,
      total_trainees: 48,
      gap_severity: "High Gap",
      recommended_action: "Schedule 2 additional hands-on lab sessions"
    },
    {
      gap_id: "gap-provider-02",
      skill_name: "React State Management (Redux)",
      job_title: "Full Stack Developer",
      affected_trainees: 11,
      total_trainees: 48,
      gap_severity: "Moderate Gap",
      recommended_action: "Assign Module 3 practical retake"
    },
    {
      gap_id: "gap-provider-03",
      skill_name: "PostgreSQL Schema Optimization",
      job_title: "Full Stack Developer",
      affected_trainees: 3,
      total_trainees: 48,
      gap_severity: "Low Gap",
      recommended_action: "Optional self-paced learning material"
    }
  ],

  // Schema: analytics (predictions & training_effectiveness)
  analyticsSummary: {
    predicted_placement_rate: "84.2%",
    risk_level: "Low Risk",
    overall_effectiveness_score: 8.7,
    key_bottleneck: "DevOps & Deployment Modules"
  }
};

export default function ProviderTrainingCertification() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'skillGaps'
  const [selectedCourse, setSelectedCourse] = useState(MOCK_PROVIDER_DATA.courses[0]);

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800/50">
            Provider Management • Schema: training & analytics
          </span>
          <h1 className="text-xl font-bold mt-2">Training Performance & Skill Gap Analytics</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor course effectiveness, review batch-wide skill gaps, and address placement bottlenecks.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎓 Training Overview
          </button>
          <button
            onClick={() => setActiveTab('skillGaps')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'skillGaps' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📈 Batch Skill Gap Analytics
          </button>
        </div>
      </div>

      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Active Enrolled Trainees</p>
          <p className="text-xl font-black text-slate-900 mt-1">80 Trainees</p>
          <p className="text-[10px] text-slate-500">Across 2 Active Batches</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Predicted Placement Rate</p>
          <p className="text-xl font-black text-emerald-600 mt-1">{MOCK_PROVIDER_DATA.analyticsSummary.predicted_placement_rate}</p>
          <p className="text-[10px] text-emerald-700 font-bold">AI Model: Low Risk</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Skill Gaps Identified</p>
          <p className="text-xl font-black text-amber-500 mt-1">3 Key Gaps</p>
          <p className="text-[10px] text-amber-700 font-bold">1 High Severity Gap</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Training Effectiveness</p>
          <p className="text-xl font-black text-indigo-600 mt-1">{MOCK_PROVIDER_DATA.analyticsSummary.overall_effectiveness_score} / 10</p>
          <p className="text-[10px] text-slate-500">Based on assessment outputs</p>
        </div>
      </div>

      {activeTab === 'overview' ? (
        /* TAB 1: Training Overview & Course Management */
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Active Courses & Completion Tracking (`courses` & `enrollments`)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_PROVIDER_DATA.courses.map((course) => (
              <div key={course.course_id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      Sector: {course.sector}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">{course.course_name}</h3>
                    <p className="text-xs text-slate-500">Target Role: {course.job_role}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">{course.course_id}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="bg-white p-2 rounded-lg border border-slate-100">
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase">Enrolled</p>
                    <p className="text-xs font-bold text-slate-800">{course.total_enrolled}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-100">
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase">Avg Attendance</p>
                    <p className="text-xs font-bold text-emerald-600">{course.avg_attendance}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-100">
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase">Completion Rate</p>
                    <p className="text-xs font-bold text-indigo-600">{course.completion_rate}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500">Assessment Passes: <strong>{course.assessments_passed}</strong></span>
                  <button 
                    onClick={() => {
                      setSelectedCourse(course);
                      setActiveTab('skillGaps');
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    Analyze Skill Gaps →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* TAB 2: Provider Skill Gap Analytics */
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Batch Skill Gap Breakdown (`skill_gap_analysis`)
                </h2>
                <p className="text-xs text-slate-500">
                  Showing gaps detected across enrolled trainees for <strong>{selectedCourse.course_name}</strong>
                </p>
              </div>

              <select 
                value={selectedCourse.course_id}
                onChange={(e) => {
                  const course = MOCK_PROVIDER_DATA.courses.find(c => c.course_id === e.target.value);
                  if (course) setSelectedCourse(course);
                }}
                className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700"
              >
                {MOCK_PROVIDER_DATA.courses.map(c => (
                  <option key={c.course_id} value={c.course_id}>{c.course_name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {MOCK_PROVIDER_DATA.batchSkillGaps.map((gap) => (
                <div key={gap.gap_id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xs font-bold text-slate-900">{gap.skill_name}</h3>
                      <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded ${
                        gap.gap_severity === 'High Gap'
                          ? 'bg-red-100 text-red-800'
                          : gap.gap_severity === 'Moderate Gap'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {gap.gap_severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Affecting <strong>{gap.affected_trainees} of {gap.total_trainees} trainees</strong> ({Math.round((gap.affected_trainees / gap.total_trainees) * 100)}% of batch)
                    </p>
                    <p className="text-xs text-indigo-700 font-medium pt-0.5">
                      💡 <strong>Recommended Intervention:</strong> {gap.recommended_action}
                    </p>
                  </div>

                  <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shrink-0">
                    Assign Remedial Module
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}