import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useStudentContext } from '../context/StudentContext';

const NotificationToast = () => {
  const { notification, setNotification } = useStudentContext();

  if (!notification) return null;

  const { type, message } = notification;

  const styleConfig = {
    success: {
      bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
      title: 'Success'
    },
    error: {
      bg: 'bg-rose-50 border-rose-300 text-rose-900',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
      title: 'Validation Error'
    },
    info: {
      bg: 'bg-blue-50 border-blue-300 text-blue-900',
      icon: <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />,
      title: 'Notice'
    },
    warning: {
      bg: 'bg-amber-50 border-amber-300 text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
      title: 'Warning'
    }
  };

  const currentStyle = styleConfig[type] || styleConfig.info;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-start space-x-3 p-4 rounded-xl border shadow-lg ${currentStyle.bg}`}
        role="alert"
      >
        {currentStyle.icon}
        <div className="flex-1 text-sm">
          <p className="font-semibold">{currentStyle.title}</p>
          <p className="mt-0.5 text-xs opacity-90 leading-relaxed">{message}</p>
        </div>
        <button
          type="button"
          onClick={() => setNotification(null)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
