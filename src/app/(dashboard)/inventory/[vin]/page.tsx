"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Car, 
  Calendar, 
  DollarSign, 
  Gauge, 
  Settings2,
  FileText,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function VehicleDetailsPage({ params }: { params: { vin: string } }) {
  const unwrappedParams = React.use(params);
  const vin = unwrappedParams.vin;

  // Mock data representing what would load from the database
  const vehicle = {
    make: "Porsche",
    model: "911 GT3",
    year: 2024,
    price: 185000,
    status: "Available",
    mileage: "120 mi",
    transmission: "PDK Automatic",
    color: "Guards Red",
    vin: vin,
    engine: "4.0L Flat-6",
    location: "Main Showroom Floor"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[1440px] mx-auto p-4 md:p-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <Link href="/inventory" className="p-2 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <p className="text-neutral-500 text-sm mt-1 font-mono">VIN: {vehicle.vin}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Media & Specs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-100 rounded-[2rem] flex items-center justify-center min-h-[400px] border border-neutral-200 relative overflow-hidden group">
            <Car size={120} className="text-neutral-300 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full shadow-sm text-sm font-bold text-green-600 flex items-center gap-2">
              <CheckCircle2 size={16} /> {vehicle.status}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Mileage", value: vehicle.mileage, icon: Gauge },
              { label: "Year", value: vehicle.year.toString(), icon: Calendar },
              { label: "Transmission", value: vehicle.transmission, icon: Settings2 },
              { label: "Exterior Color", value: vehicle.color, icon: Car },
            ].map((spec, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm flex flex-col items-center justify-center text-center">
                <spec.icon className="w-6 h-6 text-red-600 mb-3" />
                <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">{spec.label}</p>
                <p className="font-semibold text-neutral-900">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Action Panel */}
        <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 shadow-sm h-fit sticky top-8">
          <div className="pb-6 border-b border-neutral-100 mb-6">
            <p className="text-sm font-semibold text-neutral-500 mb-2">Listing Price</p>
            <h2 className="text-4xl font-extrabold text-neutral-900">
              ${vehicle.price.toLocaleString('en-US')}
            </h2>
          </div>

          <div className="space-y-5 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-500">
                <Settings2 size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Engine Specs</p>
                <p className="text-sm font-semibold text-neutral-900">{vehicle.engine}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-500">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Location</p>
                <p className="text-sm font-semibold text-neutral-900">{vehicle.location}</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-red-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 mb-3">
            <FileText size={18} /> Start Deal Process
          </button>
          <button className="w-full bg-white border border-neutral-200 text-neutral-700 py-4 rounded-xl font-bold hover:bg-neutral-50 transition-colors">
            Edit Vehicle Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}