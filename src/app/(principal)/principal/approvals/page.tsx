'use client';

import { usePendingContent } from '@/hooks/useApproval';
import ApprovalTable from '@/components/principal/ApprovalTable';
import { ClipboardList } from 'lucide-react';

export default function ApprovalsPage() {
  const { data, isLoading, isError } = usePendingContent();
  const count = data?.length ?? 0;

  return (
    <div className="p-6 space-y-5 max-w-6xl">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Pending Approvals
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Review and approve or reject uploaded content
          </p>
        </div>

        {/* Live count badge */}
        {!isLoading && !isError && count > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl
            bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              {count} pending
            </span>
          </div>
        )}
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex items-center gap-3 p-4
          bg-red-50 dark:bg-red-900/20
          border border-red-200 dark:border-red-800
          rounded-2xl text-sm text-red-600 dark:text-red-400">
          <span className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/40
            flex items-center justify-center shrink-0 font-bold text-red-500">!</span>
          Failed to load pending content. Please refresh the page.
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && <ApprovalTable data={data || []} />}
    </div>
  );
}
