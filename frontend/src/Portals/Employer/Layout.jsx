import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployerSidebar from './Components/Sidebar';
import EmployerHeader from './Components/Header';
import EmployerFooter from './Components/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      <EmployerSidebar />
      <div className="flex-1 lg:ml-64 min-w-0 flex flex-col min-h-screen">
        <EmployerHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <EmployerFooter />
      </div>
    </div>
  );
}