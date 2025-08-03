'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            💡 Ideas Central
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Smart Education Platform for Innovation. Empower college students to submit, refine, 
            and manage innovative project ideas while enabling faculty to view, mentor, and track student progress.
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">👩‍🎓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">For Students</h3>
              <p className="text-gray-600">
                Submit innovative project ideas, track their progress, and receive feedback from faculty mentors.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">For Faculty</h3>
              <p className="text-gray-600">
                Review student submissions, provide mentorship, and guide innovative projects to success.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation Hub</h3>
              <p className="text-gray-600">
                Foster a collaborative ecosystem where creative ideas can grow and flourish.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
