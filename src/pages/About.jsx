import React from 'react';
import {
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Database,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-blue-200 mb-4">
          <GraduationCap className="w-4 h-4" />
          <span>B.Tech Full Stack Development Lab Experiment</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Student Marks Management Portal
        </h1>

        <p className="mt-3 text-base sm:text-lg text-blue-100 max-w-3xl leading-relaxed">
          A modern Single Page Application (SPA) designed to demonstrate state management,
          component-driven architecture, client-side routing, and persistent storage using React functional components.
        </p>
      </div>

      {/* Experiment Aim & Objective */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 text-blue-600">
          <BookOpen className="w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-900">1. Experiment Aim & Objectives</h2>
        </div>
        
        <p className="text-slate-700 text-sm leading-relaxed">
          <strong>Aim:</strong> To design and develop a responsive Single Page Application (SPA) using React functional components,
          React Hooks (<code className="text-blue-600 font-mono">useState</code>, <code className="text-blue-600 font-mono">useEffect</code>, <code className="text-blue-600 font-mono">useContext</code>),
          and React Router (<code className="text-blue-600 font-mono">react-router-dom</code>) for managing and evaluating student academic marks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Single Page Architecture</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Navigate seamlessly across Dashboard, Marks Entry, Records, and Results without triggering browser page reloads.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Global State & Context</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Utilize React Context API to provide global state and eliminate prop drilling across nested components.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Persistent Browser Storage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synchronize student data to HTML5 <code className="text-slate-800">localStorage</code> with automatic side-effects via <code className="text-blue-600">useEffect</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 text-blue-600">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-900">2. Technology Stack</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>React.js (v18)</span>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Core</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Declarative, component-based user interface library utilizing modern functional components and JSX.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Vite Bundler</span>
              <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Build Tool</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Ultra-fast next-generation frontend development server with instant Hot Module Replacement (HMR).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>React Router DOM (v6)</span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Routing</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Declarative client-side routing using <code className="text-slate-800">BrowserRouter</code>, <code className="text-slate-800">Routes</code>, and <code className="text-slate-800">NavLink</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Tailwind CSS</span>
              <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">Styling</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Utility-first CSS framework delivering a clean, modern, responsive academic dashboard interface.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Recharts</span>
              <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Data Viz</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Composable charting library built on React components and SVG for bar and pie analytics.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>HTML5 localStorage</span>
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Storage</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Client-side persistent key-value storage keeping records safe across page refreshes.
            </p>
          </div>
        </div>
      </div>

      {/* Deep-Dive: React Hooks Explanation (Viva Exam Focus) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 text-blue-600">
          <Cpu className="w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-900">3. React Hooks Explained (Practical Exam Reference)</h2>
        </div>

        <div className="space-y-6">
          
          {/* useState */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>useState Hook</span>
              </h3>
              <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                const [state, setState] = useState(initialValue)
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Allows functional components to declare and maintain local state across renders. In this application:
            </p>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
              <li><strong>Form Inputs:</strong> Tracks student name, enrollment number, branch, semester, subject, and marks in <code className="bg-slate-200 px-1 rounded">StudentForm.jsx</code>.</li>
              <li><strong>Validation Errors:</strong> Maintains individual field error strings.</li>
              <li><strong>Search & Filter:</strong> Tracks active search query, selected branch, and semester in <code className="bg-slate-200 px-1 rounded">StudentTable.jsx</code>.</li>
              <li><strong>UI State:</strong> Manages modal visibility, notifications, and sorting order.</li>
            </ul>
          </div>

          {/* useEffect */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>useEffect Hook</span>
              </h3>
              <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                useEffect(() =&gt; &#123; /* side effect */ &#125;, [dependencies])
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Handles side-effects such as data fetching, browser storage synchronization, and timers. In this application:
            </p>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
              <li><strong>Storage Sync:</strong> Whenever <code className="bg-slate-200 px-1 rounded">records</code> state updates, a <code className="text-blue-600 font-semibold">useEffect</code> automatically runs <code className="bg-slate-200 px-1 rounded">localStorage.setItem()</code>.</li>
              <li><strong>Initial Preload:</strong> Loads records from localStorage on initial mount (or seeds default lab sample data if empty).</li>
              <li><strong>Form Synchronization:</strong> Updates form fields when user chooses to edit an existing student.</li>
            </ul>
          </div>

          {/* useContext */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span>useContext Hook</span>
              </h3>
              <span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                const value = useContext(StudentContext)
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Allows components anywhere in the component hierarchy to consume shared data and functions without manually passing props through every layer (solving <em>prop drilling</em>).
            </p>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
              <li><strong>Centralized CRUD:</strong> Provides <code className="bg-slate-200 px-1 rounded">addRecord</code>, <code className="bg-slate-200 px-1 rounded">updateRecord</code>, and <code className="bg-slate-200 px-1 rounded">deleteRecord</code>.</li>
              <li><strong>Shared Analytics:</strong> Exposes pre-calculated statistics to Dashboard, Navbar, and Results page.</li>
              <li><strong>Global Toast Alerts:</strong> Centralizes notification messaging accessible from any page.</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Practical / Viva Examination Q&A Quick Guide */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 text-blue-600">
          <HelpCircle className="w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-900">4. Viva Voce / Examination Questions & Answers</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">
              Q1: What is a Single Page Application (SPA) and how does React Router achieve it?
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              <strong>Answer:</strong> An SPA is a web application that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the default method of a web browser loading entire new pages. React Router intercepts anchor link clicks and manipulates the browser&apos;s <code className="font-mono">History API</code>, mounting only the targeted view components without full reload.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">
              Q2: What is the advantage of Functional Components over Class Components in React?
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              <strong>Answer:</strong> Functional components are simpler JavaScript functions that accept props and return JSX. With the introduction of React Hooks (React 16.8+), functional components can handle state, side-effects, and context without requiring class boilerplate, <code className="font-mono">this</code> binding, or lifecycle methods like <code className="font-mono">componentDidMount</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">
              Q3: How does this project prevent duplicate marks entries?
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              <strong>Answer:</strong> When submitting the marks form in <code className="font-mono">StudentContext.jsx</code>, the <code className="font-mono">addRecord</code> function checks if a record already matches the normalized Enrollment Number, Semester, and Subject Name combination using JavaScript&apos;s <code className="font-mono">Array.prototype.some()</code>. If found, submission is aborted and an error notification is shown.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">
              Q4: What formula is used to calculate the student&apos;s overall percentage?
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              <strong>Answer:</strong> <code className="font-mono">Overall Percentage = (Total Marks Obtained across all subjects / Total Maximum Marks across all subjects) * 100</code>. A student is considered &quot;Passed&quot; overall if their aggregate percentage is &ge; 40% and they have scored &ge; 40% in each individual subject.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
