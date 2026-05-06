'use client';

import { useState } from 'react';
import { useAllContent } from '@/hooks/useApproval';
import ContentFilters from '@/components/principal/ContentFilters';
import { Content } from '@/types/content.types';

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
  approved: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
  rejected: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
};

export default function AllContentPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const { data, isLoading, isError } = useAllContent({ search, status });
  const contents: Content[] = data?.contents || [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          All Content
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {data?.pagination?.total ?? 0} total items
        </p>
      </div>

      <ContentFilters onSearch={setSearch} onStatusChange={setStatus} />

      {isLoading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200
          dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
          Failed to load content. Please refresh.
        </div>
      )}

      {!isLoading && !isError && contents.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🗂️</p>
          <p className="font-medium text-gray-600 dark:text-gray-400">No content found</p>
          <p className="text-sm mt-1">Try changing your filters</p>
        </div>
      )}

      {!isLoading && !isError && contents.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
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
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition
                    bg-white dark:bg-gray-800">
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
                    <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20
                      text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                      {item.subject}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      {item.uploadedBy?.name}
                    </p>
                    <p className="text-xs text-gray-400">{item.uploadedBy?.email}</p>
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border
                      ${statusStyles[item.status]}`}>
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
      )}
    </div>
  );
}