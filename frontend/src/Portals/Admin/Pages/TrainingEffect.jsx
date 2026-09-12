import React from 'react';

export default function AdminEffectivenessScore() {
  const scores = [
    { provider: 'Apex Technical Institute', score: 9.2, placementRate: '91%', retention6M: '86%', rating: 'A+' },
    { provider: 'National Skill Center', score: 8.5, placementRate: '84%', retention6M: '79%', rating: 'A' },
    { provider: 'Western Vocational Hub', score: 6.8, placementRate: '62%', retention6M: '54%', rating: 'C' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
          Analytics & Scoring
        </span>
        <h1 className="text-xl font-bold text-slate-900 mt-1">Training Effectiveness Score</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Algorithmic scoring of training institutes based on employment rate, salary growth, and post-placement retention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scores.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="text-xs font-bold text-slate-900">{item.provider}</h3>
              <span className="px-2 py-0.5 text-xs font-black bg-indigo-50 text-indigo-600 rounded-md border border-indigo-200">
                Grade {item.rating}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Effectiveness Index</p>
              <p className="text-3xl font-black text-slate-900">{item.score}<span className="text-xs text-slate-400"> / 10</span></p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between text-[11px] font-semibold text-slate-600">
              <span>Placement: <strong className="text-slate-900">{item.placementRate}</strong></span>
              <span>6M Retention: <strong className="text-slate-900">{item.retention6M}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}