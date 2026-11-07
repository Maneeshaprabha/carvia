"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  FileText, 
  Wrench, 
  PieChart,
  Settings, 
  LogOut,
  ChevronRight,
  Wallet,
  Building2,
  Receipt,
  ShieldCheck
} from 'lucide-react';

const menuGroups = [
  {
    title: 'Main Menu',
    items: [
      { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
      { id: 'inventory', label: 'Inventory', icon: <Car size={20} /> },
      { id: 'sales', label: 'Sales & Deals', icon: <FileText size={20} /> },
      { id: 'finance', label: 'Finance', icon: <Wallet size={20} /> },
    ]
  },
  {
    title: 'Management',
    items: [
      { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
      { id: 'service', label: 'Service Center', icon: <Wrench size={20} /> },
      { id: 'fleet', label: 'Company Fleet', icon: <Building2 size={20} /> },
      { id: 'invoices', label: 'Invoices', icon: <Receipt size={20} /> },
      { id: 'reports', label: 'Reports', icon: <PieChart size={20} /> },
    ]
  },
  {
    title: 'Administration',
    items: [
      { id: 'staff', label: 'Staff & Access', icon: <ShieldCheck size={20} /> },
    ]
  }
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('overview');

  return (
    // Added flex-shrink-0, sticky, and top-4 to lock it in place
    <aside className="w-[280px] flex-shrink-0 sticky top-4 h-[calc(100vh-2rem)] my-4 ml-4 bg-white rounded-[2rem] shadow-sm border border-neutral-100 flex flex-col overflow-hidden">
      
      {/* 1. Logo Area */}
      <div className="p-8 pb-6 border-b border-neutral-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-red-600/20">
          C
        </div>
        <div>
          <h1 className="text-xl font-bold leading-tight text-neutral-900 tracking-tight">Carvia</h1>
          <p className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase mt-0.5">Dealership</p>
        </div>
      </div>

      {/* 2. Main Navigation */}
      <div className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
        {menuGroups.map((group, index) => (
          <div key={index} className="flex flex-col gap-2">
            <p className="px-4 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
              {group.title}
            </p>
            
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium transition-all ${
                  activeItem === item.id 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
                {activeItem === item.id && <ChevronRight size={16} className="text-red-200" />}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* 3. Bottom Actions */}
      <div className="p-4 border-t border-neutral-100 flex flex-col gap-2">
        <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors">
          <Settings size={20} />
          <span className="text-sm">Settings</span>
        </button>
        
        {/* User Profile / Logout Snippet */}
        <div className="mt-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.pravatar.cc/150?img=33" 
              alt="Admin" 
              className="w-9 h-9 rounded-full border border-neutral-200"
            />
            <div className="text-left">
              <p className="text-sm font-bold text-neutral-900 leading-none">Alex Mercer</p>
              <p className="text-[10px] text-neutral-500 font-medium mt-1">General Manager</p>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-xl text-neutral-400 hover:bg-white hover:text-red-600 hover:shadow-sm transition-all">
            <LogOut size={16} />
          </button>
        </div>
      </div>

    </aside>
  );
}