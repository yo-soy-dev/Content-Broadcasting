'use client';

import { useState } from 'react';
import { useAllContent } from '@/hooks/useApproval';
import ContentFilters from '@/components/principal/ContentFilters';
import { Content } from '@/types/content.types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const statusStyles: Record<string, string> = {
  pending:  'bg-yellow-50 text-yellow-700 border-yellow-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

export default function AllContentPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const { data, isLoading, isError } = useAllContent({ search, status, page });
  const contents: Content[] = data?.contents || [];
  const total = data?.pagination?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  // Search/filter change hone pe page reset karo
  const handleSearch = (val: string) => { setSearch(val); setPage(1); };
  const handleStatus = (val: string) => { setStatus(val); setPage(1); };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          All Content
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {total} total items
        </p>
      </div>

      <ContentFilters onSearch={handleSearch} onStatusChange={handleStatus} />

      {isLoading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800
              animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl
          text-sm text-red-600">
          Failed to load content. Please refresh.
        </div>
      )}

      {!isLoading && !isError && contents.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🗂️</p>
          <p className="font-medium text-gray-600 dark:text-gray-400">
            No content found
          </p>
          <p className="text-sm text-gray-400 mt-1">Try changing your filters</p>
        </div>
      )}

      {!isLoading && !isError && contents.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-200
            dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b
                border-gray-200 dark:border-gray-700">
                <tr>
                  {['Title', 'Subject', 'Teacher', 'Preview', 'Status', 'Uploaded'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium
                      text-gray-600 dark:text-gray-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {contents.map((item) => (
                  <tr key={item._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50
                      transition bg-white dark:bg-gray-800">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {item.title}
                      </p>
                      {item.rejectionReason && (
                        <p className="text-xs text-red-400 mt-0.5">
                          Reason: {item.rejectionReason}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-red-50 text-red-700
                        rounded-full text-xs font-medium">
                        {item.subject}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.uploadedBy?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.uploadedBy?.email}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={item.fileUrl}
                        alt={item.title}
                        className="h-14 w-20 object-cover rounded-lg border
                          border-gray-200 dark:border-gray-700"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs
                        font-medium border ${statusStyles[item.status]}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => p - 1)}
                  disabled={page === 1}
                  className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700
                    flex items-center justify-center text-gray-500
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={15} />
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages ||
                    Math.abs(p - page) <= 1)
                  .reduce((acc: (number | string)[], p, i, arr) => {
                    if (i > 0 && (p as number) - (arr[i-1] as number) > 1) {
                      acc.push('...');
                    }
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) => (
                    p === '...'
                      ? <span key={`dot-${i}`} className="text-gray-400 text-xs px-1">...</span>
                      : <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className={`w-8 h-8 rounded-lg text-xs font-medium transition
                            ${page === p
                              ? 'bg-red-600 text-white'
                              : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                          {p}
                        </button>
                  ))
                }

                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page === totalPages}
                  className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700
                    flex items-center justify-center text-gray-500
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
