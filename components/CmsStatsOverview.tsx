'use client';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: string;
}

const statsData: StatCardProps[] = [
  {
    title: 'Total Properties',
    value: '24',
    change: '+3 this month',
    isPositive: true,
    icon: '🏢',
  },
  {
    title: 'Active Enquiries',
    value: '142',
    change: '+18% vs last week',
    isPositive: true,
    icon: '📩',
  },
  {
    title: 'Featured Communities',
    value: '8',
    change: '2 Pending Review',
    isPositive: true,
    icon: '🌴',
  },
  {
    title: 'FS Advisory Reports',
    value: '18',
    change: 'All Synchronized',
    isPositive: true,
    icon: '📊',
  },
];

export default function CmsStatsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl p-6 border border-[#E5E0D8] shadow-sm hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl p-3 bg-[#FAF4EA] rounded-lg group-hover:bg-[#BFA16A]/10 transition-colors">
              {stat.icon}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#FAF4EA] text-[#BFA16A] border border-[#BFA16A]/20">
              {stat.change}
            </span>
          </div>
          <p className="text-[#858585] text-xs font-inter uppercase tracking-wider mb-1">
            {stat.title}
          </p>
          <h3 className="text-3xl font-bold text-[#171717] font-playfair">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
