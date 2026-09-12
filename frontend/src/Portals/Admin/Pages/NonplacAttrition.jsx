import React from 'react';

export default function NonplacAttrition() {
  const highRiskBatches = [
    { batch: 'Batch 2026-A (CNC Machining)', institute: 'Government ITI Thane', riskLevel: 'High Risk (42%)', keyFactor: 'Distance from industrial hub & low starting stipends' },
    { batch: 'Batch 2026-C (Web Dev)', institute: 'Skill Hub Nashik', riskLevel: 'Medium Risk (28%)', keyFactor: 'Curriculum lagging behind current tech stack requirements' },
    { batch: 'Batch 2025-D (Solar Setup)', institute: 'Apex Tech Pune', riskLevel: 'Low Risk (12%)', keyFactor: 'Strong local employer tie-ups and high placement rate' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
            Predictive Analytics
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-semibold">SIH 26135</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mt-1">Non-Placement & Employment Attrition Prediction</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Machine learning model forecasting candidate dropouts, unplaced cohorts, and post-employment 90-day attrition risks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Predicted Unplaced Candidates</p>
          <p className="text-2xl font-black text-amber-600 mt-1">1,240</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Next 60 Days</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">90-Day Attrition Forecast</p>
          <p className="text-2xl font-black text-red-600 mt-1">18.4%</p>
          <p className="text-[10px] text-red-500 font-bold mt-0.5">↑ 2.1% higher in rural centers</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Top Risk Factor</p>
          <p className="text-lg font-bold text-slate-800 mt-1">Wage Disparity</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Below regional average</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Early Warning Signals</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">310 Trainees</p>
          <p className="text-[10px] text-indigo-600 font-bold mt-0.5">Flagged for intervention</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Batches Flagged for High Attrition/Non-Placement Risk</h2>
        <div className="space-y-3">
          {highRiskBatches.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <h3 className="font-bold text-slate-900">{item.batch}</h3>
                <p className="text-[10px] text-slate-500">{item.institute}</p>
                <p className="text-[11px] text-red-600 font-semibold mt-1">Primary Factor: {item.keyFactor}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg ${
                  item.riskLevel.includes('High') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {item.riskLevel}
                </span>
                <button className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-xl text-[11px] hover:bg-slate-800 transition-all">
                  Trigger Mitigation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}