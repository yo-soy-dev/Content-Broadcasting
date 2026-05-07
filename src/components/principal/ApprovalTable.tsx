"use client";

import { useState } from "react";
import { Content } from "@/types/content.types";
import { useApproveContent, useRejectContent } from "@/hooks/useApproval";
import RejectModal from "./RejectModal";
import ContentPreviewModal from "./ContentPreviewModal";
import { Check, X, Eye, CheckSquare } from "lucide-react";

// ── Schedule badge helper ──────────────────────────────────────────────────
function ScheduleBadge({ startTime, endTime }: { startTime: string; endTime: string }) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  let label = "Scheduled";
  let cls = "bg-sky-50 text-sky-600 border-sky-200";
  let dot = "bg-sky-400";

  if (now >= start && now <= end) {
    label = "Active"; cls = "bg-emerald-50 text-emerald-700 border-emerald-200"; dot = "bg-emerald-400";
  } else if (now > end) {
    label = "Expired"; cls = "bg-gray-100 text-gray-500 border-gray-200"; dot = "bg-gray-300";
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ApprovalTable({ data }: { data: Content[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<Content | null>(null);

  const approveMutation = useApproveContent();
  const rejectMutation = useRejectContent();

  const handleReject = (reason: string) => {
    if (!selectedId) return;
    rejectMutation.mutate(
      { id: selectedId, reason },
      { onSuccess: () => { setRejectModalOpen(false); setSelectedId(null); } }
    );
  };

  // ── Empty state ────────────────────────────────────────────────────────
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <CheckSquare size={26} className="text-emerald-500" />
        </div>
        <p className="text-base font-semibold text-gray-700">All caught up!</p>
        <p className="text-sm text-gray-400">No pending content to review</p>
      </div>
    );
  }

  return (
    <>
      {/* ── MOBILE cards ────────────────────────────────────────────────── */}
      <div className="md:hidden space-y-3">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3"
          >
            {/* Top: image + info */}
            <div className="flex gap-3">
              <button onClick={() => setPreviewItem(item)} className="shrink-0 group relative">
                <img
                  src={item.fileUrl}
                  alt={item.title}
                  className="w-20 h-14 object-cover rounded-xl border border-gray-100
                    group-hover:opacity-80 transition"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0
                  group-hover:opacity-100 transition">
                  <div className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                    <Eye size={12} className="text-white" />
                  </div>
                </div>
              </button>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900 truncate">{item.title}</p>
                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                  {item.description || "No description"}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100
                    rounded-full text-[10px] font-semibold">
                    {item.subject}
                  </span>
                  <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
              <span>👤 {item.uploadedBy?.name}</span>
              <span>📅 {new Date(item.startTime).toLocaleDateString()}</span>
              <span>🔚 {new Date(item.endTime).toLocaleDateString()}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setPreviewItem(item)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold
                  rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition"
              >
                <Eye size={13} /> Preview
              </button>
              <button
                disabled={approveMutation.isPending}
                onClick={() => approveMutation.mutate(item._id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold
                  rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100
                  hover:bg-emerald-100 transition disabled:opacity-50"
              >
                <Check size={13} /> Approve
              </button>
              <button
                disabled={rejectMutation.isPending}
                onClick={() => { setSelectedId(item._id); setRejectModalOpen(true); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold
                  rounded-xl bg-rose-50 text-rose-600 border border-rose-100
                  hover:bg-rose-100 transition disabled:opacity-50"
              >
                <X size={13} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP table ───────────────────────────────────────────────── */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80">
            <tr className="text-[11px] uppercase tracking-wide text-gray-500 border-b border-gray-100">
              <th className="px-5 py-3.5 text-left">Content</th>
              <th className="px-5 py-3.5 text-left">Subject</th>
              <th className="px-5 py-3.5 text-left">Teacher</th>
              <th className="px-5 py-3.5 text-left">Preview</th>
              <th className="px-5 py-3.5 text-left">Schedule</th>
              <th className="px-5 py-3.5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50/60 transition-colors group"
              >
                {/* Content */}
                <td className="px-5 py-4 max-w-[200px]">
                  <p className="font-semibold text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                    {item.description || "No description"}
                  </p>
                </td>

                {/* Subject */}
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100
                    rounded-full text-xs font-semibold">
                    {item.subject}
                  </span>
                </td>

                {/* Teacher */}
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-gray-800">{item.uploadedBy?.name}</p>
                  <p className="text-xs text-gray-400">{item.uploadedBy?.email}</p>
                </td>

                {/* Preview — click pe modal */}
                <td className="px-5 py-4">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="relative group/img"
                  >
                    <img
                      src={item.fileUrl}
                      alt={item.title}
                      className="h-14 w-20 object-cover rounded-xl border border-gray-100
                        group-hover/img:opacity-75 transition"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center
                      opacity-0 group-hover/img:opacity-100 transition rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                        <Eye size={14} className="text-white" />
                      </div>
                    </div>
                  </button>
                </td>

                {/* Schedule */}
                <td className="px-5 py-4">
                  <div className="space-y-1.5">
                    <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
                    <p className="text-[11px] text-gray-400">
                      {new Date(item.startTime).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short",
                      })}
                      {" — "}
                      {new Date(item.endTime).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short",
                      })}
                    </p>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button
                      disabled={approveMutation.isPending}
                      onClick={() => approveMutation.mutate(item._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg
                        bg-emerald-50 text-emerald-700 border border-emerald-100
                        hover:bg-emerald-100 transition disabled:opacity-50"
                    >
                      <Check size={13} /> Approve
                    </button>
                    <button
                      disabled={rejectMutation.isPending}
                      onClick={() => { setSelectedId(item._id); setRejectModalOpen(true); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg
                        bg-rose-50 text-rose-600 border border-rose-100
                        hover:bg-rose-100 transition disabled:opacity-50"
                    >
                      <X size={13} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <ContentPreviewModal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
      />

      <RejectModal
        isOpen={rejectModalOpen}
        onClose={() => { setRejectModalOpen(false); setSelectedId(null); }}
        onSubmit={handleReject}
        isLoading={rejectMutation.isPending}
      />
    </>
  );
}
