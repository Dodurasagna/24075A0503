'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import IdeaCard from '@/components/IdeaCard';
import IdeaForm from '@/components/IdeaForm';
import { IIdea } from '@/models/Idea';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loadingIdeas, setLoadingIdeas] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchIdeas();
    }
  }, [user]);

  const fetchIdeas = async () => {
    try {
      const response = await fetch('/api/ideas', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ideas');
      }

      const data = await response.json();
      setIdeas(data.ideas);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoadingIdeas(false);
    }
  };

  const handleIdeaSubmit = (newIdea: IIdea) => {
    setIdeas([newIdea, ...ideas]);
    setShowForm(false);
  };

  const handleIdeaDelete = (ideaId: string) => {
    setIdeas(ideas.filter(idea => idea._id !== ideaId));
  };

  const handleUpdateIdea = async (ideaId: string, updates: any) => {
    try {
      const response = await fetch(`/api/ideas/${ideaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update idea');
      }

      const data = await response.json();
      setIdeas(ideas.map(idea => idea._id === ideaId ? data.idea : idea));
    } catch (error) {
      alert(`Error updating idea: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const filteredIdeas = ideas.filter(idea => {
    if (filter !== 'all' && idea.status !== filter) return false;
    if (searchTerm && !idea.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !idea.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !idea.category.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const statusOptions = [
    { value: 'all', label: 'All Ideas' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.role === 'student' ? 'My Ideas' : 'Student Ideas'}
          </h1>
          <p className="text-gray-600">
            {user.role === 'student' 
              ? 'Submit new ideas and track their progress'
              : 'Review and mentor student innovations'
            }
          </p>
        </div>

        {/* Actions and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {user.role === 'student' && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {showForm ? 'Cancel' : '+ Submit New Idea'}
              </button>
            )}
            
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <input
                type="text"
                placeholder="Search ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            {filteredIdeas.length} idea{filteredIdeas.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Idea Form */}
        {showForm && user.role === 'student' && (
          <div className="mb-8">
            <IdeaForm 
              onSubmit={handleIdeaSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Ideas Grid */}
        {loadingIdeas ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredIdeas.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No ideas found</h3>
            <p className="text-gray-600 mb-6">
              {user.role === 'student' 
                ? "Start by submitting your first innovative idea!"
                : "No student ideas match your current filters."
              }
            </p>
            {user.role === 'student' && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Submit Your First Idea
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea._id}
                idea={idea}
                onUpdate={(updatedIdea) => handleUpdateIdea(idea._id, updatedIdea)}
                onDelete={handleIdeaDelete}
              />
            ))}
          </div>
        )}

        {/* Faculty Actions */}
        {user.role === 'faculty' && filteredIdeas.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty Actions</h3>
            <p className="text-gray-600 mb-4">
              Click on any idea to review it. You can add comments and update the status to guide students.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block mb-2">Submitted</div>
                <p>New ideas waiting for review</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full inline-block mb-2">In Progress</div>
                <p>Ideas being developed</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full inline-block mb-2">Reviewed</div>
                <p>Ideas with feedback</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block mb-2">Approved</div>
                <p>Approved for development</p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full inline-block mb-2">Rejected</div>
                <p>Needs significant changes</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}