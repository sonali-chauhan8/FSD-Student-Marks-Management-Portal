import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  Award,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  PlusCircle,
  BookOpen,
  ArrowRight,
  PieChart as PieIcon,
  BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useStudentContext } from '../context/StudentContext';
import StatCard from '../components/StatCard';
import { calculatePercentage, calculateGrade, calculateStatus, getGradeBadgeColor } from '../utils/gradeCalculator';

const GRADE_COLORS = {
  'A+': '#10b981', // emerald
  'A': '#22c55e',  // green
  'B': '#3b82f6',  // blue
  'C': '#f59e0b',  // amber
  'D': '#f97316',  // orange
  'F': '#ef4444'   // rose
};

const Dashboard = () => {
  const { records, getOverallStats } = useStudentContext();
  const stats = getOverallStats();

  // 1. Grade Distribution Data for Pie Chart
  const gradeDistributionData = useMemo(() => {
    const counts = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
    records.forEach((r) => {
      const pct = calculatePercentage(r.marksObtained, r.maxMarks);
      const grade = calculateGrade(pct);
      if (counts[grade] !== undefined) {
        counts[grade] += 1;
      }
    });

    return Object.keys(counts).map((grade) => ({
      name: `Grade ${grade}`,
      gradeKey: grade,
      count: counts[grade]
    })).filter((item) => item.count > 0);
  }, [records]);

  // 2. Subject Performance Data for Bar Chart
  const subjectPerformanceData = useMemo(() => {
    const subjectMap = {};
    records.forEach((r) => {
      const subj = r.subjectName;
      if (!subjectMap[subj]) {
        subjectMap[subj] = { subject: subj, totalPct: 0, count: 0 };
      }
      const pct = calculatePercentage(r.marksObtained, r.maxMarks);
      subjectMap[subj].totalPct += pct;
      subjectMap[subj].count += 1;
    });

    return Object.values(subjectMap).map((item) => ({
      subject: item.subject.length > 18 ? item.subject.substring(0, 16) + '...' : item.subject,
      fullSubject: item.subject,
      averagePercentage: parseFloat((item.totalPct / item.count).toFixed(1)),
      studentCount: item.count
    }));
  }, [records]);

  // 3. Branch Performance Data
  const branchPerformanceData = useMemo(() => {
    const branchMap = {};
    records.forEach((r) => {
      const branchKey = r.branch.replace('Engineering', 'Eng.').replace('Computer Science &', 'CSE').replace('Information', 'IT').replace('Electronics & Communication', 'ECE');
      if (!branchMap[branchKey]) {
        branchMap[branchKey] = { branch: branchKey, totalPct: 0, count: 0 };
      }
      const pct = calculatePercentage(r.marksObtained, r.maxMarks);
      branchMap[branchKey].totalPct += pct;
      branchMap[branchKey].count += 1;
    });

    return Object.values(branchMap).map((b) => ({
      branch: b.branch,
      average: parseFloat((b.totalPct / b.count).toFixed(1)),
      count: b.count
    }));
  }, [records]);

  // Recent 5 entries
  const recentRecords = useMemo(() => {
    return [...records].slice(0, 5);
  }, [records]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Performance Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time analytics, grade distribution, and laboratory evaluation statistics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <NavLink
            to="/add-student"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Marks</span>
          </NavLink>
          <NavLink
            to="/results"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Award className="w-4 h-4 text-blue-600" />
            <span>View Results</span>
          </NavLink>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          subtitle={`${stats.totalRecords} subject marks entries`}
          icon={Users}
          color="blue"
          badgeText="Active"
        />
        <StatCard
          title="Average Score"
          value={`${stats.averagePercentage}%`}
          subtitle="Mean batch percentage"
          icon={Award}
          color="indigo"
          badgeText="Aggregate"
        />
        <StatCard
          title="Highest Score"
          value={`${stats.highestPercentage}%`}
          subtitle="Top performer score"
          icon={TrendingUp}
          color="emerald"
          badgeText="Peak"
        />
        <StatCard
          title="Lowest Score"
          value={`${stats.lowestPercentage}%`}
          subtitle="Minimum recorded score"
          icon={TrendingDown}
          color="amber"
          badgeText="Min"
        />
        <StatCard
          title="Passed Students"
          value={stats.passedStudents}
          subtitle="Cleared all subjects (≥40%)"
          icon={CheckCircle2}
          color="emerald"
          badgeText="Qualified"
        />
        <StatCard
          title="Failed Students"
          value={stats.failedStudents}
          subtitle="Scored <40% in subjects"
          icon={XCircle}
          color="rose"
          badgeText="Needs Work"
        />
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Subject Performance Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Subject-wise Average Marks</h3>
                <p className="text-xs text-slate-500">Average percentage achieved per subject</p>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            {subjectPerformanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformanceData} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="subject"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    unit="%"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-lg space-y-1">
                            <p className="font-bold text-blue-300">{data.fullSubject}</p>
                            <p>Average: <span className="font-semibold">{data.averagePercentage}%</span></p>
                            <p className="text-slate-400">Records count: {data.studentCount}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="averagePercentage"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                    name="Average %"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No marks data available for chart visualization.
              </div>
            )}
          </div>
        </div>

        {/* Grade Distribution Pie Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <PieIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Grade Breakdown</h3>
                <p className="text-xs text-slate-500">Distribution across A+, A, B, C, D, F</p>
              </div>
            </div>
          </div>

          <div className="h-56 w-full relative">
            {gradeDistributionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistributionData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {gradeDistributionData.map((entry) => (
                      <Cell
                        key={entry.gradeKey}
                        fill={GRADE_COLORS[entry.gradeKey] || '#94a3b8'}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} entries`, name]}
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '0.75rem',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No grades to display yet.
              </div>
            )}
          </div>

          {/* Custom Grade Legend */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
            {Object.keys(GRADE_COLORS).map((grade) => {
              const count = records.filter(
                (r) => calculateGrade(calculatePercentage(r.marksObtained, r.maxMarks)) === grade
              ).length;
              return (
                <div key={grade} className="flex items-center space-x-1.5 text-slate-600">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: GRADE_COLORS[grade] }}
                  />
                  <span>
                    {grade}: <strong className="text-slate-900">{count}</strong>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Recent Marks Entries Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Marks Entries</h3>
              <p className="text-xs text-slate-500">Quick glimpse of latest student records</p>
            </div>
          </div>

          <NavLink
            to="/students"
            className="flex items-center space-x-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            <span>View All Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 divide-y divide-slate-100">
            <thead className="bg-slate-50 text-xs font-bold text-slate-700 uppercase">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Enrollment No</th>
                <th className="px-4 py-3">Branch</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Marks</th>
                <th className="px-4 py-3">Percentage</th>
                <th className="px-4 py-3">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentRecords.length > 0 ? (
                recentRecords.map((r) => {
                  const pct = calculatePercentage(r.marksObtained, r.maxMarks);
                  const grade = calculateGrade(pct);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{r.studentName}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{r.enrollmentNo}</td>
                      <td className="px-4 py-3 text-xs text-slate-600">{r.branch}</td>
                      <td className="px-4 py-3 text-xs text-slate-700">{r.subjectName}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        {r.marksObtained} <span className="text-xs font-normal text-slate-400">/ {r.maxMarks}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{pct}%</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold border ${getGradeBadgeColor(grade)}`}>
                          {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-xs text-slate-400">
                    No records added yet. Click &quot;Add Marks&quot; to begin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
