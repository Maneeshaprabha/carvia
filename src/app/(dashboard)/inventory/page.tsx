"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // <--- Next.js Link එක import කළා
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Gauge, 
  Settings2, 
  MoreHorizontal, 
  X,
  Phone,
  FileText,
  Plus // <--- Plus icon එක import කළා
} from 'lucide-react';

const inventoryData = [
  { 
    id: '#VIN-88210', make: 'Porsche', model: '911 GT3', year: 2024, price: 185000, 
    status: 'Available', mileage: '120 mi', color: 'Guards Red', engine: '4.0L Flat-6', 
    location: 'Showroom Floor A', dateAdded: 'Oct 05, 2026', rep: 'Alex Mercer',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: '#VIN-55092', make: 'Tesla', model: 'Model S Plaid', year: 2024, price: 89990, 
    status: 'Reserved', mileage: '45 mi', color: 'Solid Black', engine: 'Tri-Motor AWD', 
    location: 'Delivery Bay 1', dateAdded: 'Oct 12, 2026', rep: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: '#VIN-33411', make: 'BMW', model: 'X5 M Comp', year: 2023, price: 122000, 
    status: 'Available', mileage: '5,200 mi', color: 'Alpine White', engine: '4.4L V8 Twin-Turbo', 
    location: 'Lot B, Row 3', dateAdded: 'Sep 28, 2026', rep: 'David Kim',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: '#VIN-99021', make: 'Mercedes', model: 'G-Class', year: 2024, price: 143000, 
    status: 'Sold', mileage: '12 mi', color: 'Obsidian Black', engine: '4.0L V8 Biturbo', 
    location: 'Customer Prep', dateAdded: 'Oct 01, 2026', rep: 'Alex Mercer',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: '#VIN-11204', make: 'Audi', model: 'RS6 Avant', year: 2022, price: 109500, 
    status: 'In Transit', mileage: '14,000 mi', color: 'Nardo Gray', engine: '4.0L V8', 
    location: 'En Route (Port)', dateAdded: 'Oct 18, 2026', rep: 'Marcus Cole',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80'
  },
];

