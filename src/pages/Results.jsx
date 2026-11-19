import React, { useState, useMemo } from 'react';
import {
  Award,
  Search,
  Filter,
  Printer,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';
import { useStudentContext } from '../context/StudentContext';
import {
  aggregateStudentResults,
  getGradeBadgeColor,
  getStatusBadgeColor,
  calculatePercentage
} from '../utils/gradeCalculator';

const Results = () => {
  const { records } = useStudentContext();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Expanded student cards for detailed subject view
  const [expandedStudents, setExpandedStudents] = useState({});

  // Compute aggregated student results
  const aggregatedResults = useMemo(() => {
    return aggregateStudentResults(records);
  }, [records]);

  // Filter student-wise results
  const filteredResults = useMemo(() => {
    return aggregatedResults.filter((student) => {
      const matchesSearch =
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        student.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        student.branch.toLowerCase().includes(searchTerm.toLowerCase().trim());

      const matchesStatus =
        statusFilter === 'All' || student.overallStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [aggregatedResults, searchTerm, statusFilter]);

  const toggleExpand = (enrollmentNo) => {
    setExpandedStudents((prev) => ({
      ...prev,
      [enrollmentNo]: !prev[enrollmentNo]
    }));
  };

  const expandAll = () => {
    const all = {};
    aggregatedResults.forEach((s) => {
      all[s.enrollmentNo] = true;
    });
    setExpandedStudents(all);
  };

  const collapseAll = () => {
    setExpandedStudents({});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 print:p-0">
      
      {/* Page Header (Hidden during browser print) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Award className="w-6 h-6 text-blue-600" />
            <span>Consolidated Student Results & Scorecards</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Aggregated overall totals, percentage, grade determination, and individual subject breakdown.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Grade Scale Reference Card (Helpful for Lab Examination) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm print:hidden">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Institutional Grading Scheme & Benchmark (Passing: ≥ 40%)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <span className="font-extrabold text-sm block">A+</span>
            <span className="text-[11px] font-medium">90% – 100%</span>
            <span className="block text-[10px] text-emerald-700 mt-0.5">Outstanding</span>
          </div>
          <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-green-900">
            <span className="font-extrabold text-sm block">A</span>
            <span className="text-[11px] font-medium">80% – 89%</span>
            <span className="block text-[10px] text-green-700 mt-0.5">Excellent</span>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
            <span className="font-extrabold text-sm block">B</span>
            <span className="text-[11px] font-medium">70% – 79%</span>
            <span className="block text-[10px] text-blue-700 mt-0.5">Very Good</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
            <span className="font-extrabold text-sm block">C</span>
            <span className="text-[11px] font-medium">60% – 69%</span>
            <span className="block text-[10px] text-amber-700 mt-0.5">Good</span>
          </div>
          <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-900">
            <span className="font-extrabold text-sm block">D</span>
            <span className="text-[11px] font-medium">50% – 59%</span>
            <span className="block text-[10px] text-orange-700 mt-0.5">Satisfactory</span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
            <span className="font-extrabold text-sm block">F</span>
            <span className="text-[11px] font-medium">Below 50%</span>
            <span className="block text-[10px] text-rose-700 mt-0.5">Fail (&lt;40% pass)</span>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student or enrollment..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter & Expand/Collapse Toggle */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Passed">Passed Only</option>
            <option value="Failed">Failed Only</option>
          </select>

          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={expandAll}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

      </div>

      {/* Printable Institutional Header for PDF / Paper Print */}
      <div className="hidden print:block text-center pb-6 border-b border-slate-300 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
          Department of Computer Science & Engineering
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          B.Tech Full Stack Development Lab — Official Student Marks Statement
        </p>
      </div>

      {/* Student Result Cards */}
      <div className="space-y-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((student) => {
            const isExpanded = expandedStudents[student.enrollmentNo];

            return (
              <div
                key={student.enrollmentNo}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all hover:border-blue-300 print:border-slate-300 print:shadow-none"
              >
                {/* Summary Header */}
                <div
                  onClick={() => toggleExpand(student.enrollmentNo)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 select-none transition-colors"
                >
                  {/* Left: Student Identity */}
                  <div className="flex items-start space-x-3.5">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base flex-shrink-0">
                      {student.studentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                        <span>{student.studentName}</span>
                        <span className="font-mono text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {student.enrollmentNo}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {student.branch} • {student.semester} • {student.totalSubjects} Subject{student.totalSubjects > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Right: Metrics & Badges */}
                  <div className="flex items-center flex-wrap gap-4 sm:gap-6">
                    {/* Total Marks */}
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                        Aggregate Marks
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {student.totalObtained} <span className="text-xs font-normal text-slate-400">/ {student.totalMax}</span>
                      </span>
                    </div>

                    {/* Overall Percentage */}
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                        Percentage
                      </span>
                      <span className="text-sm font-extrabold text-blue-600">
                        {student.overallPercentage}%
                      </span>
                    </div>

                    {/* Grade */}
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                        Grade
                      </span>
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold border ${getGradeBadgeColor(student.overallGrade)}`}>
                        {student.overallGrade}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                        Status
                      </span>
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusBadgeColor(student.overallStatus)}`}>
                        {student.overallStatus === 'Passed' ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-rose-600" />
                        )}
                        <span>{student.overallStatus}</span>
                      </span>
                    </div>

                    {/* Expand/Collapse Chevron */}
                    <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600 print:hidden">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Subject Breakdown Table (always visible when printed) */}
                <div className={`border-t border-slate-200 bg-slate-50/50 p-5 ${isExpanded ? 'block' : 'hidden print:block'}`}>
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Individual Subject Performance Breakdown</span>
                  </h5>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-xs text-slate-600 divide-y divide-slate-200">
                      <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                        <tr>
                          <th className="px-4 py-2.5">Subject</th>
                          <th className="px-4 py-2.5">Semester</th>
                          <th className="px-4 py-2.5">Marks Obtained</th>
                          <th className="px-4 py-2.5">Maximum Marks</th>
                          <th className="px-4 py-2.5">Percentage</th>
                          <th className="px-4 py-2.5">Grade</th>
                          <th className="px-4 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {student.subjects.map((sub, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-4 py-2.5 font-semibold text-slate-900">
                              {sub.subjectName}
                            </td>
                            <td className="px-4 py-2.5 text-slate-600">{sub.semester}</td>
                            <td className="px-4 py-2.5 font-bold text-slate-900">
                              {sub.marksObtained}
                            </td>
                            <td className="px-4 py-2.5 text-slate-600">{sub.maxMarks}</td>
                            <td className="px-4 py-2.5 font-semibold text-slate-900">
                              {sub.percentage}%
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${getGradeBadgeColor(sub.grade)}`}>
                                {sub.grade}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${getStatusBadgeColor(sub.status)}`}>
                                {sub.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-slate-50 font-semibold text-slate-800 border-t border-slate-200">
                        <tr>
                          <td colSpan="2" className="px-4 py-2.5 text-right font-bold uppercase">
                            Total / Overall:
                          </td>
                          <td className="px-4 py-2.5 font-bold text-blue-700">
                            {student.totalObtained}
                          </td>
                          <td className="px-4 py-2.5 font-bold text-slate-700">
                            {student.totalMax}
                          </td>
                          <td className="px-4 py-2.5 font-extrabold text-blue-700">
                            {student.overallPercentage}%
                          </td>
                          <td className="px-4 py-2.5 font-bold">
                            <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${getGradeBadgeColor(student.overallGrade)}`}>
                              {student.overallGrade}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${getStatusBadgeColor(student.overallStatus)}`}>
                              {student.overallStatus}
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center text-slate-500">
            <GraduationCap className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <h4 className="text-base font-semibold text-slate-800">No student result records found</h4>
            <p className="text-xs text-slate-500 mt-1">
              Add marks entries or adjust the search and status filters above.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Results;
