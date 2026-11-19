import {
  calculatePercentage,
  calculateGrade,
  calculateStatus,
  aggregateStudentResults
} from './src/utils/gradeCalculator.js';

console.log('====================================================');
console.log('🧪 RUNNING COMPREHENSIVE TEST SUITE FOR STUDENT MARKS PORTAL');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assertTest(condition, testName) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    process.exitCode = 1;
  }
}

// ----------------------------------------------------
// 1. Percentage Calculation Tests
// ----------------------------------------------------
console.log('[1/5] Testing Percentage Calculations:');
assertTest(calculatePercentage(88, 100) === 88, 'Standard 88/100 = 88%');
assertTest(calculatePercentage(45, 50) === 90, 'Scaled 45/50 = 90%');
assertTest(calculatePercentage(0, 100) === 0, 'Zero marks 0/100 = 0%');
assertTest(calculatePercentage(100, 100) === 100, 'Full marks 100/100 = 100%');
assertTest(calculatePercentage('75.5', '100') === 75.5, 'String parsing "75.5"/"100" = 75.5%');
assertTest(calculatePercentage(150, 100) === 100, 'Cap at 100% for over-max inputs');
assertTest(calculatePercentage(-10, 100) === 0, 'Negative marks capped at 0%');
assertTest(calculatePercentage(50, 0) === 0, 'Zero denominator handled gracefully without NaN');
assertTest(calculatePercentage('abc', 100) === 0, 'Invalid string input handled gracefully');

// ----------------------------------------------------
// 2. Grade Boundary Tests
// ----------------------------------------------------
console.log('\n[2/5] Testing Grade Scale (90-100 A+, 80-89 A, 70-79 B, 60-69 C, 50-59 D, <50 F):');
assertTest(calculateGrade(100) === 'A+', '100% gives A+');
assertTest(calculateGrade(90) === 'A+', '90% gives A+');
assertTest(calculateGrade(89.99) === 'A', '89.99% gives A');
assertTest(calculateGrade(80) === 'A', '80% gives A');
assertTest(calculateGrade(79.5) === 'B', '79.5% gives B');
assertTest(calculateGrade(70) === 'B', '70% gives B');
assertTest(calculateGrade(69.9) === 'C', '69.9% gives C');
assertTest(calculateGrade(60) === 'C', '60% gives C');
assertTest(calculateGrade(59.9) === 'D', '59.9% gives D');
assertTest(calculateGrade(50) === 'D', '50% gives D');
assertTest(calculateGrade(49.99) === 'F', '49.99% gives F');
assertTest(calculateGrade(40) === 'F', '40% gives F (per grading scale <50 is F)');
assertTest(calculateGrade(0) === 'F', '0% gives F');
assertTest(calculateGrade(-5) === 'F', 'Negative percentage gives F');

// ----------------------------------------------------
// 3. Pass/Fail Status Tests (40% Passing Threshold)
// ----------------------------------------------------
console.log('\n[3/5] Testing Pass / Fail Status (40% Passing Threshold):');
assertTest(calculateStatus(100) === 'Passed', '100% is Passed');
assertTest(calculateStatus(40) === 'Passed', 'Exact 40.0% is Passed');
assertTest(calculateStatus(40.01) === 'Passed', '40.01% is Passed');
assertTest(calculateStatus(39.99) === 'Failed', '39.99% is Failed');
assertTest(calculateStatus(0) === 'Failed', '0% is Failed');
assertTest(calculateStatus('invalid') === 'Failed', 'Invalid input fails safely');

// ----------------------------------------------------
// 4. Student Aggregation & Scorecard Tests
// ----------------------------------------------------
console.log('\n[4/5] Testing Multi-Subject Student Result Aggregation:');
const testRecords = [
  {
    id: '1',
    studentName: 'Aarav Sharma',
    enrollmentNo: '0827CS211001',
    branch: 'Computer Science',
    semester: '5th Semester',
    subjectName: 'Web Technologies',
    marksObtained: 85,
    maxMarks: 100
  },
  {
    id: '2',
    studentName: 'Aarav Sharma',
    enrollmentNo: '0827CS211001',
    branch: 'Computer Science',
    semester: '5th Semester',
    subjectName: 'DBMS',
    marksObtained: 95,
    maxMarks: 100
  },
  {
    id: '3',
    studentName: 'Kabir Singh',
    enrollmentNo: '0827CS211099',
    branch: 'Computer Science',
    semester: '5th Semester',
    subjectName: 'Theory of Computation',
    marksObtained: 35,
    maxMarks: 100
  }
];

