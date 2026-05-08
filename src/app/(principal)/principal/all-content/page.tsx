'use client';

import { useState } from 'react';
import { useAllContent } from '@/hooks/useApproval';
import ContentFilters from '@/components/principal/ContentFilters';
import ContentPreviewModal from '@/components/principal/ContentPreviewModal';
import { Content } from '@/types/content.types';
import { ChevronLeft, ChevronRight, Eye, FolderOpen } from 'lucide-react';

// ── Status badge ──────────────────────────────────────────────────────────
const statusStyles: Record<string, string> = {
  pending:  'bg-yellow-50 text-yellow-700 border-yellow-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

// ── Schedule badge ────────────────────────────────────────────────────────
function ScheduleBadge({ startTime, endTime }: { startTime: string; endTime: string }) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  let label = 'Scheduled';
  let cls = 'bg-sky-50 text-sky-600 border-sky-200';
  let dot = 'bg-sky-400';

  if (now >= start && now <= end) {
    label = 'Active'; cls = 'bg-green-50 text-green-700 border-green-200'; dot = 'bg-green-400';
  } else if (now > end) {
    label = 'Expired'; cls = 'bg-gray-100 text-gray-500 border-gray-200'; dot = 'bg-gray-300';
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

// ── File size formatter ───────────────────────────────────────────────────
function formatSize(bytes?: number) {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function AllContentPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [previewItem, setPreviewItem] = useState<Content | null>(null);
  const LIMIT = 10;

  const { data, isLoading, isError } = useAllContent({ search, status, page });
  const contents: Content[] = data?.contents || [];
  const total = data?.pagination?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  const handleSearch = (val: string) => { setSearch(val); setPage(1); };
  const handleStatus = (val: string) => { setStatus(val); setPage(1); };

  return (
    <div className="p-6 space-y-5 max-w-7xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          All Content
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {isLoading ? 'Loading...' : `${total} total item${total !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Filters */}
      <ContentFilters onSearch={handleSearch} onStatusChange={handleStatus} />

      {/* Loading */}
      {isLoading && (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex items-center gap-3 p-4
          bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800
          rounded-2xl text-sm text-red-600 dark:text-red-400">
          <span className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/40
            flex items-center justify-center shrink-0 font-bold">!</span>
          Failed to load content. Please refresh the page.
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && contents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800
            flex items-center justify-center">
            <FolderOpen size={26} className="text-gray-400" />
          </div>
          <p className="font-semibold text-gray-600 dark:text-gray-400">No content found</p>
          <p className="text-sm text-gray-400">Try changing your filters</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && contents.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray-200
            dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b
                border-gray-100 dark:border-gray-700">
                <tr>
                  {['Title', 'Subject', 'Teacher', 'Preview', 'Status', 'Schedule', 'Size', 'Uploaded'].map(h => (
                    <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold
                      text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {contents.map((item) => (
                  <tr key={item._id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-700/50 transition group">

                    {/* Title */}
                    <td className="px-4 py-4 max-w-[180px]">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {item.title}
                      </p>
                      {item.rejectionReason && (
                        <p className="text-xs text-red-400 mt-0.5 line-clamp-1">
                          ↳ {item.rejectionReason}
                        </p>
                      )}
                    </td>

                    {/* Subject */}
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-red-50 dark:bg-red-900/20
                        text-red-700 dark:text-red-300
                        border border-red-100 dark:border-red-800
                        rounded-full text-xs font-semibold whitespace-nowrap">
                        {item.subject}
                      </span>
                    </td>

                    {/* Teacher */}
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item.uploadedBy?.name}
                      </p>
                      <p className="text-xs text-gray-400">{item.uploadedBy?.email}</p>
                    </td>

                    {/* Preview — click pe modal */}
                    <td className="px-4 py-4">
                      <button
                        onClick={() => setPreviewItem(item)}
                        className="relative group/img block"
                      >
                        <img
                          src={item.fileUrl}
                          alt={item.title}
                          className="h-14 w-20 object-cover rounded-xl
                            border border-gray-200 dark:border-gray-700
                            group-hover/img:opacity-75 transition"
                        />
                        <div className="absolute inset-0 flex items-center justify-center
                          opacity-0 group-hover/img:opacity-100 transition rounded-xl">
                          <div className="w-8 h-8 rounded-full bg-black/50
                            flex items-center justify-center">
                            <Eye size={14} className="text-white" />
                          </div>
                        </div>
                      </button>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border
                        whitespace-nowrap ${statusStyles[item.status]}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>

                    {/* Schedule */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
                        <p className="text-[10px] text-gray-400 whitespace-nowrap">
                          {new Date(item.startTime).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short',
                          })}
                          {' — '}
                          {new Date(item.endTime).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short',
                          })}
                        </p>
                      </div>
                    </td>

                    {/* Size */}
                    <td className="px-4 py-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {formatSize(item.fileSize) ?? '—'}
                      </span>
                    </td>

                    {/* Uploaded date */}
                    <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total}
              </p>
              <div className="flex items-center gap-1.5">
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

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce((acc: (number | string)[], p, i, arr) => {
                    if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '...'
                      ? <span key={`dot-${i}`} className="text-gray-400 text-xs px-1">...</span>
                      : <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className={`w-8 h-8 rounded-lg text-xs font-semibold transition
                            ${page === p
                              ? 'bg-red-600 text-white shadow-sm'
                              : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                          {p}
                        </button>
                  )
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

      {/* Preview Modal */}
      <ContentPreviewModal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
      />
    </div>
  );
}
