'use client';

import { usePendingContent } from '@/hooks/useApproval';
import ApprovalTable from '@/components/principal/ApprovalTable';

export default function ApprovalsPage() {
  const { data, isLoading, isError } = usePendingContent();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Pending Approvals
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review and approve or reject uploaded content
        </p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200
          dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
          Failed to load pending content. Please refresh.
        </div>
      )}

      {!isLoading && !isError && <ApprovalTable data={data || []} />}
    </div>
  );
}