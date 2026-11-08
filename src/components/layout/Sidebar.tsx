"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ChevronLeft,
  Wallet,
  Building2,
  Receipt,
  ShieldCheck
} from 'lucide-react';

const menuGroups = [
  {
    title: 'Main Menu',
    items: [
      { id: 'overview', label: 'Overview', href: '/overview', icon: <LayoutDashboard size={20} /> },
      { id: 'inventory', label: 'Inventory', href: '/inventory', icon: <Car size={20} /> },
      { id: 'sales', label: 'Sales & Deals', href: '/deals', icon: <FileText size={20} /> },
      { id: 'finance', label: 'Finance', href: '/finance', icon: <Wallet size={20} /> },
    ]
  },
  {
    title: 'Management',
    items: [
      { id: 'customers', label: 'Customers', href: '/customers', icon: <Users size={20} /> },
      { id: 'service', label: 'Service Center', href: '/service', icon: <Wrench size={20} /> },
      { id: 'fleet', label: 'Company Fleet', href: '/fleet', icon: <Building2 size={20} /> },
      { id: 'invoices', label: 'Invoices', href: '/invoices', icon: <Receipt size={20} /> },
      { id: 'reports', label: 'Reports', href: '/reports', icon: <PieChart size={20} /> },
    ]
  },
  {
    title: 'Administration',
    items: [
      { id: 'staff', label: 'Staff & Access', href: '/staff', icon: <ShieldCheck size={20} /> },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside 
      className={`fixed left-4 top-4 z-40 h-[calc(100vh-2rem)] bg-white rounded-[2rem] shadow-sm border border-neutral-100 flex flex-col overflow-hidden transition-all duration-200 ${
        isMinimized ? 'w-[88px]' : 'w-[280px]'
      }`}
    >
      
      {/* 1. Logo Area & Toggle Button */}
      <div className="p-6 pb-6 border-b border-neutral-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-red-600/20 shrink-0">
            C
          </div>
          
          {/* Minimize නොකළ විට නම පෙන්වයි */}
          {!isMinimized && (
            <div className="block">
              <h1 className="text-xl font-bold leading-tight text-neutral-900 tracking-tight">Carvia</h1>
              <p className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase mt-0.5">Dealership</p>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button 
          type="button"
          onClick={() => setIsMinimized(!isMinimized)}
          className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          title={isMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
        >
          {isMinimized ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* 2. Main Navigation */}
      <div className="flex-1 px-3 py-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
        {menuGroups.map((group, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            {!isMinimized && (
              <p className="px-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                {group.title}
              </p>
            )}
            
            {group.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/overview' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  title={isMinimized ? item.label : ""}
                  className={`w-full flex items-center justify-between px-3.5 py-3.5 rounded-2xl font-medium transition-all ${
                    isActive 
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                      : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={isActive ? "text-white shrink-0" : "text-neutral-500 shrink-0"}>
                      {item.icon}
                    </div>
                    
                    {/* Minimize නොකළ විට label එක පෙන්වයි */}
                    {!isMinimized && (
                      <span className={`text-sm font-bold ${isActive ? "text-white" : "text-neutral-600"}`}>
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!isMinimized && isActive && <ChevronRight size={16} className="text-white shrink-0" />}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* 3. Bottom Actions */}
      <div className="p-3 border-t border-neutral-100 flex flex-col gap-2">
        <Link 
          href="/settings" 
          title={isMinimized ? "Settings" : ""}
          className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-2xl font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
        >
          <div className="shrink-0 text-neutral-500"><Settings size={20} /></div>
          {!isMinimized && <span className="text-sm font-bold text-neutral-600">Settings</span>}
        </Link>
        
        {/* User Profile / Logout */}
        <div className={`mt-1 p-2.5 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center ${isMinimized ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <img 
              src="https://i.pravatar.cc/150?img=33" 
              alt="Admin" 
              className="w-9 h-9 rounded-full border border-neutral-200 shrink-0 object-cover"
            />
            {!isMinimized && (
              <div className="text-left truncate">
                <p className="text-xs font-bold text-neutral-900 leading-none truncate">Alex Mercer</p>
                <p className="text-[10px] text-neutral-500 font-medium mt-1 truncate">General Manager</p>
              </div>
            )}
          </div>
          
          {!isMinimized && (
            <Link href="/login" className="w-8 h-8 flex items-center justify-center rounded-xl text-neutral-400 hover:bg-white hover:text-red-600 hover:shadow-xs transition-all shrink-0">
              <LogOut size={16} />
            </Link>
          )}
        </div>
      </div>

    </aside>
  );
}