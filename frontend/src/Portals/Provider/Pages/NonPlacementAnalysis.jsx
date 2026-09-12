import React, { useState } from 'react';

// Mock dataset strictly mirroring the ER Diagram 'followup' schema
const MOCK_FOLLOWUP_DATA = {
  // Master Table: employment_status
  employmentStatuses: [
    { status_id: "es-01", status_name: "Unemployed", description: "Trainee actively or passively seeking placement" },
    { status_id: "es-02", status_name: "Employed - Job Changed", description: "Trainee left initial placement (Attrition)" },
    { status_id: "es-03", status_name: "Higher Education", description: "Trainee opted out of workforce for higher studies" },
    { status_id: "es-04", status_name: "Apprenticeship", description: "Trainee enrolled in an apprenticeship program" },
  ],

  // Master Table: non_placement_reasons
  nonPlacementReasons: [
    { reason_id: "npr-101", reason_name: "Skill Mismatch in Technical Interviews", description: "Failed practical assessment by employer", count: 8 },
    { reason_id: "npr-102", reason_name: "Location / Geographic Constraints", description: "Unwilling to relocate to job location", count: 5 },
    { reason_id: "npr-103", reason_name: "Salary Expectation Mismatch", description: "Offered pay below candidate benchmark", count: 3 },
    { reason_id: "npr-104", reason_name: "Opted for Higher Education", description: "Enrolled in higher degree programs", count: 6 },
  ],

  // Master Table: attrition_reasons
  attritionReasons: [
    { reason_id: "atr-201", reason_name: "Better Compensation / Offer Elsewhere", description: "Left for a higher-paying role", count: 7 },
    { reason_id: "atr-202", reason_name: "Unfavorable Working Conditions / Hours", description: "Resigned due to workplace environment", count: 4 },
    { reason_id: "atr-203", reason_name: "Role Mismatch vs Training Profile", description: "Assigned tasks outside trained domain", count: 3 },
  ],

  // Main Joined Table: followup_responses
  followupResponses: [
    {
      response_id: "res-001",
      followup_id: "flw-901",
      trainee_name: "Rahul Sharma",
      employment_status_id: "es-01",
      employment_status_name: "Unemployed",
      current_job: "N/A",
      salary: 0.00,
      job_changed: false,
      apprenticeship: false,
      further_education: false,
      unemployed: true,
      non_placement_reason: "Skill Mismatch in Technical Interviews",
      attrition_reason: null,
      comments: "Needs refresher module in React and Node.js backend integration."
    },
    {
      response_id: "res-002",
      followup_id: "flw-902",
      trainee_name: "Priya Patel",
      employment_status_id: "es-02",
      employment_status_name: "Employed - Job Changed",
      current_job: "Frontend Engineer at TechCorp",
      salary: 45000.00,
      job_changed: true,
      apprenticeship: false,
      further_education: false,
      unemployed: false,
      non_placement_reason: null,
      attrition_reason: "Better Compensation / Offer Elsewhere",
      comments: "Switched jobs after 4 months for a 30% salary hike."
    },
    {
      response_id: "res-003",
      followup_id: "flw-903",
      trainee_name: "Aniket Verma",
      employment_status_id: "es-03",
      employment_status_name: "Higher Education",
      current_job: "Student (M.Tech)",
      salary: 0.00,
      job_changed: false,
      apprenticeship: false,
      further_education: true,
      unemployed: false,
      non_placement_reason: "Opted for Higher Education",
      attrition_reason: null,
      comments: "Enrolled in full-time M.Tech degree program."
    }
  ]
};

export default function NonPlacementAnalysis() {
  const [activeView, setActiveView] = useState('nonPlacement'); // 'nonPlacement' | 'attrition'

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-md border border-rose-800/50">
            Schema: followup (Outcomes & Attrition)
          </span>
          <h1 className="text-xl font-bold mt-2">Non-Placement & Attrition Analysis</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluate root causes for unplaced trainees and job switches using followup responses.
          </p>
        </div>

        {/* View Switcher Button Group */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveView('nonPlacement')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'nonPlacement' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚠️ Non-Placement Causes
          </button>
          <button
            onClick={() => setActiveView('attrition')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'attrition' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📉 Attrition & Job Switches
          </button>
        </div>
      </div>

      {/* Schema Flags Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Unemployed Trainees</p>
          <p className="text-xl font-black text-rose-600 mt-1">22 Cases</p>
          <p className="text-[10px] text-slate-500 font-mono">unemployed = true</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Job Changed / Left</p>
          <p className="text-xl font-black text-amber-600 mt-1">14 Cases</p>
          <p className="text-[10px] text-slate-500 font-mono">job_changed = true</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Further Education</p>
          <p className="text-xl font-black text-indigo-600 mt-1">6 Cases</p>
          <p className="text-[10px] text-slate-500 font-mono">further_education = true</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Apprenticeship</p>
          <p className="text-xl font-black text-emerald-600 mt-1">8 Cases</p>
          <p className="text-[10px] text-slate-500 font-mono">apprenticeship = true</p>
        </div>
      </div>

      {/* Dynamic Main View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Categorized Reasons Table */}
        <div className="lg:col-span-2 space-y-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            {activeView === 'nonPlacement' 
              ? 'Non-Placement Reasons (`non_placement_reasons`)' 
              : 'Attrition & Resignation Reasons (`attrition_reasons`)'
            }
          </h2>

          <div className="space-y-3">
            {(activeView === 'nonPlacement' ? MOCK_FOLLOWUP_DATA.nonPlacementReasons : MOCK_FOLLOWUP_DATA.attritionReasons).map((item) => (
              <div key={item.reason_id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{item.reason_name}</span>
                    <span className="text-[9px] font-mono text-slate-400">ID: {item.reason_id}</span>
                  </div>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-sm font-black ${activeView === 'nonPlacement' ? 'text-rose-600' : 'text-amber-600'}`}>
                    {item.count} Trainees
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Individual Followup Response Audit (`followup_responses`) */}
        <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Response Log (`followup_responses`)
            </h3>
            <p className="text-[10px] text-slate-400">Detailed records linking statuses & reasons</p>
          </div>

          <div className="space-y-3">
            {MOCK_FOLLOWUP_DATA.followupResponses.map((res) => (
              <div key={res.response_id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">{res.trainee_name}</span>
                  <span className="px-2 py-0.5 text-[9px] font-extrabold rounded bg-slate-200 text-slate-700">
                    {res.employment_status_name}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1">
                  <p>Current Job: <strong className="text-slate-800">{res.current_job}</strong></p>
                  {res.non_placement_reason && (
                    <p>Non-Placement Cause: <strong className="text-rose-700">{res.non_placement_reason}</strong></p>
                  )}
                  {res.attrition_reason && (
                    <p>Attrition Cause: <strong className="text-amber-700">{res.attrition_reason}</strong></p>
                  )}
                  <p className="italic text-slate-500 bg-white p-2 rounded border border-slate-100 text-[10px]">
                    "{res.comments}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}