import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Footer from './Components/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Fixed Dark Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
        <Header />
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}