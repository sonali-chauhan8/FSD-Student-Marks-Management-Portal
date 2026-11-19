import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, Menu, PlusCircle, RefreshCw, BarChart3, Database } from 'lucide-react';
import { useStudentContext } from '../context/StudentContext';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { records, resetToSampleData, getOverallStats } = useStudentContext();
  const stats = getOverallStats();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Mobile Toggle & Title */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                  EduMarks<span className="text-blue-600">Portal</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  B.Tech FSD Lab
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Academic Performance & Single Page Application Demonstration
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Stats & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Quick Counter Badge */}
          <div className="hidden sm:flex items-center space-x-3 text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <div className="flex items-center space-x-1.5 text-slate-600">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Records:</span>
              <span className="font-bold text-slate-900">{stats.totalRecords}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center space-x-1.5 text-slate-600">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Avg:</span>
              <span className="font-bold text-slate-900">{stats.averagePercentage}%</span>
            </div>
          </div>

          {/* Reset Demo Data Button */}
          <button
            type="button"
            onClick={resetToSampleData}
            title="Reset to default lab demonstration data"
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>

          {/* Add Marks CTA Button */}
          <NavLink
            to="/add-student"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Marks</span>
          </NavLink>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
