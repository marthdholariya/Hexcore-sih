import React, { useState } from 'react';

export default function AdminSkillGapDetection() {
  const [selectedRegion, setSelectedRegion] = useState('All');

  const gapAnalysis = [
    {
      sector: 'Information Technology',
      nsqfLevel: 'Level 5/6',
      demandedSkill: 'Cloud Architecture & DevOps',
      currentSupply: 'High Frontend, Low Infrastructure',
      deficitScore: 'High (78% Gap)',
      recommendation: 'Introduce AWS/Azure Modules in ITI Curriculum',
    },
    {
      sector: 'Advanced Manufacturing',
      nsqfLevel: 'Level 4',
      demandedSkill: 'PLC Programming & Industrial Robotics',
      currentSupply: 'Basic Electrical Maintenance',
      deficitScore: 'Critical (85% Gap)',
      recommendation: 'Upgrade Workshop Hardware at Regional Training Centers',
    },
    {
      sector: 'Healthcare & Nursing',
      nsqfLevel: 'Level 4',
      demandedSkill: 'Emergency & ICU Care Assistance',
      currentSupply: 'General Nursing Assistance',
      deficitScore: 'Moderate (45% Gap)',
      recommendation: 'Add Specialized Certification Modules',
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              AI Intelligence Engine
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-indigo-950 text-indigo-300">AI</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">AI Skill-Gap Detection</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated mismatch analysis between industry demand and current vocational candidate output.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-semibold"
          >
            <option value="All">All Maharashtra Clusters</option>
            <option value="Pune">Pune Metropolitan Region</option>
            <option value="Mumbai">Mumbai MMR</option>
            <option value="Nagpur">Nagpur Industrial Belt</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Critical Skill Deficits</p>
          <p className="text-2xl font-black text-red-600 mt-1">14 Clusters</p>
          <p className="text-[10px] text-red-500 font-bold mt-1">Requires urgent curriculum sync</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">AI Model Accuracy</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">94.2%</p>
          <p className="text-[10px] text-slate-400 font-semibold mt-1">Trained on 500k employment logs</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Industry Matching Index</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">68 / 100</p>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">↑ +6 pts post AI-interventions</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden text-xs">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-900">Detected High-Severity Gaps</h2>
          <span className="text-[10px] text-slate-400 font-semibold">Updated 2 hours ago</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase">
              <th className="py-3.5 px-4">Sector & Level</th>
              <th className="py-3.5 px-4">Demanded Skill</th>
              <th className="py-3.5 px-4">Current Trainee Supply</th>
              <th className="py-3.5 px-4">Deficit Severity</th>
              <th className="py-3.5 px-4">AI Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {gapAnalysis.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{item.sector}</div>
                  <div className="text-[10px] text-indigo-600 font-semibold">{item.nsqfLevel}</div>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{item.demandedSkill}</td>
                <td className="py-3.5 px-4 text-slate-500">{item.currentSupply}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                    item.deficitScore.includes('Critical') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {item.deficitScore}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-indigo-900 bg-indigo-50/40">{item.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}