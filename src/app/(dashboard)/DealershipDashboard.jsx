import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Settings2, 
  Plus, 
  Calendar, 
  Search, 
  ChevronDown,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  MoreVertical,
  Link as LinkIcon,
  FileText
} from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const dealsList = [
  { id: 'D-1001', time: 'In 2 days', status: 'Unsent', amount: 68750, active: false, client: 'Sarah Jenkins' },
  { id: 'D-1002', time: 'In 4 days', status: 'Viewed', amount: 21480, active: false, client: 'David Kim' },
  { id: 'D-1003', time: 'In 5 days', status: 'Unsent', amount: 47980, active: true, client: 'Marcus Cole' },
  { id: 'D-1004', time: 'In 16 days', status: 'Viewed', amount: 55230, active: false, client: 'Elena Rostova' },
  { id: 'D-1005', time: 'In 19 days', status: 'Viewed', amount: 6880, active: false, client: 'Tom Harris' },
];

export default function DealershipOverview() {
  const [selectedDeal, setSelectedDeal] = useState(dealsList[2]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-[1400px] mx-auto bg-white min-h-screen"
    >
      {/* Top Page Navigation (Matching the Pill Menu in reference) */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold italic">
            C
          </div>
          <span className="font-bold text-gray-900">Carvia<br/><span className="text-xs font-normal text-gray-500">Smart Motors</span></span>
        </div>

        <div className="flex items-center bg-gray-900 rounded-full p-1 shadow-sm">
          <span className="px-4 py-1.5 text-sm text-gray-400 font-medium hover:text-white cursor-pointer">Overview</span>
          <span className="px-4 py-1.5 text-sm text-gray-400 font-medium hover:text-white cursor-pointer">Inventory</span>
          <span className="px-6 py-1.5 text-sm bg-red-600 text-white rounded-full font-medium shadow-sm cursor-pointer">Active Deals</span>
          <span className="px-4 py-1.5 text-sm text-gray-400 font-medium hover:text-white cursor-pointer">Financing</span>
          <span className="px-4 py-1.5 text-sm text-gray-400 font-medium hover:text-white cursor-pointer">Fleet</span>
        </div>

        <div className="flex items-center gap-3 text-gray-500">
          <FileText className="w-5 h-5 cursor-pointer hover:text-gray-900" />
          <Settings2 className="w-5 h-5 cursor-pointer hover:text-gray-900" />
          <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-8 h-8 rounded-full ml-2 border" />
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Active Deals</h1>
            <p className="text-gray-500 text-sm mt-1">Manage and track all your pending vehicle sales in one place.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50">
            <Settings2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-red-700 transition-colors shadow-sm shadow-red-200">
            <Plus className="w-5 h-5" /> Create new deal
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-gray-600">Pending Down Payments</span>
            <div className="w-6 h-6 rounded-full border border-red-200 flex items-center justify-center text-red-500">!</div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(24850)}</h3>
            <p className="text-xs font-medium text-red-500 flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 12.5% from last month
            </p>
          </div>
          {/* Decorative graphic replacing the plant/desk in the image */}
          <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
            <FileText className="w-32 h-32 text-gray-400" />
          </div>
        </div>

        {/* Card 2: Bar Chart */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-gray-600">Expected Revenue (Month)</span>
            <Calendar className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(142560)}</h3>
            <p className="text-xs font-medium text-gray-500 flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1 text-red-600" /> <span className="text-gray-900 font-medium mr-1">8.2%</span> from last month
            </p>
          </div>
          {/* Mock Bar Chart */}
          <div className="flex items-end justify-between gap-2 mt-6 h-12">
            {[40, 20, 60, 45, 80, 100, 75].map((height, i) => (
              <div key={i} className="w-full bg-red-200 rounded-t-sm" style={{ height: `${height}%` }}>
                {i === 5 && <div className="w-full h-full bg-red-600 rounded-t-sm" />}
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Line Chart */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-gray-600">Average time to close</span>
            <Clock className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">16 days</h3>
            <p className="text-xs font-medium text-emerald-500 flex items-center mt-1">
              ↓ 2 days from last month
            </p>
          </div>
          {/* Mock Line Chart (SVG) */}
          <div className="mt-6 h-12 w-full relative">
             <svg viewBox="0 0 100 40" className="w-full h-full stroke-red-600 fill-none" preserveAspectRatio="none">
               <path d="M0,35 Q10,30 20,32 T40,25 T60,20 T80,10 T100,5" strokeWidth="2" />
               <circle cx="20" cy="32" r="2" className="fill-red-600" />
               <circle cx="40" cy="25" r="2" className="fill-red-600" />
               <circle cx="60" cy="20" r="2" className="fill-red-600" />
               <circle cx="80" cy="10" r="2" className="fill-red-600" />
               <circle cx="100" cy="5" r="2" className="fill-white stroke-red-600 stroke-2" />
             </svg>
          </div>
        </div>

        {/* Card 4: Approvals */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-gray-600">Approved Bank Financing</span>
            <ShieldCheck className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(186540)}</h3>
            <p className="text-xs font-medium text-gray-500 mt-1">Ready for payout</p>
          </div>
          <div className="flex gap-2 mt-4 items-end">
             <div className="flex-1 bg-white border border-gray-200 rounded-lg p-2 text-center text-xs text-gray-400">
               .... 4242<br/><span className="text-gray-900 font-bold">Chase</span>
             </div>
             <div className="flex-1 bg-red-600 rounded-lg p-2 text-center text-xs text-white shadow-md shadow-red-200/50">
               .... 6789<br/><span className="font-bold">Wells F.</span>
             </div>
             <div className="flex-1 bg-white border border-gray-200 rounded-lg p-2 text-center text-xs text-gray-400">
               .... 1234<br/><span className="text-gray-900 font-bold">Cap One</span>
             </div>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">Active filters <span className="bg-gray-900 text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center ml-1">2</span></span>
        </div>
        <div className="flex-1 flex gap-3">
          <button className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 flex items-center justify-between w-40">
            All customers <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <button className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 flex items-center justify-between w-40">
            All statuses <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <button className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 flex items-center justify-between w-48">
            November 2026 <Calendar className="w-4 h-4 ml-2" />
          </button>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Enter Deal #" 
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Bottom Split Section */}
      <div className="bg-gray-900 rounded-[2rem] p-3 flex gap-3 min-h-[500px]">
        
        {/* Left: List Panel */}
        <div className="w-1/3 flex flex-col">
          {/* List Headers */}
          <div className="flex justify-between items-center p-4">
            <h3 className="text-white font-medium">Pending Deals</h3>
            <div className="flex bg-gray-800 rounded-full p-1">
              <span className="px-4 py-1 text-xs text-gray-400 font-medium">All Deals</span>
              <span className="px-4 py-1 text-xs text-gray-400 font-medium">Draft 3</span>
              <span className="px-4 py-1 text-xs bg-red-600 text-white rounded-full font-medium">Active 5</span>
            </div>
          </div>
          
          {/* List Items */}
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {dealsList.map((deal) => (
              <div 
                key={deal.id}
                onClick={() => setSelectedDeal(deal)}
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors ${
                  deal.active ? 'bg-gray-800 border border-gray-700' : 'hover:bg-gray-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
                    <img src={`https://i.pravatar.cc/150?u=${deal.id}`} alt={deal.client} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">#{deal.id}</span>
                      {deal.active && <span className="bg-white text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">{deal.status}</span>}
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">{deal.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  {!deal.active && <p className="text-gray-500 text-xs mb-1">{deal.status}</p>}
                  <p className="text-white font-semibold">{formatCurrency(deal.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Deal Details Panel */}
        <div className="w-2/3 bg-red-600 rounded-[1.5rem] p-8 text-white flex flex-col relative">
          {/* Top Actions */}
          <div className="absolute top-6 right-6 flex gap-2">
             <button className="p-2 bg-red-700/50 hover:bg-red-700 rounded-lg transition-colors">
               <LinkIcon className="w-5 h-5" />
             </button>
             <button className="p-2 bg-red-700/50 hover:bg-red-700 rounded-lg transition-colors">
               <MoreVertical className="w-5 h-5" />
             </button>
          </div>

          <p className="text-red-200 text-sm font-medium mb-2">Deal details</p>
          
          <div className="flex items-end justify-between border-b border-red-500 pb-8 mb-8 mt-2">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-bold">#{selectedDeal.id}</h2>
              <span className="bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full border border-red-500">Pending</span>
            </div>
            
            <div className="flex gap-16 text-left">
               <div>
                 <p className="text-red-200 text-xs font-medium mb-1">Vehicle</p>
                 <div className="flex items-center gap-2">
                   <p className="font-bold text-lg">2024 Tesla Model 3</p>
                   <CarviaLogoIcon />
                 </div>
               </div>
               <div>
                 <p className="text-red-200 text-xs font-medium mb-1">Customer</p>
                 <div className="flex items-center gap-2">
                   <img src={`https://i.pravatar.cc/150?u=${selectedDeal.id}`} className="w-8 h-8 rounded-full border border-red-400" alt="" />
                   <div>
                     <p className="font-bold text-sm leading-tight">{selectedDeal.client}</p>
                     <p className="text-red-200 text-xs">Pre-approved Buyer</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Breakdown Boxes */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-red-700/40 border border-red-500/50 rounded-xl p-5 relative group cursor-pointer hover:bg-red-700/60 transition-colors">
               <ArrowUpRight className="w-4 h-4 absolute top-4 right-4 text-red-300" />
               <p className="text-2xl font-bold mb-1">{formatCurrency(38500)}</p>
               <p className="text-red-200 text-sm">Vehicle Base Price</p>
            </div>
            <div className="bg-red-700/40 border border-red-500/50 rounded-xl p-5 relative group cursor-pointer hover:bg-red-700/60 transition-colors">
               <ArrowUpRight className="w-4 h-4 absolute top-4 right-4 text-red-300" />
               <p className="text-2xl font-bold mb-1">{formatCurrency(4480)}</p>
               <p className="text-red-200 text-sm">Taxes & Fees</p>
            </div>
            <div className="bg-red-700/40 border border-red-500/50 rounded-xl p-5 relative group cursor-pointer hover:bg-red-700/60 transition-colors">
               <ArrowUpRight className="w-4 h-4 absolute top-4 right-4 text-red-300" />
               <p className="text-2xl font-bold mb-1">{formatCurrency(5000)}</p>
               <p className="text-red-200 text-sm">Trade-in Value</p>
            </div>
          </div>

          {/* Totals & Action */}
          <div className="mt-auto flex items-center justify-between border-t border-red-500 pt-6">
            <div>
              <p className="text-red-200 text-sm mb-1">Sub Total</p>
              <p className="text-xl font-medium">{formatCurrency(42980)}</p>
            </div>
            <div>
              <p className="text-red-200 text-sm mb-1">Taxes</p>
              <p className="text-xl font-medium">{formatCurrency(4480)}</p>
            </div>
            <div>
              <p className="text-red-200 text-sm mb-1">Balance Due</p>
              <p className="text-2xl font-bold">{formatCurrency(selectedDeal.amount)}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 bg-red-700/50 hover:bg-red-700 rounded-xl transition-colors border border-red-500">
                <LinkIcon className="w-5 h-5" />
              </button>
              <button className="p-3 bg-red-700/50 hover:bg-red-700 rounded-xl transition-colors border border-red-500">
                <FileText className="w-5 h-5" />
              </button>
              <button className="bg-white text-red-600 px-8 py-3.5 rounded-xl font-bold shadow-md hover:bg-gray-50 transition-colors">
                Finalize deal
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// Simple Logo SVG Component to match the graphic in the original image's header
function CarviaLogoIcon() {
  return (
    <svg className="w-6 h-6 text-red-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}