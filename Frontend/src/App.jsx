// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// // Import Shell Layout
// import TraineeLayout from './Portals/Trainee/Layout';

// // Import Pages
// import Dashboard from './Portals/Trainee/Pages/Dashboard';
// import MyProfile from './Portals/Trainee/Pages/MyProfile';

// // Placeholder component for pages under development
// const PlaceholderPage = ({ title }) => (
//   <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
//     <h2 className="text-xl font-bold text-slate-900">{title}</h2>
//     <p className="text-xs text-slate-500 mt-2">This module is under development.</p>
//   </div>
// );

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Redirect root path directly to trainee dashboard */}
//         <Route path="/" element={<Navigate to="/trainee/dashboard" replace />} />

//         {/* Trainee Portal Routes with Shared Layout */}
//         <Route path="/trainee" element={<TraineeLayout />}>
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="profile" element={<PlaceholderPage title="My Profile" />} />
//           <Route path="training" element={<PlaceholderPage title="Training & Certifications" />} />
//           <Route path="employment" element={<PlaceholderPage title="Employment & Evidence" />} />
//           <Route path="surveys" element={<PlaceholderPage title="Follow-up Surveys" />} />
//           <Route path="passport" element={<PlaceholderPage title="Skill Passport" />} />
//           <Route path="recommendations" element={<PlaceholderPage title="Smart Recommendations" />} />
//         </Route>

//         {/* Fallback for unknown routes */}
//         <Route path="*" element={<Navigate to="/trainee/dashboard" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Shell Layout
// import TraineeLayout from "./Portals/Trainee/Layout";

// // Pages
// import Dashboard from "./Portals/Trainee/Pages/Dashboard";
// import MyProfile from "./Portals/Trainee/Pages/MyProfile";
// import TrainingCertification from "./Portals/Trainee/Pages/TrainingCertification";
// import EmploymentEvidence from "./Portals/Trainee/Pages/EmploymentEvidence";
// import FollowUp from "./Portals/Trainee/Pages/FollowUp";
// import SkillPassport from "./Portals/Trainee/Pages/SkillPassport";
// import AiJobMatching from "./Portals/Trainee/Pages/AiJobMatching";
// import SmartRecommendations from "./Portals/Trainee/Pages/SmartRecommendations";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Default Redirect */}
//         <Route path="/" element={<Navigate to="/trainee/dashboard" replace />} />

//         {/* Trainee Portal Routes */}
//         <Route path="/trainee" element={<TraineeLayout />}>
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="profile" element={<MyProfile />} />
//           <Route path="training" element={<TrainingCertification />} />
//           <Route path="employment" element={<EmploymentEvidence />} />
//           <Route path="passport" element={<SkillPassport />} />
//           <Route path="surveys" element={<FollowUp />} />
//           <Route path="job-matching" element={<AiJobMatching />} />
//           <Route path="recommendations" element={<SmartRecommendations />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Auth Context & Guards
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";

// Layouts
import TraineeLayout from "./Portals/Trainee/Layout";
import ProviderLayout from "./Portals/Provider/Layout";
import EmployerLayout from "./Portals/Employer/Layout";
import Layout from "./Portals/Admin/Layout";

// Trainee Portal Pages
import TraineeDashboard from "./Portals/Trainee/Pages/Dashboard";
import MyProfile from "./Portals/Trainee/Pages/MyProfile";
import TraineeTrainingCertification from "./Portals/Trainee/Pages/TrainingCertification";
import EmploymentEvidence from "./Portals/Trainee/Pages/EmploymentEvidence";
import SkillPassport from "./Portals/Trainee/Pages/SkillPassport";
import FollowUp from "./Portals/Trainee/Pages/FollowUp";
import AiJobMatching from "./Portals/Trainee/Pages/AiJobMatching";
import SmartRecommendations from "./Portals/Trainee/Pages/SmartRecommendations";

// Provider Portal Pages
import ProviderDashboard from "./Portals/Provider/Pages/Dashboard";
import ProviderTrainingCertification from "./Portals/Provider/Pages/TrainingCertification";
import SkillGapAnalytics from "./Portals/Provider/Pages/SkillGapAnalytics";
import NonPlacementAnalysis from "./Portals/Provider/Pages/NonPlacementAnalysis";
import EffectivenessScore from "./Portals/Provider/Pages/EffectivenessScore";
import JobMarketIntelligence from "./Portals/Provider/Pages/JobMarketIntelligence";
import SmartRecommendationsProvider from "./Portals/Provider/Pages/SmartRecommendation";

