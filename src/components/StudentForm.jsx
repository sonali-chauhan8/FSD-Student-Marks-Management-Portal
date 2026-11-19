import React, { useState, useEffect } from 'react';
import {
  User,
  Hash,
  GitBranch,
  Calendar,
  BookOpen,
  Award,
  CheckCircle,
  RotateCcw,
  Percent
} from 'lucide-react';
import { calculatePercentage, calculateGrade, calculateStatus, getGradeBadgeColor, getStatusBadgeColor } from '../utils/gradeCalculator';

const BRANCH_OPTIONS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering'
];

const SEMESTER_OPTIONS = [
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester'
];

const DEFAULT_FORM_STATE = {
  studentName: '',
  enrollmentNo: '',
  branch: 'Computer Science & Engineering',
  semester: '5th Semester',
  subjectName: '',
  marksObtained: '',
  maxMarks: '100'
};

const StudentForm = ({ initialData = null, onSubmit, onCancel, isEdit = false }) => {
  // useState Hook for form inputs
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  
  // useState Hook for form validation errors
  const [errors, setErrors] = useState({});

  // useEffect Hook: Pre-fill form when editing an existing record
  useEffect(() => {
    if (initialData) {
      setFormData({
        studentName: initialData.studentName || '',
        enrollmentNo: initialData.enrollmentNo || '',
        branch: initialData.branch || BRANCH_OPTIONS[0],
        semester: initialData.semester || SEMESTER_OPTIONS[4],
        subjectName: initialData.subjectName || '',
        marksObtained: initialData.marksObtained !== undefined ? initialData.marksObtained.toString() : '',
        maxMarks: initialData.maxMarks !== undefined ? initialData.maxMarks.toString() : '100'
      });
      setErrors({});
    } else {
      setFormData(DEFAULT_FORM_STATE);
    }
  }, [initialData]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear individual error as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Form Validation Logic
  const validateForm = () => {
    const newErrors = {};

    // 1. Student Name validation
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student Name is required.';
    } else if (formData.studentName.trim().length < 2) {
      newErrors.studentName = 'Name must be at least 2 characters long.';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.studentName.trim())) {
      newErrors.studentName = 'Name can only contain alphabets, spaces, dots, hyphens, and apostrophes.';
    }

    // 2. Enrollment Number validation
    if (!formData.enrollmentNo.trim()) {
      newErrors.enrollmentNo = 'Enrollment Number is required.';
    } else if (formData.enrollmentNo.trim().length < 5) {
      newErrors.enrollmentNo = 'Enrollment number must be at least 5 characters (e.g., 0827CS211001).';
    }

    // 3. Subject Name validation
    if (!formData.subjectName.trim()) {
      newErrors.subjectName = 'Subject Name is required.';
    } else if (formData.subjectName.trim().length < 2) {
      newErrors.subjectName = 'Subject name must be at least 2 characters.';
    }

    // 4. Maximum Marks validation
    const maxVal = parseFloat(formData.maxMarks);
    if (!formData.maxMarks || isNaN(maxVal)) {
      newErrors.maxMarks = 'Valid maximum marks are required.';
    } else if (maxVal <= 0) {
      newErrors.maxMarks = 'Maximum marks must be greater than 0.';
    }

    // 5. Marks Obtained validation
    const obtainedVal = parseFloat(formData.marksObtained);
    if (formData.marksObtained === '' || isNaN(obtainedVal)) {
      newErrors.marksObtained = 'Marks obtained is required.';
    } else if (obtainedVal < 0) {
      newErrors.marksObtained = 'Marks obtained cannot be negative.';
    } else if (!isNaN(maxVal) && obtainedVal > maxVal) {
      newErrors.marksObtained = `Marks obtained (${obtainedVal}) cannot exceed maximum marks (${maxVal}).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = onSubmit({
      ...formData,
      marksObtained: parseFloat(formData.marksObtained),
      maxMarks: parseFloat(formData.maxMarks)
    });

    // If add is successful and not in edit mode, reset form
    if (result && result.success && !isEdit) {
      setFormData(DEFAULT_FORM_STATE);
      setErrors({});
    }
  };

  // Reset Form Handler
  const handleReset = () => {
    setFormData(DEFAULT_FORM_STATE);
    setErrors({});
  };

  // Real-time Preview Calculation
  const previewPercentage = calculatePercentage(formData.marksObtained, formData.maxMarks);
  const previewGrade = calculateGrade(previewPercentage);
  const previewStatus = calculateStatus(previewPercentage);
  const isMarksEntered = formData.marksObtained !== '' && !isNaN(parseFloat(formData.marksObtained));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Student Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Student Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="e.g. Aarav Sharma"
              className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                errors.studentName
                  ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.studentName && (
            <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.studentName}</p>
          )}
        </div>

        {/* Enrollment Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Enrollment Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Hash className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="enrollmentNo"
              value={formData.enrollmentNo}
              onChange={handleChange}
              placeholder="e.g. 0827CS211001"
              className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm uppercase border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                errors.enrollmentNo
                  ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.enrollmentNo && (
            <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.enrollmentNo}</p>
          )}
        </div>

        {/* Branch */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Engineering Branch <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <GitBranch className="w-4 h-4" />
            </div>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-sm border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {BRANCH_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Semester */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Semester <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-sm border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {SEMESTER_OPTIONS.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject Name */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Subject Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              placeholder="e.g. Web Technologies & Frameworks"
              className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                errors.subjectName
                  ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.subjectName && (
            <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.subjectName}</p>
          )}
        </div>

        {/* Marks Obtained */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Marks Obtained <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Award className="w-4 h-4" />
            </div>
            <input
              type="number"
              step="0.5"
              name="marksObtained"
              value={formData.marksObtained}
              onChange={handleChange}
              placeholder="e.g. 85"
              className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                errors.marksObtained
                  ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.marksObtained && (
            <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.marksObtained}</p>
          )}
        </div>

        {/* Maximum Marks */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Maximum Marks <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Percent className="w-4 h-4" />
            </div>
            <input
              type="number"
              step="1"
              name="maxMarks"
              value={formData.maxMarks}
              onChange={handleChange}
              placeholder="e.g. 100"
              className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                errors.maxMarks
                  ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.maxMarks && (
            <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.maxMarks}</p>
          )}
        </div>

      </div>

      {/* Real-time Calculation Preview Card */}
      {isMarksEntered && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 uppercase">
            <span>Live Calculation Preview:</span>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Percentage</span>
              <span className="font-bold text-slate-900">{previewPercentage}%</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Grade</span>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold border ${getGradeBadgeColor(previewGrade)}`}>
                {previewGrade}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Result</span>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${getStatusBadgeColor(previewStatus)}`}>
                {previewStatus}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
        {!isEdit && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        )}

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="flex items-center space-x-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isEdit ? 'Update Marks Record' : 'Save Marks Record'}</span>
        </button>
      </div>

    </form>
  );
};

export default StudentForm;
