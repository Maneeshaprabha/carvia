import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  description?: string;
  icon: LucideIcon;
  positive?: boolean;
  highlight?: boolean;
}

export default function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  positive = true,
  highlight = false,
}: StatCardProps) {
  return (
    <div 
      className={`p-6 rounded-[2rem] border transition-shadow hover:shadow-md relative overflow-hidden ${
        highlight 
          ? 'bg-[#e60000] text-white border-red-500 shadow-lg shadow-red-600/20' 
          : 'bg-white border-neutral-100 text-neutral-900 shadow-sm'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-sm font-semibold ${highlight ? 'text-red-100' : 'text-neutral-500'}`}>
          {title}
        </span>
        
        {/* Safety Check: Icon එකක් තියෙනවද කියලා බලලා තමයි render කරන්නේ */}
        {Icon && (
          <div className={`p-3 rounded-xl ${
            highlight 
              ? 'bg-red-500/50 text-white' 
              : 'bg-red-50 text-[#e60000]'
          }`}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <h3 className="text-3xl font-bold mb-2">
        {value}
      </h3>

      {(change || description) && (
        <div className={`flex items-center text-xs font-medium ${
          highlight 
            ? 'text-red-200' 
            : positive ? 'text-emerald-500' : 'text-red-500'
        }`}>
          {change && <span className="font-bold mr-1">{change}</span>}
          {description && (
            <span className={highlight ? 'text-red-200' : 'text-neutral-500'}>
              {description}
            </span>
          )}
        </div>
      )}

      {/* Background Decorative Icon */}
      {highlight && Icon && (
        <Icon size={120} className="absolute -right-6 -bottom-6 text-white opacity-10 pointer-events-none" />
      )}
    </div>
  );
}