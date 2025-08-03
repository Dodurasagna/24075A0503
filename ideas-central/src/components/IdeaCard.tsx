'use client';

import { useState } from 'react';
import { IIdea } from '@/models/Idea';
import { useAuth } from '@/context/AuthContext';
import FacultyModal from './FacultyModal';

interface IdeaCardProps {
  idea: IIdea;
  onUpdate?: (updates: any) => void;
  onDelete?: (ideaId: string) => void;
}

const statusColors = {
  submitted: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-purple-100 text-purple-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function IdeaCard({ idea, onUpdate, onDelete }: IdeaCardProps) {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this idea?')) return;
    
    try {
      const response = await fetch(`/api/ideas/${idea._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      onDelete?.(idea._id);
    } catch (error) {
      alert(`Error deleting idea: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleFacultyUpdate = async (updates: any) => {
    if (onUpdate) {
      await onUpdate(updates);
    }
  };

  return (
    <>
      <div 
        className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 ${
          user?.role === 'faculty' ? 'cursor-pointer' : ''
        }`}
        onClick={user?.role === 'faculty' ? () => setShowModal(true) : undefined}
      >
        <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {idea.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[idea.status]}`}>
            {idea.status.replace('_', ' ')}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {idea.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm">
            {idea.category}
          </span>
          {idea.teamMembers.map((member, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
              {member}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>By: {idea.studentName}</span>
          <span>{formatDate(idea.createdAt)}</span>
        </div>
        
        {idea.facultyComments && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Faculty Comments:</h4>
            <p className="text-blue-800">{idea.facultyComments}</p>
          </div>
        )}
        
        {user?.role === 'student' && user.id === idea.studentId && idea.status === 'submitted' && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          </div>
        )}

        {user?.role === 'faculty' && (
          <div className="mt-4 p-2 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-600 font-medium">Click to review and provide feedback</p>
          </div>
        )}
      </div>
    </div>

    {showModal && (
      <FacultyModal
        idea={idea}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpdate={handleFacultyUpdate}
      />
    )}
    </>
  );
}