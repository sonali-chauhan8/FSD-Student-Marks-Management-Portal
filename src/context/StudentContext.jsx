import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculatePercentage, calculateGrade, calculateStatus } from '../utils/gradeCalculator';

// 1. Create the Context
const StudentContext = createContext();

// Sample initial data for B.Tech Full Stack Development Lab Demonstration
// Seeded ONLY when localStorage is empty
const INITIAL_SAMPLE_RECORDS = [
  {
    id: 'rec-001',
    studentName: 'Aarav Sharma',
    enrollmentNo: '0827CS211001',
    branch: 'Computer Science & Engineering',
    semester: '5th Semester',
    subjectName: 'Web Technologies & Frameworks',
    marksObtained: 88,
    maxMarks: 100,
    createdAt: '2026-09-10T10:30:00Z'
  },
  {
    id: 'rec-002',
    studentName: 'Aarav Sharma',
    enrollmentNo: '0827CS211001',
    branch: 'Computer Science & Engineering',
    semester: '5th Semester',
    subjectName: 'Database Management Systems',
    marksObtained: 92,
    maxMarks: 100,
    createdAt: '2026-09-10T11:00:00Z'
  },
  {
    id: 'rec-003',
    studentName: 'Diya Patel',
    enrollmentNo: '0827CS211045',
    branch: 'Computer Science & Engineering',
    semester: '5th Semester',
    subjectName: 'Web Technologies & Frameworks',
    marksObtained: 76,
    maxMarks: 100,
    createdAt: '2026-09-11T09:15:00Z'
  },
  {
    id: 'rec-004',
    studentName: 'Diya Patel',
    enrollmentNo: '0827CS211045',
    branch: 'Computer Science & Engineering',
    semester: '5th Semester',
    subjectName: 'Computer Networks',
    marksObtained: 81,
    maxMarks: 100,
    createdAt: '2026-09-11T14:20:00Z'
  },
  {
    id: 'rec-005',
    studentName: 'Rohan Verma',
    enrollmentNo: '0827IT211082',
    branch: 'Information Technology',
    semester: '5th Semester',
    subjectName: 'Full Stack Development',
    marksObtained: 64,
    maxMarks: 100,
    createdAt: '2026-09-12T10:00:00Z'
  },
  {
    id: 'rec-006',
    studentName: 'Rohan Verma',
    enrollmentNo: '0827IT211082',
    branch: 'Information Technology',
    semester: '5th Semester',
    subjectName: 'Cloud Computing',
    marksObtained: 58,
    maxMarks: 100,
    createdAt: '2026-09-12T11:30:00Z'
  },
  {
    id: 'rec-007',
    studentName: 'Ananya Gupta',
    enrollmentNo: '0827EC211019',
    branch: 'Electronics & Communication',
    semester: '5th Semester',
    subjectName: 'Microcontrollers & Embedded Systems',
    marksObtained: 95,
    maxMarks: 100,
    createdAt: '2026-09-13T10:45:00Z'
  },
  {
    id: 'rec-008',
    studentName: 'Kabir Singh',
    enrollmentNo: '0827CS211099',
    branch: 'Computer Science & Engineering',
    semester: '5th Semester',
    subjectName: 'Theory of Computation',
    marksObtained: 34,
    maxMarks: 100,
    createdAt: '2026-09-14T09:00:00Z'
  },
  {
    id: 'rec-009',
    studentName: 'Ishaan Joshi',
    enrollmentNo: '0827ME211030',
    branch: 'Mechanical Engineering',
    semester: '4th Semester',
    subjectName: 'Fluid Mechanics',
    marksObtained: 52,
    maxMarks: 100,
    createdAt: '2026-09-14T11:00:00Z'
  },
  {
    id: 'rec-010',
    studentName: 'Priya Nair',
    enrollmentNo: '0827CS211112',
    branch: 'Computer Science & Engineering',
    semester: '5th Semester',
    subjectName: 'Operating Systems',
    marksObtained: 89,
    maxMarks: 100,
    createdAt: '2026-09-15T10:10:00Z'
  }
];

