'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-white">💡 Ideas Central</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">
              Welcome, {user.name}
            </span>
            <span className="px-2 py-1 bg-white/20 rounded-full text-white text-sm capitalize">
              {user.role}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}