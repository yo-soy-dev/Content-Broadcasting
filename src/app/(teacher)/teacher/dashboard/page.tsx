

'use client';

import TeacherStats from '@/components/teacher/TeacherStats';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Upload, FileText, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/config/routes';

export default function TeacherDashboard() {
  const { user } = useAuth();

  const firstName = user?.name?.split(' ')[0] ?? 'Teacher';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-6 space-y-7 max-w-6xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium">{greeting}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">{firstName} 👋</h1>
          <p className="text-sm text-gray-500 mt-1">Here's an overview of your uploaded content.</p>
        </div>
        <Link
          href={ROUTES.TEACHER.UPLOAD}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white
            text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Upload size={15} />
          Upload Content
        </Link>
      </div>

      <TeacherStats />

      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href={ROUTES.TEACHER.UPLOAD}
            className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl
              hover:border-indigo-200 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Upload size={18} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Upload new content</p>
                <p className="text-xs text-gray-400">Add images for broadcasting</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href={ROUTES.TEACHER.MY_CONTENT}
            className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl
              hover:border-indigo-200 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <FileText size={18} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">View my content</p>
                <p className="text-xs text-gray-400">Track approval status</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
