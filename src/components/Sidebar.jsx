import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Award,
  Info,
  X,
  BookOpen,
  Sparkles
} from 'lucide-react';

const navItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Analytics'
  },
  {
    path: '/add-student',
    label: 'Add Marks',
    icon: UserPlus,
    description: 'New Marks Entry Form'
  },
  {
    path: '/students',
    label: 'Student Records',
    icon: Users,
    description: 'Search, Filter & Edit'
  },
  {
    path: '/results',
    label: 'Results & Grades',
    icon: Award,
    description: 'Scorecards & Summary'
  },
  {
    path: '/about',
    label: 'About & Viva Guide',
    icon: Info,
    description: 'Lab Experiment Info'
  }
];

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-wide text-white uppercase">
              Academic Portal
            </span>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Main Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {item.description}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer: Lab Info Card */}
        <div className="p-4 border-t border-slate-800 m-3 rounded-xl bg-slate-800/60 border">
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>React SPA Lab Exam</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Functional Components, React Hooks (<code className="text-blue-300">useState</code>, <code className="text-blue-300">useEffect</code>, <code className="text-blue-300">useContext</code>), & React Router.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
