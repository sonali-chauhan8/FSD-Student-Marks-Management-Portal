import React from 'react';

const colorThemes = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-600',
    iconBg: 'bg-blue-600 text-white',
    ring: 'focus:ring-blue-500'
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-600',
    iconBg: 'bg-emerald-600 text-white',
    ring: 'focus:ring-emerald-500'
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-600',
    iconBg: 'bg-rose-600 text-white',
    ring: 'focus:ring-rose-500'
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-600',
    iconBg: 'bg-amber-600 text-white',
    ring: 'focus:ring-amber-500'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-600',
    iconBg: 'bg-purple-600 text-white',
    ring: 'focus:ring-purple-500'
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    text: 'text-indigo-600',
    iconBg: 'bg-indigo-600 text-white',
    ring: 'focus:ring-indigo-500'
  }
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  badgeText
}) => {
  const theme = colorThemes[color] || colorThemes.blue;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </h3>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${theme.iconBg}`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">{subtitle}</span>
        {badgeText && (
          <span className={`px-2 py-0.5 rounded-full font-semibold ${theme.bg} ${theme.text}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
