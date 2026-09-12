import React, { useState } from 'react';

// Mock Data strictly following ER Diagram Schema: 'training'
const MOCK_ENROLLMENT_DATA = [
  {
    // enrollments table
    enrollment_id: "e8b3a1d2-9f01-4c22-b51e-1234567890ab",
    trainee_id: "t1a2b3c4-d5e6-7f8a-9b0c-112233445566",
    course_id: "c9d8e7f6-a5b4-3c2d-1e0f-998877665544",
    enrollment_date: "2026-01-10",
    start_date: "2026-01-15",
    end_date: "2026-06-30",
    completion_status: "In Progress",
    completion_date: null,

    // Joined: courses table
    course: {
      course_name: "Full-Stack Web Development",
      description: "Comprehensive training covering modern frontend frameworks, backend Node.js APIs, and relational databases.",
      sector: "IT-ITeS",
      job_role: "Full Stack Developer",
      duration: 24, // weeks/hours
      course_level: "Intermediate",
      provider_name: "National Skill Institute" // Joined via provider_id
    },

    // Joined: attendance table
    attendance: {
      attendance_id: "att-101",
      attendance_date: "2026-03-10",
      is_present: true,
      total_sessions: 50,
      sessions_attended: 46
    },

    // Joined: assessments table
    assessments: [
      {
        assessment_id: "ass-201",
        assessment_type: "Mid-Term Practical",
        assessment_date: "2026-02-28",
        score: 88.5,
        max_score: 100.0,
        pass_fail: true,
        result: "PASS"
      },
      {
        assessment_id: "ass-202",
        assessment_type: "Module 1 - Frontend Architecture",
        assessment_date: "2026-01-30",
        score: 92.0,
        max_score: 100.0,
        pass_fail: true,
        result: "PASS"
      }
    ],

    // Joined: certificates table
    certificate: null // Active course, certificate not generated yet
  }
];

const MOCK_CERTIFICATES_DATA = [
  {
    // certificates table
    certificate_id: "cert-789a-001",
    enrollment_id: "e111a222-3333-4444-5555-666677778888",
    certificate_name: "Basic Computer Operations & IT Support",
    certificate_number: "MH-SD-2025-88392",
    issue_date: "2025-11-20",
    expiry_date: null, // Lifetime
    issuing_organization: "Maharashtra State Skill Development Society",
    verification_status: "VERIFIED",
    certificate_url: "https://skillpassport.gov.in/verify/MH-SD-2025-88392"
  }
];

export default function TrainingCertification() {
  const [activeTab, setActiveTab] = useState('active');
  const currentEnrollment = MOCK_ENROLLMENT_DATA[0];

  // Calculated attendance percentage using attendance table metrics
  const attendanceRate = ((currentEnrollment.attendance.sessions_attended / currentEnrollment.attendance.total_sessions) * 100).toFixed(1);

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800/50">
            Schema: Training & Certification
          </span>
          <h1 className="text-xl font-bold mt-2">Training Courses & Verified Credentials</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time enrollment tracking, attendance logs, assessment scores, and certificates.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'active' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Active Enrollments
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'certificates' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Certificates ({MOCK_CERTIFICATES_DATA.length})
          </button>
        </div>
      </div>

      {activeTab === 'active' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column: Course & Assessment Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Enrollment & Course Info Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {currentEnrollment.course.sector}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      Level: {currentEnrollment.course.course_level}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">{currentEnrollment.course.course_name}</h2>
                  <p className="text-xs text-slate-500">Provider: {currentEnrollment.course.provider_name}</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {currentEnrollment.completion_status}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {currentEnrollment.course.description}
              </p>

              {/* ER Table Metrics: enrollments & attendance */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">Target Job Role</p>
                  <p className="text-xs font-bold text-slate-800 mt-1 truncate">{currentEnrollment.course.job_role}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">Attendance Rate</p>
                  <p className="text-sm font-black text-emerald-600 mt-1">{attendanceRate}% ({currentEnrollment.attendance.sessions_attended}/{currentEnrollment.attendance.total_sessions} Sessions)</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">Start & End Date</p>
                  <p className="text-[11px] font-bold text-slate-700 mt-1">{currentEnrollment.start_date} → {currentEnrollment.end_date}</p>
                </div>
              </div>
            </div>

            {/* ER Table: assessments */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Assessment Results (`assessments`)</h3>
                <span className="text-[10px] font-bold text-slate-400">Evaluated by Provider</span>
              </div>

              <div className="divide-y divide-slate-100">
                {currentEnrollment.assessments.map((item) => (
                  <div key={item.assessment_id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{item.assessment_type}</p>
                      <p className="text-[10px] text-slate-400">Date Evaluated: {item.assessment_date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-indigo-600">{item.score} / {item.max_score}</span>
                      <span className={`ml-2 px-1.5 py-0.5 text-[9px] font-extrabold rounded ${
                        item.pass_fail ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {item.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Attendance Log Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                Attendance Log (`attendance`)
              </h3>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
                <p className="text-[10px] font-bold text-emerald-900 uppercase">Latest Verification</p>
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Last Recorded:</span>
                  <span className="font-bold">{currentEnrollment.attendance.attendance_date}</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Status:</span>
                  <span className="text-emerald-700 font-bold">Present</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* ER Table: certificates */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_CERTIFICATES_DATA.map((cert) => (
            <div key={cert.certificate_id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 text-[9px] font-extrabold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Status: {cert.verification_status}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Num: {cert.certificate_number}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">{cert.certificate_name}</h3>
                <p className="text-xs text-slate-500">Issuer: {cert.issuing_organization}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Issue Date:</span>
                  <span className="font-bold text-slate-800">{cert.issue_date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expiry Date:</span>
                  <span className="font-bold text-slate-800">{cert.expiry_date || 'Lifetime / No Expiry'}</span>
                </div>
              </div>

              <button
                onClick={() => window.open(cert.certificate_url, '_blank')}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                🔗 Verify Certificate Evidence
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}