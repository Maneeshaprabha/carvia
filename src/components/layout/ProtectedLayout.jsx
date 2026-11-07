import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path if needed

export default function ProtectedLayout() {
  return (
    // 1. The 'flex' class here is the magic fix that puts them side-by-side
    <div className="flex min-h-screen bg-[#f8f9fc] overflow-hidden">
      
      {/* 2. The Sidebar stays fixed on the left */}
      <Sidebar />
      
      {/* 3. The Outlet wrapper takes up the remaining space and handles scrolling */}
      <main className="flex-1 h-screen overflow-y-auto w-full">
        <div className="p-4 md:p-6 w-full">
          <Outlet />
        </div>
      </main>

    </div>
  );
}