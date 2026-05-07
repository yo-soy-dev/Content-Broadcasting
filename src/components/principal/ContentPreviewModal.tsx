
"use client";

import { Content } from "@/types/content.types";
import { X, Calendar, Clock, User, BookOpen, FileImage, HardDrive } from "lucide-react";
import { useEffect } from "react";

interface Props {
  item: Content | null;
  onClose: () => void;
}

function getScheduleStatus(startTime: string, endTime: string) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start)
    return { label: "Scheduled", cls: "bg-sky-100 text-sky-700 border-sky-200", dot: "bg-sky-400" };
  if (now >= start && now <= end)
    return { label: "Active", cls: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-400" };
  return { label: "Expired", cls: "bg-gray-100 text-gray-500 border-gray-200", dot: "bg-gray-400" };
}

function formatSize(bytes?: number) {
  if (!bytes) return "N/A";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ContentPreviewModal({ item, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!item) return null;

  const schedule = getScheduleStatus(item.startTime, item.endTime);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal card — stop click bubbling */}
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden
          animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileImage size={18} className="text-indigo-500" />
            <h2 className="text-base font-bold text-gray-900">Content Preview</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center
              justify-center text-gray-500 hover:text-gray-700 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Image */}
        <div className="bg-gray-50 border-b border-gray-100">
          <img
            src={item.fileUrl}
            alt={item.title}
            className="w-full max-h-56 object-cover"
          />
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Schedule badge */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${schedule.cls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${schedule.dot}`} />
              {schedule.label}
            </span>
            {item.fileSize && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                bg-gray-100 text-gray-600 border border-gray-200">
                <HardDrive size={11} />
                {formatSize(item.fileSize)}
              </span>
            )}
          </div>

          {/* Title + Subject */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Title</p>
              <p className="text-sm font-bold text-gray-900 leading-snug">{item.title}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Subject</p>
              <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-700
                border border-indigo-100 rounded-full text-xs font-semibold">
                {item.subject}
              </span>
            </div>
          </div>

          {/* Teacher + Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Teacher</p>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <User size={10} className="text-indigo-600" />
                </div>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {item.uploadedBy?.name ?? "—"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">File Size</p>
              <div className="flex items-center gap-1.5">
                <HardDrive size={13} className="text-gray-400" />
                <p className="text-sm font-semibold text-gray-800">{formatSize(item.fileSize)}</p>
              </div>
            </div>
          </div>

          {/* Schedule times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Start</p>
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-gray-400 shrink-0" />
                <p className="text-xs text-gray-700 font-medium">
                  {new Date(item.startTime).toLocaleString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">End</p>
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-gray-400 shrink-0" />
                <p className="text-xs text-gray-700 font-medium">
                  {new Date(item.endTime).toLocaleString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div className="pt-1 border-t border-gray-50">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Description</p>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
