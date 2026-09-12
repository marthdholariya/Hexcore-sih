import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './Components/Sidebar';
import AdminHeader from './Components/Header';
import AdminFooter from './Components/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      <AdminSidebar />
      {/* lg:ml-64 offsets the main content area by 256px so it starts immediately after the sidebar */}
      <div className="flex-1 lg:ml-64 min-w-0 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}