import React from 'react';

export default function JobMarketDemand() {
  const demandSectors = [
    { sector: 'AI & Machine Learning', growth: '+34%', openPositions: 1420, demandIndex: 'High' },
    { sector: 'Automotive Electric Mobility', growth: '+28%', openPositions: 980, demandIndex: 'High' },
    { sector: 'Logistics & Supply Chain', growth: '+15%', openPositions: 2100, demandIndex: 'Medium' },
    { sector: 'Healthcare & Nursing Assistance', growth: '+22%', openPositions: 850, demandIndex: 'High' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
          Market Intelligence
        </span>
        <h1 className="text-xl font-bold text-slate-900 mt-1">Job Market Demand Intelligence</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time analysis of industry hiring trends, high-demand skill clusters, and regional employment gaps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Top Sector Hiring Growth</h2>
          <div className="space-y-3">
            {demandSectors.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <div>
                  <p className="font-bold text-slate-800">{d.sector}</p>
                  <p className="text-[10px] text-slate-400">{d.openPositions} Active Vacancies</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-600">{d.growth}</span>
                  <span className="block text-[10px] font-extrabold text-indigo-600">{d.demandIndex} Demand</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">High-Demand Skill Gaps</h2>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <p className="font-bold text-indigo-900">Python Data Pipeline Engineering</p>
              <p className="text-[10px] text-indigo-600 mt-0.5">Surge of 40% in demand across Maharashtra tech hubs.</p>
            </div>
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <p className="font-bold text-indigo-900">CNC Precision Machining & Robotics</p>
              <p className="text-[10px] text-indigo-600 mt-0.5">High requirement in Pune & Nashik industrial belts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}