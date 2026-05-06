'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('teacher' | 'principal')[];
}

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Wrong role — apne dashboard pe bhejo
      router.replace(user.role === 'teacher' ? '/teacher/dashboard' : '/principal/dashboard');
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router]);

  // Loading state — screen blank na dikhe
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (allowedRoles && user && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default AuthGuard;