"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, SlidersHorizontal, MapPin, MoreHorizontal, X, Phone, Mail, 
  FileText, Plus, Copy, Check, Calendar, Car, DollarSign, Gauge, ArrowUpRight
} from 'lucide-react';

const initialInventoryData = [
  { id: '#VIN-88210', make: 'Porsche', model: '911 GT3 RS', year: 2024, price: 241300, status: 'Available', stage: 2, mileage: '120 mi', color: 'Guards Red', engine: '4.0L Flat-6 NA', drivetrain: 'RWD', fuel: 'Petrol', keys: '2 Sets', condition: 99, daysInStock: 12, location: 'Showroom Floor • Zone A4', dateAdded: 'Oct 25, 2026', rep: 'Alex Mercer', repRole: 'Senior Sales Executive', repAvatar: 'https://i.pravatar.cc/150?img=33', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=85' },
  { id: '#VIN-55092', make: 'Tesla', model: 'Model S Plaid', year: 2024, price: 89990, status: 'Reserved', stage: 3, mileage: '45 mi', color: 'Obsidian Black', engine: 'Tri-Motor 1,020 hp', drivetrain: 'AWD', fuel: 'Electric', keys: '2 Key Cards', condition: 100, daysInStock: 5, location: 'Delivery Bay 1 • VIP', dateAdded: 'Nov 02, 2026', rep: 'Sarah Jenkins', repRole: 'EV Specialist', repAvatar: 'https://i.pravatar.cc/150?img=47', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=85' },
  { id: '#VIN-33411', make: 'BMW', model: 'M5 Competition', year: 2023, price: 118500, status: 'Available', stage: 2, mileage: '4,200 mi', color: 'Alpine White', engine: '4.4L V8 Twin-Turbo', drivetrain: 'M xDrive', fuel: 'Petrol', keys: '2 Sets + Display', condition: 96, daysInStock: 19, location: 'North Lot • Row B3', dateAdded: 'Oct 18, 2026', rep: 'David Kim', repRole: 'Sales Advisor', repAvatar: 'https://i.pravatar.cc/150?img=12', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=85' },
  { id: '#VIN-99021', make: 'Mercedes-AMG', model: 'G 63 Wagon', year: 2024, price: 184900, status: 'Sold', stage: 4, mileage: '18 mi', color: 'Night Black Magno', engine: '4.0L V8 Biturbo', drivetrain: '4MATIC', fuel: 'Petrol', keys: '2 Sets', condition: 100, daysInStock: 3, location: 'Customer Handover Lounge', dateAdded: 'Nov 04, 2026', rep: 'Alex Mercer', repRole: 'Senior Sales Executive', repAvatar: 'https://i.pravatar.cc/150?img=33', image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&auto=format&fit=crop&q=85' },
  { id: '#VIN-11204', make: 'Audi', model: 'RS6 Avant GT', year: 2024, price: 136800, status: 'In Transit', stage: 1, mileage: '15 mi', color: 'Nardo Gray', engine: '4.0L TFSI V8', drivetrain: 'Quattro AWD', fuel: 'Hybrid / Petrol', keys: '2 Sets', condition: 98, daysInStock: 2, location: 'En Route • Carrier #TX-452', dateAdded: 'Nov 05, 2026', rep: 'Marcus Cole', repRole: 'Fleet Coordinator', repAvatar: 'https://i.pravatar.cc/150?img=68', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=85' },
  { id: '#VIN-77419', make: 'Lamborghini', model: 'Huracán Sterrato', year: 2024, price: 278900, status: 'Available', stage: 2, mileage: '95 mi', color: 'Verde Gea Matte', engine: '5.2L V10 NA', drivetrain: 'AWD', fuel: 'Petrol', keys: '2 Sets', condition: 100, daysInStock: 8, location: 'Showroom Centerpiece', dateAdded: 'Oct 29, 2026', rep: 'Sarah Jenkins', repRole: 'Exotics Specialist', repAvatar: 'https://i.pravatar.cc/150?img=47', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=85' },
];

const pipelineSteps = ['Inbound', 'Inspected', 'Showroom', 'Reserved', 'Sold'];
const formatCurrency = (val: number) => `$${val.toLocaleString('en-US')}`;

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'Available': return 'bg-[#bbf7d0] text-[#14532d] border border-[#86efac]/60';
    case 'Reserved': return 'bg-[#fde68a] text-[#78350f] border border-[#fcd34d]/60';
    case 'In Transit': return 'bg-[#a5f3fc] text-[#164e63] border border-[#67e8f9]/60';
    case 'Sold': return 'bg-[#e5e7eb] text-[#374151] border border-[#d1d5db]';
    default: return 'bg-neutral-100 text-neutral-700';
  }
};

export default function InventoryPage() {
  const [mounted, setMounted] = useState(false);
  const [vehicles, setVehicles] = useState(initialInventoryData);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(initialInventoryData[0]);
  const [copiedVin, setCopiedVin] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newCar, setNewCar] = useState({
    vin: '#VIN-60412', make: 'Porsche', model: '911 Carrera GTS', year: '2025', price: '164900',
    status: 'Available', mileage: '15 mi', color: 'Carmine Red', engine: '3.6L Flat-6',
    drivetrain: 'RWD', keys: '2 Sets', location: 'Showroom Floor • Zone A2',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=85'
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesTab = activeTab === 'All' || v.status === activeTab;
      const q = searchQuery.toLowerCase();
      return matchesTab && (v.id.toLowerCase().includes(q) || v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || v.location.toLowerCase().includes(q));
    });
  }, [vehicles, activeTab, searchQuery]);

  const tabs = [
    { name: 'All', count: vehicles.length },
    { name: 'Available', count: vehicles.filter(v => v.status === 'Available').length },
    { name: 'Reserved', count: vehicles.filter(v => v.status === 'Reserved').length },
    { name: 'In Transit', count: vehicles.filter(v => v.status === 'In Transit').length },
    { name: 'Sold', count: vehicles.filter(v => v.status === 'Sold').length },
  ];

  const handleCopyVin = (vin: string) => {
    navigator.clipboard.writeText(vin);
    setCopiedVin(true);
    setTimeout(() => setCopiedVin(false), 1800);
  };

  const handleAddVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: newCar.vin.startsWith('#') ? newCar.vin : `#${newCar.vin}`,
      make: newCar.make || 'Porsche', model: newCar.model || '911 Carrera', year: Number(newCar.year) || 2025,
      price: Number(newCar.price) || 120000, status: newCar.status,
      stage: newCar.status === 'Available' ? 2 : newCar.status === 'Reserved' ? 3 : 1,
      mileage: newCar.mileage || '0 mi', color: newCar.color || 'Alpine White', engine: newCar.engine || '4.0L V8',
      drivetrain: newCar.drivetrain || 'AWD', fuel: 'Petrol', keys: newCar.keys || '2 Sets',
      condition: 100, daysInStock: 1, location: newCar.location || 'Showroom Floor A', dateAdded: 'Nov 08, 2026',
      rep: 'Alex Mercer', repRole: 'Senior Sales Executive', repAvatar: 'https://i.pravatar.cc/150?img=33', image: newCar.image
    };
    setVehicles([created, ...vehicles]);
    setSelectedVehicle(created);
    setIsAddModalOpen(false);
  };

  if (!mounted) return null;

  return (
    <div suppressHydrationWarningclassName="flex h-[calc(100vh-2rem)] w-full bg-white rounded-[2rem] shadow-sm border border-neutral-100 overflow-hidden select-none" >
      
      {/* LEFT PANEL */}
      <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="px-7 pt-6 pb-4 flex flex-wrap items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <h1 className="text-[26px] font-extrabold text-neutral-900 tracking-tight">Inventory</h1>
            <span className="px-2.5 py-1 bg-red-50 text-[#e60000] font-extrabold text-xs rounded-full border border-red-100">Live Stock</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input 
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search VIN, model, or lot..." 
                className="w-full pl-10 pr-8 py-2.5 bg-[#f8f9fa] border border-neutral-200/80 rounded-xl text-xs font-semibold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#e60000] transition-all"
              />
              {searchQuery && <button type="button" onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"><X size={14} /></button>}
            </div>
            <button type="button" className="p-2.5 bg-[#f8f9fa] border border-neutral-200/80 rounded-xl text-neutral-600 hover:bg-neutral-100"><SlidersHorizontal size={16} /></button>
            <button type="button" onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-[#e60000] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all shadow-md shadow-red-600/20 text-xs cursor-pointer">
              <Plus size={16} strokeWidth={2.5} /> Add Vehicle
            </button>
          </div>
        </div>

        <div className="px-7 border-b border-neutral-100 flex items-center gap-6 bg-white overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button type="button" key={tab.name} onClick={() => setActiveTab(tab.name)} className={`flex items-center gap-2 py-3 border-b-2 transition-all whitespace-nowrap ${isActive ? 'border-[#e60000] text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-700'}`}>
                <span className="font-extrabold text-[13px]">{tab.name}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${isActive ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500'}`}>{tab.count}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-[#f6f7f9] custom-scrollbar">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredVehicles.map((vehicle) => {
              const isSelected = selectedVehicle.id === vehicle.id;
              return (
                <motion.div layout key={vehicle.id} onClick={() => setSelectedVehicle(vehicle)} className={`p-5 rounded-2xl transition-all cursor-pointer bg-white flex flex-col justify-between relative overflow-hidden group ${isSelected ? 'border-2 border-[#e60000] shadow-md ring-4 ring-[#e60000]/10' : 'border border-neutral-200/70 hover:border-[#e60000]/50 shadow-2xs'}`}>
                  <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-extrabold text-neutral-900">{vehicle.id}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#e60000] animate-pulse" />}
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md ${getStatusBadge(vehicle.status)}`}>{vehicle.status}</span>
                  </div>
                  <div className="pt-3.5 flex justify-between items-end gap-3">
                    <div className="space-y-2.5 flex-1 min-w-0">
                      <div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase">{vehicle.year} • {vehicle.make}</p>
                        <h3 className="text-[15px] font-extrabold text-neutral-900 truncate">{vehicle.model}</h3>
                        <p className="text-[11px] font-medium text-neutral-500 truncate mt-0.5">{vehicle.location}</p>
                      </div>
                      <div className="flex items-center gap-4 pt-1">
                        <div>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase">Price</p>
                          <p className="text-xs font-extrabold text-neutral-900">{formatCurrency(vehicle.price)}</p>
                        </div>
                        <div className="h-6 w-[1px] bg-neutral-100" />
                        <div>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase">Assigned To</p>
                          <p className="text-xs font-bold text-neutral-700 truncate">{vehicle.rep}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-36 h-24 rounded-xl bg-neutral-100 border border-neutral-200/60 overflow-hidden shrink-0">
                      <img src={vehicle.image} alt={vehicle.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <AnimatePresence mode="wait">
        <motion.div key={selectedVehicle.id} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} transition={{ duration: 0.2 }} className="w-full lg:w-[460px] xl:w-[510px] flex flex-col bg-white rounded-[2rem] border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-extrabold text-neutral-900">Stock {selectedVehicle.id}</h2>
              <button type="button" onClick={() => handleCopyVin(selectedVehicle.id)} className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100">
                {copiedVin ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/inventory/${selectedVehicle.id.replace('#', '')}`} className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-bold flex items-center gap-1">
                Full Page <ArrowUpRight size={13} />
              </Link>
              <button type="button" className="p-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-500 rounded-xl"><MoreHorizontal size={16} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4 bg-[#f6f7f9]">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200/70 shadow-2xs space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-md mb-2 ${getStatusBadge(selectedVehicle.status)}`}>{selectedVehicle.status}</span>
                  <h3 className="text-xl font-extrabold text-neutral-900 leading-tight">{selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}</h3>
                  <p className="text-xs font-semibold text-neutral-400 mt-0.5">{selectedVehicle.color} • Listed {selectedVehicle.dateAdded}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Retail Price</p>
                  <p className="text-xl font-extrabold text-[#e60000]">{formatCurrency(selectedVehicle.price)}</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center pt-1">
                <div className="col-span-7 space-y-3 text-xs">
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Showroom Location</p>
                    <p className="font-bold text-neutral-800 mt-0.5">{selectedVehicle.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Sales Rep</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <img src={selectedVehicle.repAvatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                      <span className="font-bold text-neutral-800">{selectedVehicle.rep}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-5 h-24 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                  <img src={selectedVehicle.image} alt={selectedVehicle.model} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100">
                <div className="relative flex items-center justify-between">
                  <div className="absolute left-0 right-0 top-1.5 h-[2px] bg-neutral-200" />
                  <div className="absolute left-0 top-1.5 h-[2px] bg-[#e60000] transition-all duration-300" style={{ width: `${(selectedVehicle.stage / (pipelineSteps.length - 1)) * 100}%` }} />
                  {pipelineSteps.map((step, idx) => {
                    const isCompleted = idx <= selectedVehicle.stage;
                    const isCurrent = idx === selectedVehicle.stage;
                    return (
                      <div key={step} className="flex flex-col items-center z-10">
                        <div className={`w-3.5 h-3.5 rounded-full border-2 ${isCurrent ? 'bg-[#e60000] border-[#e60000] ring-4 ring-red-600/20' : isCompleted ? 'bg-neutral-900 border-neutral-900' : 'bg-white border-neutral-300'}`} />
                        <span className={`text-[10px] mt-2 font-bold ${isCurrent ? 'text-neutral-900 font-extrabold' : isCompleted ? 'text-neutral-600' : 'text-neutral-400'}`}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-neutral-200/70 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-neutral-900">Inspection Metrics</span>
                  <MoreHorizontal size={14} className="text-neutral-400" />
                </div>
                <div className="flex items-center justify-between my-1">
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Odometer</p>
                    <p className="text-sm font-extrabold text-neutral-900">{selectedVehicle.mileage}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-neutral-50 border-4 border-[#e60000]">
                    <span className="text-[11px] font-extrabold text-neutral-900">{selectedVehicle.condition}%</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-neutral-400">Lot Aging</span>
                  <span className="font-extrabold text-neutral-800">{selectedVehicle.daysInStock} days</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200/70 shadow-2xs overflow-hidden flex flex-col">
                <div className="h-28 w-full relative flex items-center justify-center bg-[#eef2f6]">
                  <button type="button" className="relative z-10 flex items-center gap-1.5 bg-neutral-900 text-white px-3.5 py-2 rounded-xl text-[11px] font-bold shadow-lg hover:bg-[#e60000] transition-colors">
                    <MapPin size={13} /> Lot Map View
                  </button>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-neutral-900">Bay Telemetry</span>
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active GPS</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-medium truncate mt-1">{selectedVehicle.location}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200/70 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-neutral-900">Technical Specifications</h4>
                <span className="text-[11px] font-extrabold text-neutral-900">150-Pt Certified</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-neutral-100">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Powertrain</p>
                  <p className="font-extrabold text-neutral-900 mt-0.5 truncate">{selectedVehicle.engine}</p>
                </div>
                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-neutral-100">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Drivetrain</p>
                  <p className="font-extrabold text-neutral-900 mt-0.5">{selectedVehicle.drivetrain}</p>
                </div>
                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-neutral-100">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Keys</p>
                  <p className="font-extrabold text-neutral-900 mt-0.5">{selectedVehicle.keys}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/70 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={selectedVehicle.repAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-neutral-200" />
                <div>
                  <p className="text-xs font-extrabold text-neutral-900">{selectedVehicle.rep}</p>
                  <p className="text-[11px] font-medium text-neutral-400">{selectedVehicle.repRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="w-8 h-8 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50"><Phone size={14} /></button>
                <button type="button" className="w-8 h-8 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50"><Mail size={14} /></button>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-neutral-100 bg-white grid grid-cols-2 gap-3">
            <Link href={`/inventory/${selectedVehicle.id.replace('#', '')}`} className="py-3 px-4 border border-neutral-200 rounded-xl font-bold text-neutral-700 hover:bg-neutral-50 text-xs flex items-center justify-center">View Full Dossier</Link>
            <button type="button" className="py-3 px-4 bg-[#e60000] rounded-xl font-bold text-white hover:bg-red-700 shadow-md shadow-red-600/20 text-xs flex items-center justify-center gap-2"><FileText size={15} /> Launch Deal Desk</button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* POPUP BOX MODAL: ADD VEHICLE */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.96, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 15 }} className="w-full max-w-[900px] bg-white rounded-[2.5rem] border border-neutral-200 shadow-2xl p-7 overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#e60000] flex items-center justify-center"><Car size={20} /></div>
                  <div>
                    <h2 className="text-xl font-black text-neutral-900">Add New Vehicle</h2>
                    <p className="text-xs text-neutral-400 font-semibold">Enter vehicle details to publish to live stock</p>
                  </div>
                </div>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 cursor-pointer"><X size={16} /></button>
              </div>

              <form onSubmit={handleAddVehicleSubmit} className="mt-5 space-y-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl border border-neutral-200 p-4 flex flex-col justify-between h-[105px]">
                    <div className="flex justify-between items-center"><span className="text-[11px] font-bold text-neutral-500">Stock / VIN #</span><Car size={14} className="text-[#e60000]" /></div>
                    <input type="text" value={newCar.vin} onChange={(e) => setNewCar({...newCar, vin: e.target.value})} className="w-full text-lg font-black text-neutral-900 focus:outline-none" />
                  </div>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-4 flex flex-col justify-between h-[105px]">
                    <div className="flex justify-between items-center"><span className="text-[11px] font-bold text-neutral-500">Price ($)</span><DollarSign size={14} className="text-[#e60000]" /></div>
                    <input type="number" value={newCar.price} onChange={(e) => setNewCar({...newCar, price: e.target.value})} className="w-full text-lg font-black text-neutral-900 focus:outline-none" />
                  </div>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-4 flex flex-col justify-between h-[105px]">
                    <div className="flex justify-between items-center"><span className="text-[11px] font-bold text-neutral-500">Odometer</span><Gauge size={14} className="text-sky-500" /></div>
                    <input type="text" value={newCar.mileage} onChange={(e) => setNewCar({...newCar, mileage: e.target.value})} className="w-full text-lg font-black text-neutral-900 focus:outline-none" />
                  </div>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-4 flex flex-col justify-between h-[105px]">
                    <div className="flex justify-between items-center"><span className="text-[11px] font-bold text-neutral-500">Status</span><Calendar size={14} className="text-neutral-400" /></div>
                    <div className="grid grid-cols-3 gap-1">
                      {['Available', 'Reserved', 'In Transit'].map((st) => (
                        <button type="button" key={st} onClick={() => setNewCar({...newCar, status: st})} className={`py-1.5 px-1 rounded-lg text-[10px] font-extrabold truncate cursor-pointer ${newCar.status === st ? 'bg-[#e60000] text-white' : 'bg-neutral-100 text-neutral-600'}`}>{st}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#14161b] rounded-[2rem] p-6 text-white grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 grid grid-cols-2 gap-3">
                    <div className="bg-[#1c1f26] p-3.5 rounded-2xl border border-neutral-800">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Make</label>
                      <input type="text" value={newCar.make} onChange={(e) => setNewCar({...newCar, make: e.target.value})} className="w-full bg-transparent text-sm font-black text-white focus:outline-none" />
                    </div>
                    <div className="bg-[#1c1f26] p-3.5 rounded-2xl border border-neutral-800">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Model</label>
                      <input type="text" value={newCar.model} onChange={(e) => setNewCar({...newCar, model: e.target.value})} className="w-full bg-transparent text-sm font-black text-white focus:outline-none" />
                    </div>
                    <div className="bg-[#1c1f26] p-3.5 rounded-2xl border border-neutral-800">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Year</label>
                      <input type="number" value={newCar.year} onChange={(e) => setNewCar({...newCar, year: e.target.value})} className="w-full bg-transparent text-sm font-black text-white focus:outline-none" />
                    </div>
                    <div className="bg-[#1c1f26] p-3.5 rounded-2xl border border-neutral-800">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Color</label>
                      <input type="text" value={newCar.color} onChange={(e) => setNewCar({...newCar, color: e.target.value})} className="w-full bg-transparent text-sm font-black text-white focus:outline-none" />
                    </div>
                    <div className="bg-[#1c1f26] p-3.5 rounded-2xl border border-neutral-800">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Engine</label>
                      <input type="text" value={newCar.engine} onChange={(e) => setNewCar({...newCar, engine: e.target.value})} className="w-full bg-transparent text-sm font-black text-white focus:outline-none" />
                    </div>
                    <div className="bg-[#1c1f26] p-3.5 rounded-2xl border border-neutral-800">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Location</label>
                      <input type="text" value={newCar.location} onChange={(e) => setNewCar({...newCar, location: e.target.value})} className="w-full bg-transparent text-sm font-black text-white focus:outline-none" />
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between bg-[#1c1f26] p-4 rounded-2xl border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-neutral-400">Vehicle Photo</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#e60000] text-white">Live Preview</span>
                    </div>
                    <div className="w-full h-28 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                      <img src={newCar.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <input type="text" value={newCar.image} onChange={(e) => setNewCar({...newCar, image: e.target.value})} placeholder="Paste Image URL..." className="w-full bg-[#14161b] px-3 py-2 rounded-xl border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#e60000]" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50 cursor-pointer">Cancel</button>
                  <button type="submit" className="flex items-center gap-2 bg-[#e60000] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-red-700 shadow-md shadow-red-600/20 cursor-pointer"><Plus size={16} /> Add to Inventory</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}