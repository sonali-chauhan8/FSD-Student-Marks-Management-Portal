import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { UserPlus, ArrowLeft, ShieldCheck, HelpCircle } from 'lucide-react';
import StudentForm from '../components/StudentForm';
import { useStudentContext } from '../context/StudentContext';

const AddStudent = () => {
  const { addRecord } = useStudentContext();
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    const result = addRecord(formData);
    if (result.success) {
      // Optional: navigate to records table or stay to add more
      // navigate('/students');
    }
    return result;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Back Link */}
      <div className="flex items-center justify-between">
        <div>
          <NavLink
            to="/students"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Student Records</span>
          </NavLink>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <UserPlus className="w-6 h-6 text-blue-600" />
            <span>New Student Marks Entry</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Record marks obtained in laboratory or end-semester examinations with automatic grade evaluation.
          </p>
        </div>
      </div>

      {/* Guidance Card for Students/Lab */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-start space-x-3 text-xs text-blue-900">
        <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-blue-950">Validation & Academic Integrity Rules:</p>
          <ul className="list-disc list-inside space-y-0.5 text-blue-800">
            <li>Duplicate enrollment number and subject combinations in the same semester are strictly prohibited.</li>
            <li>Passing threshold is calibrated at <strong>40.0%</strong> minimum score.</li>
            <li>Percentage and Letter Grade (<code className="font-semibold">A+, A, B, C, D, F</code>) are dynamically calculated.</li>
          </ul>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <StudentForm onSubmit={handleFormSubmit} />
      </div>

    </div>
  );
};

export default AddStudent;
