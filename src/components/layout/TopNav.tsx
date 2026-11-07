// "use client";

// import {
//   Search,
//   Bell,
//   ChevronDown,
//   Menu,
// } from "lucide-react";

// export default function TopNav() {
//   return (
//     <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur-md md:px-8">
//       <div className="flex items-center gap-4">
//         <button
//           type="button"
//           className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
//           aria-label="Menu"
//         >
//           <Menu size={21} />
//         </button>

//         <div>
//           <p className="text-xs text-gray-400">Pages / Dashboard</p>
//           <h2 className="text-lg font-bold text-gray-900">Overview</h2>
//         </div>
//       </div>

//       <div className="flex items-center gap-3 md:gap-5">
//         <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 md:flex">
//           <Search size={17} className="text-gray-400" />
//           <input
//             type="search"
//             placeholder="Search anything..."
//             className="w-40 bg-transparent text-sm outline-none placeholder:text-gray-400"
//           />
//           <span className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] text-gray-400">
//             /
//           </span>
//         </div>

//         <button
//           type="button"
//           aria-label="Notifications"
//           className="relative rounded-xl border border-gray-200 p-2.5 text-gray-500 hover:bg-gray-50"
//         >
//           <Bell size={19} />
//           <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-600" />
//         </button>

//         <div className="flex items-center gap-2">
//           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
//             AD
//           </div>
//           <div className="hidden sm:block">
//             <p className="text-xs font-bold text-gray-900">Admin</p>
//             <p className="text-[10px] text-gray-400">Administrator</p>
//           </div>
//           <ChevronDown size={15} className="text-gray-400" />
//         </div>
//       </div>
//     </header>
//   );
// }