const tabs = [
  { name: 'All', count: 243 },
  { name: 'Available', count: 56 },
  { name: 'Reserved', count: 21 },
  { name: 'In Transit', count: 14 },
  { name: 'Sold', count: 36 },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
};

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Available': return 'bg-[#34d399] text-white'; 
    case 'Reserved': return 'bg-[#fbbf24] text-[#78350f]'; 
    case 'In Transit': return 'bg-[#38bdf8] text-[#082f49]'; 
    case 'Sold': return 'bg-[#e5e7eb] text-[#374151]'; 
    default: return 'bg-[#f3f4f6] text-[#4b5563]';
  }
};

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState(inventoryData[0]);

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-6 overflow-hidden">
      
      {/* LEFT PANEL: Master List (Grid) */}
      <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-[#e5e7eb] shadow-sm overflow-hidden">
        
        {/* Header, Search & Add Vehicle Button */}
        <div className="p-6 pb-4 border-b border-[#f3f4f6] flex items-center justify-between gap-4 bg-white z-10">
          <div>
            <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">Inventory</h1>
            <p className="text-xs text-neutral-500 font-medium mt-0.5">Manage dealership stock and vehicles</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
              <input 
                type="text" 
                placeholder="Search vehicles..." 
                className="w-full pl-9 pr-4 py-2.5 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl text-sm focus:outline-none focus:border-[#e60000] transition-all text-[#111827]"
              />
            </div>
            
            <button className="p-2.5 border border-[#e5e7eb] rounded-xl text-[#6b7280] hover:bg-[#f9fafb] transition-colors">
              <Filter size={18} />
            </button>

            {/* ADD VEHICLE BUTTON */}
            <Link 
              href="/inventory/add" 
              className="flex items-center gap-2 bg-[#e60000] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-md shadow-red-600/20 text-sm whitespace-nowrap"
            >
              <Plus size={18} /> Add Vehicle
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-3 border-b border-[#f3f4f6] flex gap-6 bg-white overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => (
            <button 
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 pb-3 border-b-[3px] transition-colors whitespace-nowrap ${
                activeTab === tab.name ? 'border-[#e60000] text-[#111827]' : 'border-transparent text-[#9ca3af] hover:text-[#4b5563]'
              }`}
            >
              <span className="font-bold text-[13px]">{tab.name}</span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                activeTab === tab.name ? 'bg-[#f3f4f6] text-[#111827]' : 'bg-[#f9fafb] text-[#9ca3af]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Vehicle Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f9fafb] custom-scrollbar">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {inventoryData.map((vehicle) => (
              <motion.div 
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`p-5 rounded-[1.25rem] border-[1.5px] transition-all cursor-pointer bg-white flex flex-col justify-between h-[180px] ${
                  selectedVehicle.id === vehicle.id 
                    ? 'border-[#e60000] shadow-md ring-4 ring-red-600/10' 
                    : 'border-[#f3f4f6] hover:border-[#e60000]/40 shadow-sm'
                }`}
              >
                {/* Card Top: ID & Status */}
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-extrabold text-[#111827]">{vehicle.id}</span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>
                
                {/* Card Bottom: Info & Real Car Image */}
                <div className="flex justify-between items-end gap-3">
                  <div>
                    <p className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider mb-0.5">
                      {vehicle.year} {vehicle.make}
                    </p>
                    <h3 className="text-base font-extrabold text-[#111827] leading-tight mb-1">
                      {vehicle.model}
                    </h3>
                    <p className="text-sm font-bold text-[#6b7280]">
                      {formatCurrency(vehicle.price)}
                    </p>
                  </div>
                  {/* Real Car Image */}
                  <div className="w-32 h-20 bg-[#f9fafb] rounded-xl border border-[#f3f4f6] overflow-hidden relative shadow-inner">
                     <img src={vehicle.image} alt={vehicle.model} className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Details View */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedVehicle.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full lg:w-[450px] xl:w-[500px] flex flex-col bg-white rounded-[2rem] border border-[#e5e7eb] shadow-sm overflow-hidden"
        >
          {/* Detail Header */}
          <div className="p-6 border-b border-[#f3f4f6] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#111827]">{selectedVehicle.id}</h2>
              <p className="text-[11px] font-bold text-[#9ca3af] mt-1 uppercase tracking-wider">Added: {selectedVehicle.dateAdded}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 bg-[#f9fafb] hover:bg-[#f3f4f6] text-[#6b7280] rounded-xl transition-colors">
                <MoreHorizontal size={18} />
              </button>
              <button className="p-2.5 bg-[#f9fafb] hover:bg-[#fef2f2] hover:text-[#e60000] text-[#6b7280] rounded-xl transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            
            {/* Top Info Bar */}
            <div className="flex items-center justify-between">
               <div>
                 <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider mb-1.5">Status</p>
                 <span className={`text-[11px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider ${getStatusColor(selectedVehicle.status)}`}>
                   {selectedVehicle.status}
                 </span>
               </div>
               <div className="text-right">
                 <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider mb-1">Listing Price</p>
                 <p className="text-2xl font-extrabold text-[#111827]">{formatCurrency(selectedVehicle.price)}</p>
               </div>
            </div>

            {/* Main Image Area */}
            <div className="w-full h-52 bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] overflow-hidden relative shadow-sm">
               <img src={selectedVehicle.image} alt={selectedVehicle.model} className="w-full h-full object-cover" />
               <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-[#111827] border border-[#e5e7eb] shadow-sm">
                 {selectedVehicle.color}
               </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f9fafb] p-4 rounded-2xl border border-[#f3f4f6]">
                <div className="flex items-center gap-2 text-[#6b7280] mb-2">
                  <Gauge size={16} /> <span className="text-[10px] font-bold uppercase tracking-wider">Mileage</span>
                </div>
                <p className="font-bold text-[#111827]">{selectedVehicle.mileage}</p>
              </div>
              <div className="bg-[#f9fafb] p-4 rounded-2xl border border-[#f3f4f6]">
                <div className="flex items-center gap-2 text-[#6b7280] mb-2">
                  <Settings2 size={16} /> <span className="text-[10px] font-bold uppercase tracking-wider">Engine</span>
                </div>
                <p className="font-bold text-[#111827] text-sm truncate">{selectedVehicle.engine}</p>
              </div>
            </div>

            {/* Location / Tracking Block */}
            <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider mb-1">Current Location</p>
                  <p className="font-bold text-[#111827] text-sm">{selectedVehicle.location}</p>
                </div>
                <button className="flex items-center gap-2 bg-[#111827] text-white px-3 py-2 rounded-lg text-[11px] font-bold hover:bg-black transition-colors">
                  <MapPin size={14} /> Map View
                </button>
              </div>
              
              <div className="border-t border-[#f3f4f6] pt-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider mb-1.5">Sales Rep Assigned</p>
                  <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/150?img=11" className="w-7 h-7 rounded-full border border-[#e5e7eb]" alt="Rep" />
                    <span className="font-bold text-sm text-[#111827]">{selectedVehicle.rep}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#6b7280] hover:bg-[#f9fafb] transition-colors">
                    <Phone size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Detailed Inspection Specs */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#f3f4f6] bg-[#f9fafb]">
                <h3 className="text-[11px] font-bold text-[#111827] uppercase tracking-wider">Vehicle Details</h3>
              </div>
              <div className="grid grid-cols-2 p-5 gap-y-5 gap-x-4 text-sm">
                <div>
                  <p className="text-[#6b7280] text-[11px] font-bold uppercase tracking-wider mb-1">Make & Model</p>
                  <p className="font-bold text-[#111827]">{selectedVehicle.make} {selectedVehicle.model}</p>
                </div>
                <div>
                  <p className="text-[#6b7280] text-[11px] font-bold uppercase tracking-wider mb-1">Year</p>
                  <p className="font-bold text-[#111827]">{selectedVehicle.year}</p>
                </div>
                <div>
                  <p className="text-[#6b7280] text-[11px] font-bold uppercase tracking-wider mb-1">Drivetrain</p>
                  <p className="font-bold text-[#111827]">AWD</p>
                </div>
                <div>
                  <p className="text-[#6b7280] text-[11px] font-bold uppercase tracking-wider mb-1">Keys</p>
                  <p className="font-bold text-[#111827]">2 Sets</p>
                </div>
              </div>
            </div>

          </div>
          
          {/* Sticky Bottom Actions */}
          <div className="p-5 border-t border-[#f3f4f6] bg-white grid grid-cols-2 gap-3">
             <button className="py-3.5 px-4 border border-[#e5e7eb] rounded-xl font-bold text-[#4b5563] hover:bg-[#f9fafb] text-sm transition-colors">
               Edit Vehicle
             </button>
             <button className="py-3.5 px-4 bg-[#e60000] rounded-xl font-bold text-white hover:bg-red-700 shadow-md shadow-red-600/20 text-sm transition-colors flex items-center justify-center gap-2">
               <FileText size={16} /> Start Deal
             </button>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}