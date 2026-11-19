import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NotificationToast from './components/NotificationToast';

// Pages
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import Students from './pages/Students';
import Results from './pages/Results';
import About from './pages/About';

function App() {
  // Mobile sidebar drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <StudentProvider>
      <BrowserRouter>
        <div className="min-h-screen flex bg-slate-50 text-slate-900">
          
          {/* Global Sidebar Navigation */}
          <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Top Navbar */}
            <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

            {/* Page Router Outlet */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <Routes>
                {/* Default route redirect to dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                {/* Application Pages */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/students" element={<Students />} />
                <Route path="/results" element={<Results />} />
                <Route path="/about" element={<About />} />

                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>

            {/* Global Toast Notification System */}
            <NotificationToast />

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 print:hidden">
              <p>
                Student Marks Management Portal &bull; B.Tech Full Stack Development Lab Experiment &bull; React SPA
              </p>
            </footer>
          </div>

        </div>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
