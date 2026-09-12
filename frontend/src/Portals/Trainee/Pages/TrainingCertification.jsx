import React from 'react';

// Hardcoded Training & Certification Data matching the UI mockup
const TRAINING_DATA = {
  stats: {
    totalEnrolled: 3,
    inProgress: 1,
    completed: 2,
    overallAttendance: "94.2%",
    assessmentsPassed: "7 / 7",
    passRate: "100% Pass",
    avgScore: "85.4%",
    verifiedCertificates: 2,
  },
  activeCourse: {
    title: "Web Development L1",
    status: "In Progress",
    provider: "VTP Pune (Vocational Training Provider)",
    batchCode: "MH-VTP-2024-WD01",
    scheme: "MSSDS Employment Guarantee Initiative",
    attendancePct: 94,
    contactHours: "Total: 188 of 200 Required Contact Hours",
    syllabusPct: 78,
    activeModule: "Module 4 of 5 active",
    currentTopic: "Current Topic: Backend APIs & REST Inte...",
    schedule: "15 Jul 2024 – 30 Nov 2024",
    isOnTrack: true,
    targetAssessment: "Target Assessment: 28 Nov 2024 (Practical & Viva)",
  },
  evaluations: [
    {
      id: 1,
      name: "Module 3: React & State Architecture",
      course: "Web Development L1",
      date: "18 Oct 2024",
      score: "46 / 50 (92%)",
      status: "PASS",
    },
    {
      id: 2,
      name: "Module 2: Advanced JavaScript & DOM",
      course: "Web Development L1",
      date: "22 Sep 2024",
      score: "42 / 50 (84%)",
      status: "PASS",
    },
    {
      id: 3,
      name: "Module 1: HTML5 Semantics & Responsive CSS",
      course: "Web Development L1",
      date: "14 Aug 2024",
      score: "48 / 50 (96%)",
      status: "PASS",
    },
    {
      id: 4,
      name: "National Skill Qualification Framework (NSQF) L4 Final",
      course: "Computer Hardware & Networking",
      date: "10 May 2024",
      score: "88 / 100 (88%)",
      status: "PASS",
    },
  ],
  certificates: [
    {
      id: 1,
      title: "Web Development Specialist (NSQF Level 4)",
      issuer: "Maharashtra State Skill Development Society (MSSDS)",
      uniqueId: "MH-CERT-2024-88191",
      issueDate: "12 Oct 2024",
    },
    {
      id: 2,
      title: "Computer Hardware & Network Maintenance (NSQF Level 3)",
      issuer: "Maharashtra State Skill Development Society (MSSDS)",
      uniqueId: "MH-CERT-2024-42891",
      issueDate: "15 May 2024",
    },
  ],
};

export default function TrainingCertifications() {
  const { stats, activeCourse, evaluations, certificates } = TRAINING_DATA;

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Training & Certifications</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track active enrollment hours, verified STQC attendance, module evaluations, and credentials.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto flex items-center space-x-1.5">
          <span>👁️</span>
          <span>View Skill Certificate</span>
        </button>
      </div>

      {/* 4 Key Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Enrolled */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled Courses</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-black text-slate-900">{stats.totalEnrolled}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                  {stats.inProgress} In-Progress
                </span>
              </div>
            </div>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">📘</div>
          </div>
          <p className="text-[11px] font-medium text-emerald-600 flex items-center space-x-1">
            <span>✓</span>
            <span>{stats.completed} Courses Completed</span>
          </p>
        </div>

        {/* Overall Attendance */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overall Attendance %</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{stats.overallAttendance}</p>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">❇️</div>
          </div>
        </div>

        {/* Assessments Passed */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assessments Passed</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-black text-slate-900">{stats.assessmentsPassed}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                  {stats.passRate}
                </span>
              </div>
            </div>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">📋</div>
          </div>
          <p className="text-[11px] font-medium text-slate-500">
            📊 Avg. Score: <span className="font-bold text-slate-800">{stats.avgScore}</span>
          </p>
        </div>

        {/* Verified Certificates */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified Certificates</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{stats.verifiedCertificates}</p>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">🛡️</div>
          </div>
          <p className="text-[11px] font-medium text-indigo-600 flex items-center space-x-1">
            <span>🏛️</span>
            <span>State Skill Council Issued</span>
          </p>
        </div>

      </div>

      {/* Active Course Progress Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">💻</div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900">{activeCourse.title}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-200">
                  • {activeCourse.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Training Provider: <span className="font-medium text-slate-700">{activeCourse.provider}</span> • Batch Code: <span className="font-mono text-slate-700">{activeCourse.batchCode}</span> • Scheme: <span className="text-slate-700">{activeCourse.scheme}</span>
              </p>
            </div>
          </div>
          <button className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-xs shrink-0 self-start sm:self-auto flex items-center space-x-1">
            <span>📖</span>
            <span>View Curriculum & Syllabus</span>
          </button>
        </div>

        {/* 3 Active Progress Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Attendance */}
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/60 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendance</p>
            <p className="text-2xl font-black text-slate-900">{activeCourse.attendancePct}%</p>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${activeCourse.attendancePct}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-500 pt-1">{activeCourse.contactHours}</p>
          </div>

          {/* Syllabus Covered */}
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/60 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Syllabus Covered</p>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                {activeCourse.activeModule}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">{activeCourse.syllabusPct}%</p>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${activeCourse.syllabusPct}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-500 pt-1 truncate">{activeCourse.currentTopic}</p>
          </div>

          {/* Schedule & Timeline */}
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/60 space-y-2 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Schedule & Timeline</p>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                On Track
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900">{activeCourse.schedule}</p>
            <div className="p-2 bg-amber-50/80 border border-amber-200/60 rounded-lg text-[10px] text-amber-800 font-medium">
              📅 {activeCourse.targetAssessment}
            </div>
          </div>

        </div>
      </div>

      {/* Assessment & Evaluation History */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Assessment & Evaluation History</h2>
            <p className="text-[11px] text-slate-500">Total Evaluations Recorded: {evaluations.length} Modules</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
            <span>⚙️</span>
            <span>State Assessor Certified</span>
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-2">Assessment Name</th>
                <th className="pb-2">Course / Module</th>
                <th className="pb-2">Date Taken</th>
                <th className="pb-2">Score Obtained</th>
                <th className="pb-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {evaluations.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-bold text-slate-900">{item.name}</td>
                  <td className="py-3 text-slate-500">{item.course}</td>
                  <td className="py-3 text-slate-500 font-medium">{item.date}</td>
                  <td className="py-3 font-bold text-slate-800">{item.score}</td>
                  <td className="py-3 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      • {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Skill Certificates */}
      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Verified Skill Certificates</h2>
          <p className="text-[11px] text-slate-500">Mapped to training certificates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">🎓</div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{cert.title}</h3>
                  <p className="text-[11px] text-slate-500">{cert.issuer}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono border-t border-b border-slate-100 py-2">
                <div>
                  <span className="text-slate-400 block uppercase font-sans">Unique ID</span>
                  <span className="font-bold text-slate-700">{cert.uniqueId}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block uppercase font-sans">Issue Date</span>
                  <span className="font-bold text-slate-700">{cert.issueDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1">
                  <span>👁️</span>
                  <span>View Certificate</span>
                </button>
                <button className="py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1">
                  <span>📥</span>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}