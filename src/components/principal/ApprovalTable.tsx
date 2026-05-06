"use client";

import { useState } from "react";
import { Content } from "@/types/content.types";
import { useApproveContent, useRejectContent } from "@/hooks/useApproval";
import RejectModal from "./RejectModal";
import { Check, X } from "lucide-react";

export default function ApprovalTable({ data }: { data: Content[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const approveMutation = useApproveContent();
  const rejectMutation = useRejectContent();

  const handleReject = (reason: string) => {
    if (!selectedId) return;
    rejectMutation.mutate(
      { id: selectedId, reason },
      { onSuccess: () => { setModalOpen(false); setSelectedId(null); } }
    );
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">📭</p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">No pending content</p>
        <p className="text-sm text-gray-400">Everything is reviewed 🎉</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <div key={item._id} className="bg-white dark:bg-gray-800 rounded-2xl border
            border-gray-100 dark:border-gray-700 p-4 shadow-sm space-y-3">

            <div className="flex gap-3">
              <img
                src={item.fileUrl}
                alt={item.title}
                className="w-20 h-14 object-cover rounded-xl border border-gray-100 shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                  {item.description || "No description"}
                </p>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-red-100 dark:bg-red-900/30
                  text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                  {item.subject}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              <span>👤 {item.uploadedBy?.name}</span>
              <span>📅 {new Date(item.startTime).toLocaleDateString()}</span>
              <span>⏰ {new Date(item.endTime).toLocaleDateString()}</span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                disabled={approveMutation.isPending}
                onClick={() => approveMutation.mutate(item._id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold
                  rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300
                  hover:bg-green-200 transition disabled:opacity-50"
              >
                <Check size={14} /> Approve
              </button>
              <button
                disabled={rejectMutation.isPending}
                onClick={() => { setSelectedId(item._id); setModalOpen(true); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold
                  rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300
                  hover:bg-red-200 transition disabled:opacity-50"
              >
                <X size={14} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr className="text-xs uppercase text-gray-500 dark:text-gray-400">
              <th className="px-5 py-3.5 text-left">Content</th>
              <th className="px-5 py-3.5 text-left">Subject</th>
              <th className="px-5 py-3.5 text-left">Teacher</th>
              <th className="px-5 py-3.5 text-left">Preview</th>
              <th className="px-5 py-3.5 text-left">Schedule</th>
              <th className="px-5 py-3.5 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {data.map((item) => (
              <tr key={item._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td className="px-5 py-4 max-w-[200px]">
                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {item.description || "No description"}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30
                    text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                    {item.subject}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-gray-700 dark:text-gray-300">{item.uploadedBy?.name}</p>
                  <p className="text-xs text-gray-400">{item.uploadedBy?.email}</p>
                </td>
                <td className="px-5 py-4">
                  <img src={item.fileUrl} alt={item.title}
                    className="h-14 w-20 object-cover rounded-xl border border-gray-100" />
                </td>
                <td className="px-5 py-4 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <p>{new Date(item.startTime).toLocaleString()}</p>
                  <p>{new Date(item.endTime).toLocaleString()}</p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button
                      disabled={approveMutation.isPending}
                      onClick={() => approveMutation.mutate(item._id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg
                        bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300
                        hover:bg-green-200 transition disabled:opacity-50"
                    >
                      <Check size={14} /> Approve
                    </button>
                    <button
                      disabled={rejectMutation.isPending}
                      onClick={() => { setSelectedId(item._id); setModalOpen(true); }}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg
                        bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300
                        hover:bg-red-200 transition disabled:opacity-50"
                    >
                      <X size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RejectModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedId(null); }}
        onSubmit={handleReject}
        isLoading={rejectMutation.isPending}
      />
    </>
  );
}