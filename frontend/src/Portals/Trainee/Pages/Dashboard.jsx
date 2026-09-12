import React from 'react';

// Hardcoded Dashboard Data (Replace with API response later)
const DASHBOARD_DATA = {
  welcome: {
    fullName: "Rahul Patil",
    candidateId: "MH-2024-TR-84920",
    portalTag: "MSSDS Unified Trainee Portal",
    subtext: "Maharashtra State Skill Development Society"
  },
  surveyAlert: {
    isDue: true,
    title: "3-Month Employment Follow-up Due",
    badgeText: "Quick Survey",
    description: "Please update your current employment status and upload monthly evidence."
  },
  currentTraining: {
    status: "In Progress",
    courseName: "Web Development L1",
    trainingInstitute: "VTP Pune (Vocational Training Provider)",
    attendance: "94%",
    attendanceBadge: "STQC Validated",
    syllabusCovered: "78%",
    activeModule: "Module 4 of 5 active",
    progressPercentage: 78
  },
  currentJobStatus: {
    status: "Verified",
    jobTitle: "Junior Developer at Tech Corp",
    startDate: "15 Oct 2024",
    industrySector: "IT & Software",
    trainingRelated: "Yes",
    primarySkill: "Web Dev",
    skillVerified: "Verified"
  },
  aiTip: {
    title: "AI Tip: 2 new skill upgrades recommended for your career path.",
    description: "High local demand in Pune IT cluster: Next.js & Cloud Deployment certifications are sought by 42 hiring partners."
  }
};

export default function Dashboard() {
  const { welcome, surveyAlert, currentTraining, currentJobStatus, aiTip } = DASHBOARD_DATA;

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* Welcome Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold mb-3">
          <span>🛡️ {welcome.portalTag}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Welcome back, {welcome.fullName}!
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          {welcome.portalTag} • {welcome.subtext}
        </p>
      </div>

      {/* Survey Banner */}
      {surveyAlert.isDue && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
              ⏱️
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-slate-900">{surveyAlert.title}</h3>
                <span className="px-2 py-0.5 rounded-md bg-amber-200/80 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                  {surveyAlert.badgeText}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{surveyAlert.description}</p>
            </div>
          </div>
          <button className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0">
            Complete Survey Now →
          </button>
        </div>
      )}

      {/* Training & Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Training Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-sm font-bold text-slate-900">🎓 Current Training</h2>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                • {currentTraining.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{currentTraining.courseName}</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Institute: <span className="text-slate-700 font-semibold">{currentTraining.trainingInstitute}</span>
            </p>

            <div className="grid grid-cols-2 gap-4 my-5">
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendance</p>
                <p className="text-xl font-black text-slate-900 mt-0.5">{currentTraining.attendance}</p>
                <span className="inline-block mt-1 text-[9px] font-extrabold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                  ✓ {currentTraining.attendanceBadge}
                </span>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Syllabus Covered</p>
                <p className="text-xl font-black text-slate-900 mt-0.5">{currentTraining.syllabusCovered}</p>
                <p className="text-[10px] font-semibold text-slate-500 mt-1">{currentTraining.activeModule}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                <span>Batch Schedule & Completion</span>
                <span className="text-slate-800">{currentTraining.progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${currentTraining.progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Status Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-sm font-bold text-slate-900">💼 Current Job Status</h2>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ✓ {currentJobStatus.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{currentJobStatus.jobTitle}</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Start Date: <span className="text-slate-700 font-semibold">{currentJobStatus.startDate}</span>
            </p>

            <div className="grid grid-cols-2 gap-4 my-5">
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Industry Sector</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{currentJobStatus.industrySector}</p>
                <span className="inline-block mt-1 text-[9px] font-extrabold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                  ✓ Training Related: {currentJobStatus.trainingRelated}
                </span>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Primary Skill</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{currentJobStatus.primarySkill}</p>
                <p className="text-[10px] font-semibold text-slate-500 mt-1">Verification: {currentJobStatus.skillVerified}</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-slate-500 mb-1">Active Employment</p>
              <div className="w-full bg-emerald-500 h-2 rounded-full"></div>
            </div>
          </div>
        </div>

      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
            💡
          </div>
          <div>
            <h3 className="text-sm font-bold text-indigo-950">{aiTip.title}</h3>
            <p className="text-xs text-indigo-800/80 mt-0.5">{aiTip.description}</p>
          </div>
        </div>
      </div>

    </div>
  );
}