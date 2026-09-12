import React, { useState } from 'react';

export default function AdminWhatIfSimulator() {
  const [budgetAllocation, setBudgetAllocation] = useState(50);
  const [stipendIncrease, setStipendIncrease] = useState(10);

  // Simulated metrics derived from sliders
  const predictedPlacement = (65 + budgetAllocation * 0.25 + stipendIncrease * 0.3).toFixed(1);
  const estimatedTraineesReached = Math.round(12000 + budgetAllocation * 150);

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
            Simulation & Policy Modeling
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-indigo-950 text-indigo-300">Sim</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mt-1">What-If Policy Simulator</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Simulate budget distributions, incentive adjustments, and program changes to predict placement outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simulation Controls */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Policy Variables</h2>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>AI/Tech Sector Budget Allocation</span>
              <span className="text-indigo-600">{budgetAllocation}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={budgetAllocation}
              onChange={(e) => setBudgetAllocation(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Trainee Stipend Increase</span>
              <span className="text-indigo-600">+{stipendIncrease}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={stipendIncrease}
              onChange={(e) => setStipendIncrease(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Predictive Results */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Simulated Outcome Projection</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-center">
              <p className="text-[10px] font-extrabold text-indigo-700 uppercase">Predicted Placement Rate</p>
              <p className="text-3xl font-black text-indigo-900 mt-1">{predictedPlacement}%</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-center">
              <p className="text-[10px] font-extrabold text-emerald-700 uppercase">Estimated Reach</p>
              <p className="text-3xl font-black text-emerald-900 mt-1">{estimatedTraineesReached.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            💡 <strong>Model Note:</strong> Allocating higher funds to AI and increasing stipends reduces early program dropout by an estimated 14%.
          </div>
        </div>
      </div>
    </div>
  );
}