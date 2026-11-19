/**
 * gradeCalculator.js
 * Utility functions for calculating percentages, grades, and pass/fail statuses.
 * Designed for B.Tech Full Stack Development Laboratory Experiment.
 */

/**
 * Calculates percentage rounded to 2 decimal places
 * @param {number|string} obtained - Marks obtained by student
 * @param {number|string} max - Maximum possible marks
 * @returns {number} Percentage value (0 - 100)
 */
export const calculatePercentage = (obtained, max) => {
  const obtainedNum = parseFloat(obtained);
  const maxNum = parseFloat(max);

  if (isNaN(obtainedNum) || isNaN(maxNum) || maxNum <= 0) {
    return 0;
  }

  const percentage = (obtainedNum / maxNum) * 100;
  return Math.min(100, Math.max(0, parseFloat(percentage.toFixed(2))));
};

/**
 * Determines letter grade based on percentage:
 *  - 90–100%: A+
 *  - 80–89%:  A
 *  - 70–79%:  B
 *  - 60–69%:  C
 *  - 50–59%:  D
 *  - Below 50%: F
 * @param {number} percentage 
 * @returns {string} Grade (A+, A, B, C, D, F)
 */
export const calculateGrade = (percentage) => {
  const pct = parseFloat(percentage);

  if (isNaN(pct) || pct < 0) return 'F';
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B';
  if (pct >= 60) return 'C';
  if (pct >= 50) return 'D';
  return 'F';
};

/**
 * Determines Pass or Fail status based on 40% passing benchmark.
 * @param {number} percentage 
 * @returns {string} "Passed" | "Failed"
 */
export const calculateStatus = (percentage) => {
  const pct = parseFloat(percentage);
  if (isNaN(pct)) return 'Failed';
  return pct >= 40 ? 'Passed' : 'Failed';
};

/**
 * Returns Tailwind CSS badge classes based on Grade
 * @param {string} grade 
 * @returns {string} Tailwind classes
 */
export const getGradeBadgeColor = (grade) => {
  switch (grade) {
    case 'A+':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'A':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'B':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'C':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'D':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'F':
    default:
      return 'bg-rose-100 text-rose-800 border-rose-300';
  }
};

/**
 * Returns Tailwind CSS badge classes based on Pass/Fail status
 * @param {string} status 
 * @returns {string} Tailwind classes
 */
export const getStatusBadgeColor = (status) => {
  return status === 'Passed'
    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    : 'bg-rose-100 text-rose-800 border border-rose-300';
};

/**
 * Aggregates all marks records grouped by student (Enrollment Number).
 * Computes total obtained marks, total maximum marks, overall percentage,
 * overall grade, and overall pass/fail status.
 * 
 * @param {Array} records - List of individual subject marks records
 * @returns {Array} List of aggregated student report summaries
 */
export const aggregateStudentResults = (records) => {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return [];
  }

  const studentMap = {};

  records.forEach((record) => {
    const key = record.enrollmentNo.trim().toUpperCase();

    if (!studentMap[key]) {
      studentMap[key] = {
        enrollmentNo: record.enrollmentNo.trim().toUpperCase(),
        studentName: record.studentName.trim(),
        branch: record.branch,
        semester: record.semester,
        totalObtained: 0,
        totalMax: 0,
        subjects: [],
        hasFailedSubject: false
      };
    }

    const obtained = parseFloat(record.marksObtained) || 0;
    const max = parseFloat(record.maxMarks) || 100;
    const subjectPct = calculatePercentage(obtained, max);
    const subjectGrade = calculateGrade(subjectPct);
    const subjectStatus = calculateStatus(subjectPct);

    if (subjectStatus === 'Failed') {
      studentMap[key].hasFailedSubject = true;
    }

    studentMap[key].totalObtained += obtained;
    studentMap[key].totalMax += max;
    studentMap[key].subjects.push({
      id: record.id,
      subjectName: record.subjectName,
      marksObtained: obtained,
      maxMarks: max,
      percentage: subjectPct,
      grade: subjectGrade,
      status: subjectStatus,
      semester: record.semester
    });
  });

  return Object.values(studentMap).map((student) => {
    const overallPercentage = calculatePercentage(student.totalObtained, student.totalMax);
    const overallGrade = calculateGrade(overallPercentage);
    
    // Overall pass condition: overall percentage >= 40% and no failed subject
    const overallStatus = (overallPercentage >= 40 && !student.hasFailedSubject) ? 'Passed' : 'Failed';

    return {
      ...student,
      overallPercentage,
      overallGrade,
      overallStatus,
      totalSubjects: student.subjects.length
    };
  });
};
