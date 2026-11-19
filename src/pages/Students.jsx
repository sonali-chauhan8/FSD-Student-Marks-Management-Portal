import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  PlusCircle,
  FileSpreadsheet,
  X,
  Trash2
} from 'lucide-react';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/StudentForm';
import ConfirmModal from '../components/ConfirmModal';
import { useStudentContext } from '../context/StudentContext';

const Students = () => {
  const { records, updateRecord, deleteRecord, clearAllRecords } = useStudentContext();

  // State for Edit Modal
  const [editingRecord, setEditingRecord] = useState(null);

  // State for Delete Confirmation Modal
  const [deletingRecord, setDeletingRecord] = useState(null);

  // State for Clear All Confirmation Modal
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  // Handle Edit Click
  const handleEdit = (record) => {
    setEditingRecord(record);
  };

  // Handle Update Submit
  const handleUpdateSubmit = (updatedData) => {
    if (!editingRecord) return;
    const result = updateRecord(editingRecord.id, updatedData);
    if (result && result.success) {
      setEditingRecord(null);
    }
    return result;
  };

  // Handle Delete Click
  const handleDelete = (record) => {
    setDeletingRecord(record);
  };

  // Confirm Delete Action
  const confirmDelete = () => {
    if (deletingRecord) {
      deleteRecord(deletingRecord.id);
      setDeletingRecord(null);
    }
  };

  // Confirm Clear All Action
  const confirmClearAll = () => {
    clearAllRecords();
    setIsClearAllModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Users className="w-6 h-6 text-blue-600" />
            <span>Student Marks Directory</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage, filter, search, edit, and audit student academic marks records.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {records.length > 0 && (
            <button
              type="button"
              onClick={() => setIsClearAllModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-200"
            >
              Clear All Records
            </button>
          )}

          <NavLink
            to="/add-student"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Marks</span>
          </NavLink>
        </div>
      </div>

      {/* Student Records Table Component */}
      <StudentTable
        records={records}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Edit Record Modal */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base">
                Edit Marks: {editingRecord.studentName} ({editingRecord.subjectName})
              </h3>
              <button
                type="button"
                onClick={() => setEditingRecord(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <StudentForm
                initialData={editingRecord}
                onSubmit={handleUpdateSubmit}
                onCancel={() => setEditingRecord(null)}
                isEdit={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Record Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingRecord)}
        title="Delete Marks Record"
        message={
          deletingRecord
            ? `Are you sure you want to delete the marks entry for ${deletingRecord.studentName} in "${deletingRecord.subjectName}" (${deletingRecord.semester})? This action cannot be undone.`
            : ''
        }
        confirmText="Yes, Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingRecord(null)}
        isDanger={true}
      />

      {/* Clear All Records Confirmation Modal */}
      <ConfirmModal
        isOpen={isClearAllModalOpen}
        title="Clear All Student Records"
        message="Are you sure you want to delete ALL student marks records from browser storage? You can re-populate sample data anytime using the 'Reset Demo' button."
        confirmText="Clear All Data"
        onConfirm={confirmClearAll}
        onCancel={() => setIsClearAllModalOpen(false)}
        isDanger={true}
      />

    </div>
  );
};

export default Students;
