import React from 'react';
import { useAuth } from '../../../AuthContext';

// Skill Passport Data aligned with ER Diagram entities
const SKILL_PASSPORT_DATA = {
  candidate: {
    fullName: "Aarav Sharma",
    candidateId: "MH-2024-TR-84920",
    email: "aarav.sharma@skilltrack.demo",
    mobile: "+91 98765 00001",
    district: "Pune",
    state: "Maharashtra",
    status: "Active Trainee",
  },
  skillsOverview: {
    totalSkillsAcquired: 14,
    verifiedModules: 7,
    completedCourses: 2,
    activeEnrollments: 1,
  },
  coreCompetencies: [
    { category: "Web Development", skills: ["React.js", "JavaScript (ES6+)", "HTML5 & Responsive CSS", "REST API Integration"] },
    { category: "Hardware & Networking", skills: ["Network Maintenance", "System Troubleshooting", "Router Configuration"] },
    { category: "Soft Skills & Workplace Practices", skills: ["Technical Communication", "Agile Workflow", "Problem Solving"] },
  ],
  verifiedCredentials: [
    {
      id: "CERT-101",
      title: "Web Development Specialist",
      issuer: "Maharashtra State Skill Development Society",
      issueDate: "12 Oct 2024",
      credentialId: "MH-CERT-2024-88191",
    },
    {
      id: "CERT-102",
      title: "Computer Hardware & Network Maintenance",
      issuer: "Maharashtra State Skill Development Society",
      issueDate: "15 May 2024",
      credentialId: "MH-CERT-2024-42891",
    },
  ],
};

export default function SkillPassport() {
  const { user } = useAuth();
  const { candidate, skillsOverview, coreCompetencies, verifiedCredentials } = SKILL_PASSPORT_DATA;

  const displayName = user?.name || candidate.fullName;
  const displayEmail = user?.email || candidate.email;
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Skill Passport</h1>
          <p className="text-xs text-slate-500 mt-1">
            Digital profile summarizing acquired competencies, verified training modules, and official credentials.
          </p>
        </div>
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto flex items-center space-x-1.5"
        >
          <span>📥</span>
          <span>Download Passport PDF</span>
        </button>
      </div>

      {/* 2. Trainee ID Card Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl border-2 border-indigo-400/30 shadow-inner">
              {initials}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white">{displayName}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  • {user?.account_status || candidate.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">ID: {user?.user_id || candidate.candidateId}</p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-300 space-y-0.5">
            <p>📍 {candidate.district}, {candidate.state}</p>
            <p>✉️ {displayEmail}</p>
            <p>📞 {candidate.mobile}</p>
          </div>
        </div>

        {/* Top Summary Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-1">
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
            <p className="text-lg font-black text-white">{skillsOverview.totalSkillsAcquired}</p>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Skills Acquired</p>
          </div>
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
            <p className="text-lg font-black text-emerald-400">{skillsOverview.verifiedModules}</p>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Passed Modules</p>
          </div>
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
            <p className="text-lg font-black text-indigo-400">{skillsOverview.completedCourses}</p>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Completed Courses</p>
          </div>
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
            <p className="text-lg font-black text-amber-400">{skillsOverview.activeEnrollments}</p>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">In-Progress</p>
          </div>
        </div>
      </div>

      {/* 3. Core Competencies */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">Verified Competencies & Technical Skills</h2>
          <p className="text-[11px] text-slate-500">Categorized skills evaluated through course assessments</p>
        </div>

        <div className="space-y-4">
          {coreCompetencies.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5"
                  >
                    <span className="text-indigo-600">✓</span>
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Credentials List */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">Official Credentials</h2>
          <p className="text-[11px] text-slate-500">Issued state certificates linked to candidate profile</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verifiedCredentials.map((cert) => (
            <div key={cert.id} className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{cert.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{cert.issuer}</p>
                </div>
                <span className="text-xl">🎓</span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono pt-2 border-t border-slate-200/60">
                <span>Credential ID: <strong className="text-slate-800">{cert.credentialId}</strong></span>
                <span>Date: <strong className="text-slate-800">{cert.issueDate}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}