const LOCAL_STORAGE_KEY = 'fsd_student_marks_records_v1';

// 2. Provider Component
export const StudentProvider = ({ children }) => {
  // useState Hook to manage records state
  const [records, setRecords] = useState(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData !== null) {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      // If nothing saved in localStorage (first visit), load sample demonstration records
      return INITIAL_SAMPLE_RECORDS;
    } catch (error) {
      console.error('Failed to parse localStorage data:', error);
      return INITIAL_SAMPLE_RECORDS;
    }
  });

  // useState Hook for toast notifications
  const [notification, setNotification] = useState(null);

  // Helper to trigger toast notification with auto-dismiss
  const showNotification = (type, message) => {
    const id = Date.now();
    setNotification({ id, type, message });
    setTimeout(() => {
      setNotification((current) => (current && current.id === id ? null : current));
    }, 4000);
  };

  // useEffect Hook to synchronize student records with browser localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error('Failed to write to localStorage:', error);
      showNotification('error', 'Browser storage quota exceeded or unavailable.');
    }
  }, [records]);

  /**
   * CREATE: Adds a new marks record.
   * Enforces uniqueness of (enrollmentNo + subjectName + semester).
   */
  const addRecord = (newRecord) => {
    const normalizedEnroll = (newRecord.enrollmentNo || '').trim().toUpperCase();
    const normalizedSubject = (newRecord.subjectName || '').trim().toLowerCase();
    const normalizedSemester = (newRecord.semester || '').trim();

    // Prevent duplicate enrollment-number-and-subject combinations within the same semester
    const isDuplicate = records.some(
      (r) =>
        (r.enrollmentNo || '').trim().toUpperCase() === normalizedEnroll &&
        (r.subjectName || '').trim().toLowerCase() === normalizedSubject &&
        (r.semester || '').trim() === normalizedSemester
    );

    if (isDuplicate) {
      const errorMsg = `Record already exists for ${newRecord.studentName} (${normalizedEnroll}) in ${newRecord.subjectName} for ${newRecord.semester}!`;
      showNotification('error', errorMsg);
      return { success: false, message: errorMsg };
    }

    const createdRecord = {
      ...newRecord,
      id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      enrollmentNo: normalizedEnroll,
      studentName: (newRecord.studentName || '').trim(),
      subjectName: (newRecord.subjectName || '').trim(),
      marksObtained: parseFloat(newRecord.marksObtained),
      maxMarks: parseFloat(newRecord.maxMarks || 100),
      createdAt: new Date().toISOString()
    };

    setRecords((prev) => [createdRecord, ...prev]);
    showNotification('success', `Marks record added successfully for ${createdRecord.studentName}!`);
    return { success: true, message: 'Record added successfully.' };
  };

  /**
   * UPDATE: Modifies an existing marks record.
   * Enforces uniqueness among other records.
   */
  const updateRecord = (id, updatedFields) => {
    const normalizedEnroll = (updatedFields.enrollmentNo || '').trim().toUpperCase();
    const normalizedSubject = (updatedFields.subjectName || '').trim().toLowerCase();
    const normalizedSemester = (updatedFields.semester || '').trim();

    const isDuplicate = records.some(
      (r) =>
        r.id !== id &&
        (r.enrollmentNo || '').trim().toUpperCase() === normalizedEnroll &&
        (r.subjectName || '').trim().toLowerCase() === normalizedSubject &&
        (r.semester || '').trim() === normalizedSemester
    );

    if (isDuplicate) {
      const errorMsg = `Duplicate entry: A record already exists for ${normalizedEnroll} in ${updatedFields.subjectName} for ${updatedFields.semester}!`;
      showNotification('error', errorMsg);
      return { success: false, message: errorMsg };
    }

    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              ...updatedFields,
              enrollmentNo: normalizedEnroll,
              studentName: (updatedFields.studentName || '').trim(),
              subjectName: (updatedFields.subjectName || '').trim(),
              marksObtained: parseFloat(updatedFields.marksObtained),
              maxMarks: parseFloat(updatedFields.maxMarks || 100),
              updatedAt: new Date().toISOString()
            }
          : r
      )
    );

    showNotification('success', `Record updated successfully for ${updatedFields.studentName}!`);
    return { success: true, message: 'Record updated successfully.' };
  };

  /**
   * DELETE: Removes a marks record by ID.
   */
  const deleteRecord = (id) => {
    const recordToDelete = records.find((r) => r.id === id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
    showNotification(
      'info',
      recordToDelete
        ? `Deleted record of ${recordToDelete.studentName} (${recordToDelete.subjectName})`
        : 'Record deleted.'
    );
    return { success: true };
  };

  /**
   * Reset data to initial sample demonstration records
   */
  const resetToSampleData = () => {
    setRecords(INITIAL_SAMPLE_RECORDS);
    showNotification('success', 'Reset student marks to default laboratory sample data.');
  };

  /**
   * Clear all records
   */
  const clearAllRecords = () => {
    setRecords([]);
    showNotification('info', 'All student records have been cleared.');
  };

  // Pre-calculated Dashboard Statistics
  const getOverallStats = () => {
    if (records.length === 0) {
      return {
        totalRecords: 0,
        totalStudents: 0,
        averagePercentage: 0,
        highestPercentage: 0,
        lowestPercentage: 0,
        passedStudents: 0,
        failedStudents: 0
      };
    }

    // Unique student enrollment numbers
    const uniqueEnrollments = new Set(
      records.map((r) => (r.enrollmentNo || '').trim().toUpperCase()).filter(Boolean)
    );
    const totalStudents = uniqueEnrollments.size;

    // Student-wise overall calculations
    const studentMap = {};
    records.forEach((r) => {
      const enroll = (r.enrollmentNo || '').trim().toUpperCase();
      if (!enroll) return;
      if (!studentMap[enroll]) {
        studentMap[enroll] = { obtained: 0, max: 0, hasFailed: false };
      }
      const obt = parseFloat(r.marksObtained) || 0;
      const max = parseFloat(r.maxMarks) || 100;
      const pct = calculatePercentage(obt, max);
      if (calculateStatus(pct) === 'Failed') {
        studentMap[enroll].hasFailed = true;
      }
      studentMap[enroll].obtained += obt;
      studentMap[enroll].max += max;
    });

    const studentPercentages = Object.values(studentMap).map((s) =>
      calculatePercentage(s.obtained, s.max)
    );

    const highest = studentPercentages.length > 0 ? Math.max(...studentPercentages) : 0;
    const lowest = studentPercentages.length > 0 ? Math.min(...studentPercentages) : 0;
    const sumPercentage = studentPercentages.reduce((acc, curr) => acc + curr, 0);
    const averagePercentage =
      studentPercentages.length > 0
        ? parseFloat((sumPercentage / studentPercentages.length).toFixed(2))
        : 0;

    let passedStudents = 0;
    let failedStudents = 0;

    Object.values(studentMap).forEach((s) => {
      const overallPct = calculatePercentage(s.obtained, s.max);
      if (overallPct >= 40 && !s.hasFailed) {
        passedStudents += 1;
      } else {
        failedStudents += 1;
      }
    });

    return {
      totalRecords: records.length,
      totalStudents,
      averagePercentage,
      highestPercentage: parseFloat(highest.toFixed(2)),
      lowestPercentage: parseFloat(lowest.toFixed(2)),
      passedStudents,
      failedStudents
    };
  };

  return (
    <StudentContext.Provider
      value={{
        records,
        addRecord,
        updateRecord,
        deleteRecord,
        resetToSampleData,
        clearAllRecords,
        notification,
        setNotification,
        showNotification,
        getOverallStats
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

// 3. Custom Hook for easy consumption
export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};

export default StudentContext;
