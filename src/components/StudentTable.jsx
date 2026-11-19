import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  GraduationCap,
  BookOpen,
  ArrowUpDown,
  XCircle,
  FileSpreadsheet
} from 'lucide-react';
import { calculatePercentage, calculateGrade, calculateStatus, getGradeBadgeColor, getStatusBadgeColor } from '../utils/gradeCalculator';

const BRANCH_FILTER_OPTIONS = [
  'All Branches',
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering'
];

const SEMESTER_FILTER_OPTIONS = [
  'All Semesters',
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester'
];

const StudentTable = ({ records, onEdit, onDelete }) => {
  // useState Hook for Search query
  const [searchTerm, setSearchTerm] = useState('');
  
  // useState Hook for Branch filter
  const [branchFilter, setBranchFilter] = useState('All Branches');
  
  // useState Hook for Semester filter
  const [semesterFilter, setSemesterFilter] = useState('All Semesters');

  // useState Hook for sorting
  const [sortField, setSortField] = useState('studentName');
  const [sortAsc, setSortAsc] = useState(true);

  // Filter and sort records using useMemo for high performance
  const filteredRecords = useMemo(() => {
    return records
      .filter((record) => {
        const matchesSearch =
          record.studentName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          record.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          record.subjectName.toLowerCase().includes(searchTerm.toLowerCase().trim());

        const matchesBranch =
          branchFilter === 'All Branches' || record.branch === branchFilter;

        const matchesSemester =
          semesterFilter === 'All Semesters' || record.semester === semesterFilter;

        return matchesSearch && matchesBranch && matchesSemester;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (sortField === 'percentage') {
          valA = calculatePercentage(a.marksObtained, a.maxMarks);
          valB = calculatePercentage(b.marksObtained, b.maxMarks);
        } else if (sortField === 'marksObtained') {
          valA = parseFloat(a.marksObtained);
          valB = parseFloat(b.marksObtained);
        } else if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [records, searchTerm, branchFilter, semesterFilter, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setBranchFilter('All Branches');
    setSemesterFilter('All Semesters');
  };

  const isFiltered = searchTerm !== '' || branchFilter !== 'All Branches' || semesterFilter !== 'All Semesters';

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search Box */}
          <div className="lg:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, enrollment no, or subject..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Branch Filter */}
          <div>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
            >
              {BRANCH_FILTER_OPTIONS.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div>
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
            >
              {SEMESTER_FILTER_OPTIONS.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Filter Summary & Clear Action */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-900">{filteredRecords.length}</span> of{' '}
            <span className="font-semibold text-slate-900">{records.length}</span> marks records
          </div>
          {isFiltered && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 divide-y divide-slate-200">
            <thead className="bg-slate-50/90 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('studentName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Student / Enrollment</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('branch')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Branch & Semester</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('subjectName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Subject</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('marksObtained')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Marks</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('percentage')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Percentage</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-4">
                  Grade
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => {
                  const percentage = calculatePercentage(record.marksObtained, record.maxMarks);
                  const grade = calculateGrade(percentage);
                  const status = calculateStatus(percentage);

                  return (
                    <tr
                      key={record.id}
                      className="hover:bg-blue-50/40 transition-colors duration-150"
                    >
                      {/* Student Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{record.studentName}</div>
                        <div className="text-xs font-mono text-slate-500 mt-0.5">
                          {record.enrollmentNo}
                        </div>
                      </td>

                      {/* Branch & Semester */}
                      <td className="px-6 py-4">
                        <div className="text-xs font-medium text-slate-800">{record.branch}</div>
                        <div className="text-xs text-slate-500">{record.semester}</div>
                      </td>

                      {/* Subject Name */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800 flex items-center space-x-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          <span>{record.subjectName}</span>
                        </div>
                      </td>

                      {/* Marks (Obtained / Max) */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-slate-900">{record.marksObtained}</span>
                        <span className="text-xs text-slate-400"> / {record.maxMarks}</span>
                      </td>

                      {/* Percentage */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-slate-900">{percentage}%</span>
                          <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden hidden sm:block">
                            <div
                              className={`h-full rounded-full ${
                                percentage >= 75
                                  ? 'bg-emerald-500'
                                  : percentage >= 50
                                  ? 'bg-blue-500'
                                  : percentage >= 40
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${Math.min(100, percentage)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Grade Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ${getGradeBadgeColor(
                            grade
                          )}`}
                        >
                          {grade}
                        </span>
                      </td>

                      {/* Pass/Fail Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusBadgeColor(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => onEdit(record)}
                            title="Edit marks record"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(record)}
                            title="Delete marks record"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* Empty State */
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="max-w-sm mx-auto flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-semibold text-slate-700">
                        {records.length === 0
                          ? 'No student marks recorded yet.'
                          : 'No matching records found.'}
                      </div>
                      <p className="text-xs text-slate-500">
                        {records.length === 0
                          ? 'Click "Add Marks" to create the first student record or click "Reset Demo".'
                          : 'Try adjusting your search criteria or resetting the active filters.'}
                      </p>
                      {isFiltered && (
                        <button
                          type="button"
                          onClick={handleClearFilters}
                          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>
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

export default StudentTable;
