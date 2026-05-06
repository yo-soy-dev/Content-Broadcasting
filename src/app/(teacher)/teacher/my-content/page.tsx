'use client';

import { useState } from 'react';
import { useMyContent } from '@/hooks/useContent';
import ContentTable from '@/components/teacher/ContentTable';
import ContentFilters from '@/components/teacher/ContentFilters';
import Link from 'next/link';
import { Upload } from 'lucide-react';
import { ROUTES } from '@/config/routes';

export default function MyContentPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const { data, isLoading, isError } = useMyContent({ search, status });
  const contents = data?.contents || [];
  const total = data?.pagination?.total ?? 0;

  return (
    <div className="p-6 space-y-5 max-w-6xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Content
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {isLoading ? 'Loading...' : `${total} item${total !== 1 ? 's' : ''} total`}
          </p>
        </div>
        <Link
          href={ROUTES.TEACHER.UPLOAD}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white
            text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all
            shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          <Upload size={15} />
          Upload New
        </Link>
      </div>

      <ContentFilters onSearch={setSearch} onStatusChange={setStatus} />

      {isLoading && (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-900/20
          border border-rose-100 dark:border-rose-800 rounded-2xl text-sm
          text-rose-700 dark:text-rose-400">
          <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/40
            flex items-center justify-center shrink-0 text-rose-500 font-bold">!</span>
          Failed to load content. Please refresh the page.
        </div>
      )}

      {!isLoading && !isError && <ContentTable data={contents} />}
    </div>
  );
}