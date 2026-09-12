import React, { useState } from 'react';

// Hardcoded Trainee Context (Mapped from Trainee & Qualification Schema)
const TRAINEE_PROFILE = {
  candidateId: "MH-2024-TR-84920",
  name: "Rahul Patil",
  trade: "Web Development & IT Maintenance",
  currentNSQFLevel: 4,
  targetNSQFLevel: 5,
  completedModules: ["Frontend Fundamentals", "JavaScript ES6", "Basic Networking"],
  skillGaps: ["TypeScript", "State Management (Redux)", "Backend Integration"],
};

// Recommendation Engine Mock Data
const RECOMMENDATION_DATA = {
  upskillingCourses: [
    {
      courseId: "CRS-2026-101",
      title: "Advanced React & State Management",
      provider: "National Skill Development Corporation (NSDC)",
      nsqfLevel: 5,
      duration: "6 Weeks (Online)",
      relevanceScore: 96,
      skillsCovered: ["Redux Toolkit", "Context API", "REST APIs"],
      impact: "Unlocks Senior Frontend & Associate Web Developer job roles.",
      status: "Recommended"
    },
    {
      courseId: "CRS-2026-108",
      title: "TypeScript for Enterprise Applications",
      provider: "IIT Bombay Spoken Tutorials",
      nsqfLevel: 5,
      duration: "4 Weeks (Self-Paced)",
      relevanceScore: 89,
      skillsCovered: ["TypeScript Basics", "Type Safety", "Interfaces"],
      impact: "Fills 1 major skill gap identified across 75% of local postings.",
      status: "Recommended"
    }
  ],
  careerPathways: [
    {
      role: "Junior Web Developer",
      readiness: "Ready (95% Match)",
      avgSalary: "₹22,000 - ₹28,000 / month",
      action: "Direct Placement / Application"
    },
    {
      role: "Full Stack Developer",
      readiness: "Skill Gap Identified (60% Match)",
      avgSalary: "₹35,000 - ₹45,000 / month",
      action: "Requires Level-5 Upskilling & Node.js Certification"
    }
  ]
};

export default function SmartRecommendations() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleEnroll = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      alert(`Successfully registered interest for Course ID: ${courseId}`);
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Smart Recommendations</h1>
          <p className="text-xs text-slate-500 mt-1">
            AI-driven upskilling paths and career pathway analysis based on your training records.
          </p>
        </div>
      </div>

      {/* 2. Skill Gap & Qualification Overview */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Qualification Level</span>
            <h2 className="text-base font-bold text-slate-900">NSQF Level {TRAINEE_PROFILE.currentNSQFLevel} → Target: Level {TRAINEE_PROFILE.targetNSQFLevel}</h2>
            <p className="text-xs text-slate-500">Candidate: {TRAINEE_PROFILE.name} ({TRAINEE_PROFILE.candidateId})</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold">
              3 Skill Gaps Identified
            </span>
          </div>
        </div>

        {/* Skill Gap Pills */}
        <div className="space-y-2 text-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identified Skill Gaps for Promotion</p>
          <div className="flex flex-wrap gap-2">
            {TRAINEE_PROFILE.skillGaps.map((gap, index) => (
              <span key={index} className="px-3 py-1 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
                ⚠️ {gap}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Recommended Upskilling Courses */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Recommended Courses to Bridge Skill Gaps</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECOMMENDATION_DATA.upskillingCourses.map((course) => {
            const isEnrolled = enrolledCourses.includes(course.courseId);

            return (
              <div 
                key={course.courseId} 
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        NSQF Level {course.nsqfLevel}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">{course.title}</h3>
                      <p className="text-xs text-slate-500">{course.provider}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-black text-emerald-600">{course.relevanceScore}%</span>
                      <p className="text-[9px] font-bold uppercase text-slate-400">Match</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-800">Impact:</strong> {course.impact}
                  </p>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Covered Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {course.skillsCovered.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">⏱️ {course.duration}</span>
                  <button
                    disabled={isEnrolled}
                    onClick={() => handleEnroll(course.courseId)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      isEnrolled 
                        ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isEnrolled ? '✓ Interest Submitted' : 'Enroll / Request Access'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Projected Career Pathways */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">Career Progression Pathways</h2>
          <p className="text-[11px] text-slate-500">Target roles mapped against your current qualification matrix</p>
        </div>

        <div className="space-y-3">
          {RECOMMENDATION_DATA.careerPathways.map((path, index) => (
            <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-900">{path.role}</h3>
                <p className="text-[11px] text-slate-600">Expected Pay Range: <strong className="text-slate-800">{path.avgSalary}</strong></p>
                <p className="text-[11px] text-indigo-600 font-medium">Recommended Action: {path.action}</p>
              </div>

              <div className="shrink-0">
                <span className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${
                  path.readiness.includes('Ready') 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {path.readiness}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
