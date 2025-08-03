'use client';

import { useState } from 'react';
import { IIdea } from '@/models/Idea';

interface FacultyModalProps {
  idea: IIdea;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updates: any) => void;
}

export default function FacultyModal({ idea, isOpen, onClose, onUpdate }: FacultyModalProps) {
  const [formData, setFormData] = useState({
    facultyComments: idea.facultyComments || '',
    status: idea.status,
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onUpdate(formData);
      onClose();
    } catch (error) {
      console.error('Error updating idea:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'submitted', label: 'Submitted', color: 'bg-blue-100 text-blue-800' },
    { value: 'in_progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'reviewed', label: 'Reviewed', color: 'bg-purple-100 text-purple-800' },
    { value: 'approved', label: 'Approved', color: 'bg-green-100 text-green-800' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Review Idea</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Idea Details */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{idea.title}</h3>
            <p className="text-gray-600 mb-4">{idea.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Category:</span>
                <span className="ml-2 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">
                  {idea.category}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Student:</span>
                <span className="ml-2">{idea.studentName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2">{idea.studentEmail}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Submitted:</span>
                <span className="ml-2">{new Date(idea.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {idea.teamMembers.length > 0 && (
              <div className="mt-4">
                <span className="font-medium text-gray-700">Team Members:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {idea.teamMembers.map((member, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Update Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="facultyComments" className="block text-sm font-medium text-gray-700 mb-2">
                Faculty Comments & Feedback
              </label>
              <textarea
                id="facultyComments"
                rows={6}
                value={formData.facultyComments}
                onChange={(e) => setFormData({ ...formData, facultyComments: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide detailed feedback, suggestions, or guidance for the student..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? 'Updating...' : 'Update Idea'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}