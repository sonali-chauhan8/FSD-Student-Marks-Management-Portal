# Student Marks Management Portal 🎓

> **B.Tech Full Stack Development (FSD) Laboratory Experiment**  
> **Aim:** Develop a Single Page Application (SPA) using React functional components, React Hooks (`useState`, `useEffect`, `useContext`), and React Router (`react-router-dom`).

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Key Features](#key-features)
4. [Grading Scheme & Calculation Rules](#grading-scheme--calculation-rules)
5. [React Hooks Explanation (Viva Focus)](#react-hooks-explanation-viva-focus)
6. [Project Structure](#project-structure)
7. [Getting Started & Installation](#getting-started--installation)
8. [Demonstration & Testing Checklist](#demonstration--testing-checklist)
9. [Viva Voce Questions & Answers](#viva-voce-questions--answers)

---

## 1. Project Overview

The **Student Marks Management Portal** is a production-grade academic dashboard built as a Single Page Application (SPA). It allows faculty and students to record, edit, analyze, and view marks across engineering semesters and subjects.

All data persists in the browser's `localStorage`, providing immediate persistence across page reloads without requiring an external backend or database.

---

## 2. Technology Stack

- **React.js 18** (Vite build system): Fast functional component-based UI rendering.
- **JavaScript (ES6+) & JSX**: Clean, readable, beginner-friendly modern JavaScript syntax.
- **React Router DOM v6**: Client-side navigation (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Navigate`).
- **Tailwind CSS**: Modern academic blue-and-white theme, responsive flex/grid layouts.
- **Recharts**: Subject-wise average bar charts and grade distribution donut charts.
- **Lucide React**: Clean, accessible iconography.
- **HTML5 Web Storage (`localStorage`)**: Persistent client-side data store.

---

## 3. Key Features

### 📊 Dashboard
- **Total Students & Records**: Distinct student count and total marks entries.
- **Key Statistics Cards**: Average percentage, highest percentage, lowest percentage, passed count, and failed count.
- **Interactive Data Visualizations**:
  - Recharts Bar Chart: Subject-wise average performance.
  - Recharts Pie/Donut Chart: Institutional grade distribution ($A+, A, B, C, D, F$).
- **Recent Marks Feed**: Fast preview of the latest 5 submitted entries.

### ✍️ Add Student Marks
- Input fields:
  - Student Name (validated letters and minimum 2 characters)
  - Enrollment Number (e.g. `0827CS211001`)
  - Engineering Branch (CSE, IT, ECE, EE, ME, Civil)
  - Semester (1st to 8th Semester)
  - Subject Name
  - Marks Obtained & Maximum Marks
- **Real-time Live Calculation**: Instant preview of Percentage, Grade, and Status as numbers are entered.
- **Duplicate Prevention**: Rejects duplicate (Enrollment Number + Subject Name + Semester) entries.
- **Validation**: Ensures marks are non-negative and do not exceed maximum marks.

### 📋 Student Records Table
- Search records dynamically by Student Name, Enrollment Number, or Subject Name.
- Filter records by Branch and Semester.
- Interactive column sorting (Name, Branch, Marks, Percentage).
- In-place Edit modal with pre-populated values and duplicate validation.
- Delete records with confirmation prompt.
- Toast notifications for success and error alerts.

### 🏆 Results & Scorecards
- Student-wise aggregated results (combines all subject entries per student).
- Calculates:
  - Aggregate marks obtained and maximum marks.
  - Overall Percentage $= \frac{\sum \text{Obtained}}{\sum \text{Max}} \times 100$.
  - Institutional Grade ($A+, A, B, C, D, F$).
  - Overall Pass/Fail status.
- Expandable subject breakdown table for each student.
- Printable layout (`window.print()` or Save as PDF).

### ℹ️ About & Viva Guide
- Complete explanation of SPA architecture, React Hooks, and practical examination answers.

---

## 4. Grading Scheme & Calculation Rules

### Grade Allocation
| Percentage Range | Letter Grade | Academic Standing |
| :---: | :---: | :---: |
| **90% – 100%** | **A+** | Outstanding |
| **80% – 89%** | **A** | Excellent |
| **70% – 79%** | **B** | Very Good |
| **60% – 69%** | **C** | Good |
| **50% – 59%** | **D** | Satisfactory |
| **Below 50%** | **F** | Fail (< 40% threshold) |

### Pass/Fail Rules
- **Minimum Passing Percentage:** **40.0%** in individual subjects.
- **Overall Student Result:** A student passes if their overall aggregate percentage is $\ge 40\%$ **and** they have cleared every individual subject ($\ge 40\%$).

---

## 5. React Hooks Explanation (Viva Focus)

### 1. `useState`
- **Purpose:** Declares and manages state variables within functional components.
- **Usage in this Project:**
  - `records`: In `StudentContext.jsx` to store marks records.
  - `formData`: In `StudentForm.jsx` to capture user inputs.
  - `searchTerm`, `branchFilter`, `semesterFilter`: In `StudentTable.jsx` to filter rows.
  - `editingRecord`: In `Students.jsx` to control the edit modal.

### 2. `useEffect`
- **Purpose:** Performs side-effects in functional components (lifecycle equivalents: mount, update, unmount).
- **Usage in this Project:**
  - Synchronizes `records` to browser `localStorage` whenever state changes:
    ```javascript
    useEffect(() => {
      localStorage.setItem('fsd_student_marks_records_v1', JSON.stringify(records));
    }, [records]);
    ```
  - Pre-fills the edit form in `StudentForm.jsx` when `initialData` changes.

### 3. `useContext`
- **Purpose:** Subscribes a functional component to context changes, avoiding "prop drilling".
- **Usage in this Project:**
  - `StudentContext.Provider` wraps the application root.
  - Components invoke `useStudentContext()` to access `records`, `addRecord`, `updateRecord`, `deleteRecord`, and toast notifications from anywhere in the tree.

---

## 6. Project Structure

```
student-marks-portal/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── StudentContext.jsx        # Global state, CRUD methods, localStorage sync
    ├── utils/
    │   └── gradeCalculator.js       # Percentage, Grade, Status, and aggregation logic
    ├── components/
    │   ├── Navbar.jsx               # Top navigation, quick stats, mobile menu
    │   ├── Sidebar.jsx              # Active NavLinks, responsive drawer
    │   ├── StatCard.jsx             # Metric card for dashboard statistics
    │   ├── StudentForm.jsx          # Add/Edit marks form with live preview
    │   ├── StudentTable.jsx         # Searchable, filterable, sortable records table
    │   ├── ConfirmModal.jsx         # Delete and action confirmation modal
    │   └── NotificationToast.jsx    # Toast notification system
    └── pages/
        ├── Dashboard.jsx            # KPI cards and Recharts analytics
        ├── AddStudent.jsx           # Student marks submission page
        ├── Students.jsx             # Records management (CRUD)
        ├── Results.jsx              # Consolidated scorecards & print view
        └── About.jsx                # Viva guide & experiment documentation
```

---

## 7. Getting Started & Installation

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation Steps
1. Navigate to the project directory:
   ```bash
   cd student-marks-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

5. To generate a production build:
   ```bash
   npm run build
   ```

---

## 8. Demonstration & Testing Checklist

- [x] **Add Record:** Fill the form in `/add-student` and submit.
- [x] **Duplicate Validation:** Try adding the same student, subject, and semester again; verify error toast.
- [x] **Search & Filter:** Go to `/students`, search by enrollment number, and filter by branch.
- [x] **Edit Record:** Click edit on any record, change marks, and verify table updates.
- [x] **Delete Record:** Click delete, confirm prompt, and check that statistics update.
- [x] **Persist Data:** Refresh the browser page (`F5`) and verify records remain intact.
- [x] **Results View:** Go to `/results`, expand student scorecards, check totals and grades.
- [x] **Print View:** Click "Print / Save PDF" on the Results page.
- [x] **Reset Demo:** Click "Reset Demo" in the navbar to re-seed initial demonstration data.

---

## 9. Viva Voce Questions & Answers

**Q1: What is JSX?**  
*Answer:* JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows developers to write HTML-like markup directly within JavaScript files, transpiled to `React.createElement` calls by Babel/Vite.

**Q2: What is the Virtual DOM and why does React use it?**  
*Answer:* The Virtual DOM is a lightweight JavaScript representation of the real DOM. When component state changes, React creates a new virtual DOM tree, diffs it with the previous one (reconciliation), and updates only the changed elements in the real browser DOM, maximizing performance.

**Q3: How does React Router prevent full page reloads?**  
*Answer:* `react-router-dom` uses the browser's HTML5 History API (`pushState`, `replaceState`, and `popstate` events) to manipulate the URL in the address bar while conditionally rendering matching Route components without making a full HTTP GET request to a server.

**Q4: What is the purpose of `key` prop in React lists?**  
*Answer:* The `key` prop gives elements in an array a stable identity, allowing React's reconciliation algorithm to determine which items have been added, removed, or reordered efficiently without re-rendering the entire list.
