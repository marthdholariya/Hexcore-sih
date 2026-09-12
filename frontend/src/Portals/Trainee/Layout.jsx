// src/Portals/Trainee/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';

export default function TraineeLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      <Sidebar />
      {/* Fixed: Matched margin lg:ml-64 with w-64 sidebar width */}
      <div className="flex-1 lg:ml-64 min-w-0 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
       
      </div>
    </div>
  );
}