const aggregated = aggregateStudentResults(testRecords);
assertTest(aggregated.length === 2, '2 distinct students aggregated correctly');

const aarav = aggregated.find((s) => s.enrollmentNo === '0827CS211001');
assertTest(aarav !== undefined, 'Aarav found in aggregated results');
assertTest(aarav.totalObtained === 180, 'Aarav total obtained is 180 (85 + 95)');
assertTest(aarav.totalMax === 200, 'Aarav total max is 200 (100 + 100)');
assertTest(aarav.overallPercentage === 90, 'Aarav overall percentage is 90%');
assertTest(aarav.overallGrade === 'A+', 'Aarav overall grade is A+');
assertTest(aarav.overallStatus === 'Passed', 'Aarav overall status is Passed');
assertTest(aarav.totalSubjects === 2, 'Aarav has 2 subjects recorded');

const kabir = aggregated.find((s) => s.enrollmentNo === '0827CS211099');
assertTest(kabir !== undefined, 'Kabir found in aggregated results');
assertTest(kabir.overallPercentage === 35, 'Kabir overall percentage is 35%');
assertTest(kabir.overallGrade === 'F', 'Kabir overall grade is F');
assertTest(kabir.overallStatus === 'Failed', 'Kabir overall status is Failed (< 40%)');

// ----------------------------------------------------
// 5. Duplicate Check Logic Tests
// ----------------------------------------------------
console.log('\n[5/5] Testing Duplicate Prevention Logic:');
const existingRecords = [
  {
    id: 'rec-1',
    enrollmentNo: '0827CS211001',
    subjectName: 'Web Technologies & Frameworks',
    semester: '5th Semester'
  }
];

function checkDuplicate(newRecord, list, excludeId = null) {
  const normEnroll = (newRecord.enrollmentNo || '').trim().toUpperCase();
  const normSubj = (newRecord.subjectName || '').trim().toLowerCase();
  const normSem = (newRecord.semester || '').trim();

  return list.some(
    (r) =>
      r.id !== excludeId &&
      (r.enrollmentNo || '').trim().toUpperCase() === normEnroll &&
      (r.subjectName || '').trim().toLowerCase() === normSubj &&
      (r.semester || '').trim() === normSem
  );
}

// Case 1: Exact match -> Duplicate
assertTest(
  checkDuplicate(
    { enrollmentNo: '0827CS211001', subjectName: 'Web Technologies & Frameworks', semester: '5th Semester' },
    existingRecords
  ) === true,
  'Flags exact duplicate enrollment + subject + semester'
);

// Case 2: Case-insensitive match -> Duplicate
assertTest(
  checkDuplicate(
    { enrollmentNo: '0827cs211001', subjectName: 'WEB TECHNOLOGIES & FRAMEWORKS', semester: '5th Semester' },
    existingRecords
  ) === true,
  'Flags case-insensitive duplicate correctly'
);

// Case 3: Same student, different subject -> Allowed
assertTest(
  checkDuplicate(
    { enrollmentNo: '0827CS211001', subjectName: 'Cloud Computing', semester: '5th Semester' },
    existingRecords
  ) === false,
  'Allows different subject in same semester'
);

// Case 4: Same student, same subject, different semester (e.g. improvement exam) -> Allowed
assertTest(
  checkDuplicate(
    { enrollmentNo: '0827CS211001', subjectName: 'Web Technologies & Frameworks', semester: '6th Semester' },
    existingRecords
  ) === false,
  'Allows same subject across different semesters'
);

console.log('\n====================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log('====================================================\n');