// Employer Portal Pages
import EmployerDashboard from "./Portals/Employer/Pages/Dashboard";
import EmployerProfile from "./Portals/Employer/Pages/EmployerProfile";
import EmploymentVerification from "./Portals/Employer/Pages/EmploymentVerification";
import EmployerEvidence from "./Portals/Employer/Pages/EmploymentEvidence";
import AiJobMatchingEmployer from "./Portals/Employer/Pages/JobMatching";
import MarketIntelligence from "./Portals/Employer/Pages/MarketIntelligence";

// Admin Portal Pages
import AdminDashboard from "./Portals/Admin/Pages/Dashboard";
import AdminEmployerVerification from "./Portals/Admin/Pages/EmployerVeri";
import EmploymentEvidenceAdmin from "./Portals/Admin/Pages/EmploymentEvidence";
import FollowUpSys from "./Portals/Admin/Pages/FollowUpSys";
import SRecommendation from "./Portals/Admin/Pages/SRecommendation";
import TrainingCertificationAdmin from "./Portals/Admin/Pages/TrainingCerti";
import WhatIfSimulator from "./Portals/Admin/Pages/WhatIf";
import EffectivenessScoreAdmin from "./Portals/Admin/Pages/TrainingEffect";
import SkillGapDetection from "./Portals/Admin/Pages/AiSkillGapDet";
import NonplacAttrition from "./Portals/Admin/Pages/NonplacAttrition";
import SkillPassportOversight from "./Portals/Admin/Pages/SkillPass";
import JobMarketDemand from "./Portals/Admin/Pages/JobMarketDemand";

// Helper component that always opens Login screen on visit
function PublicLoginRoute() {
  const { login } = useAuth();
  return <Login onLogin={login} />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Login Entry Point - Always displays first */}
          <Route path="/" element={<PublicLoginRoute />} />
          <Route path="/login" element={<PublicLoginRoute />} />

          {/* ================= TRAINEE PORTAL ================= */}
          <Route element={<ProtectedRoute allowedRole="Trainee" />}>
            <Route path="/trainee" element={<TraineeLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<TraineeDashboard />} />
              <Route path="profile" element={<MyProfile />} />
              <Route path="training" element={<TraineeTrainingCertification />} />
              <Route path="employment" element={<EmploymentEvidence />} />
              <Route path="passport" element={<SkillPassport />} />
              <Route path="surveys" element={<FollowUp />} />
              <Route path="job-matching" element={<AiJobMatching />} />
              <Route path="recommendations" element={<SmartRecommendations />} />
            </Route>
          </Route>

          {/* ================= PROVIDER PORTAL ================= */}
          <Route element={<ProtectedRoute allowedRole="Provider" />}>
            <Route path="/provider" element={<ProviderLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<ProviderDashboard />} />
              <Route path="training" element={<ProviderTrainingCertification />} />
              <Route path="skill-gaps" element={<SkillGapAnalytics />} />
              <Route path="non-placement" element={<NonPlacementAnalysis />} />
              <Route path="effectiveness" element={<EffectivenessScore />} />
              <Route path="JobMarketIntelligence" element={<JobMarketIntelligence />} />
              <Route path="recommendations" element={<SmartRecommendationsProvider />} />
            </Route>
          </Route>

          {/* ================= EMPLOYER PORTAL ================= */}
          <Route element={<ProtectedRoute allowedRole="Employer" />}>
            <Route path="/employer" element={<EmployerLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<EmployerDashboard />} />
              <Route path="profile" element={<EmployerProfile />} />
              <Route path="verification" element={<EmploymentVerification />} />
              <Route path="evidence" element={<EmployerEvidence />} />
              <Route path="ai-job-matching" element={<AiJobMatchingEmployer />} />
              <Route path="job-market-intelligence" element={<MarketIntelligence />} />
            </Route>
          </Route>

          {/* ================= ADMIN PORTAL ================= */}
          <Route element={<ProtectedRoute allowedRole="Admin" />}>
            <Route path="/Admin" element={<Layout />}>
              <Route index element={<Navigate to="/Admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="EmployerVeri" element={<AdminEmployerVerification />} />
              <Route path="employment-evidence" element={<EmploymentEvidenceAdmin />} />
              <Route path="training-certification" element={<TrainingCertificationAdmin />} />
              <Route path="skill-passport" element={<SkillPassportOversight />} />
              <Route path="follow-up-system" element={<FollowUpSys />} />
              <Route path="effectiveness-score" element={<EffectivenessScoreAdmin />} />
              <Route path="what-if-simulator" element={<WhatIfSimulator />} />
              <Route path="market-intelligence" element={<JobMarketDemand />} />
              <Route path="skill-gap-detection" element={<SkillGapDetection />} />
              <Route path="predictions" element={<NonplacAttrition />} />
              <Route path="attrition-analysis" element={<NonplacAttrition />} />
              <Route path="smart-recommendations" element={<SRecommendation />} />
            </Route>
          </Route>

          {/* Catch-all route returns to Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}