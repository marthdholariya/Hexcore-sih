import React, { useState } from 'react';

export default function SRecommendations() {
  const [recommendations, setRecommendations] = useState([
    {
      id: 'REC-101',
      category: 'Curriculum Upgrade',
      impact: 'High (+18% Placement)',
      title: 'Mandate Electric Vehicle (EV) Maintenance in Automobile Courses',
      description: 'Demand data shows a 45% increase in EV service technicians across Chakan & Pimpri clusters.',
      status: 'Pending Action',
    },
    {
      id: 'REC-102',
      category: 'Provider Allocation',
      impact: 'Medium (+12% Retention)',
      title: 'Reallocate Unused Stipend Grants to Rural ITI Training Hubs',
      description: 'Rural centers report high early dropout rates due to travel expense constraints.',
      status: 'Approved',
    },
    {
      id: 'REC-103',
      category: 'Employer Partner Engagement',
      impact: 'High (+25% Fast-Track Hiring)',
      title: 'Auto-Trigger Placement Drives with Mid-Tier Manufacturing Firms',
      description: 'Over 80 verified employers are currently experiencing unfulfilled assembly-line positions.',
      status: 'Pending Action',
    },
  ]);

  const handleAction = (id, newStatus) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
            Decision Support System
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-indigo-950 text-indigo-300">AI Prescriptive</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mt-1">Smart Recommendations Engine</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          AI-generated policy interventions and optimization strategies based on live portal telemetry and skill analytics.
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold text-indigo-600">{rec.id}</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 text-slate-700">
                  {rec.category}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Predicted Impact: {rec.impact}
                </span>
              </div>
              <div>
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${
                  rec.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {rec.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">{rec.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{rec.description}</p>
            </div>

            {rec.status === 'Pending Action' && (
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => handleAction(rec.id, 'Dismissed')}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => handleAction(rec.id, 'Approved')}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
                >
                  Approve & Execute Recommendation
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}