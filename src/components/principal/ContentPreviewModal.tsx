"use client";

import { Content } from "@/types/content.types";
import { X, Calendar, Clock, User, FileImage, HardDrive } from "lucide-react";
import { useEffect } from "react";

interface Props {
  item: Content | null;
  onClose: () => void;
}

function getScheduleStatus(startTime: string, endTime: string) {
  const now   = new Date();
  const start = new Date(startTime);
  const end   = new Date(endTime);

  if (now < start)
    return {
      label : "Scheduled",
      // these colours are safelisted in globals.css — both light & dark variants
      cls   : "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/50",
      dot   : "bg-indigo-600 dark:bg-indigo-400",
    };

  if (now >= start && now <= end)
    return {
      label : "Active",
      cls   : "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/50",
      dot   : "bg-emerald-500 dark:bg-emerald-400",
    };

  return {
    label : "Expired",
    cls   : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600",
    dot   : "bg-gray-400 dark:bg-gray-500",
  };
}

function formatSize(bytes?: number) {
  if (!bytes) return "N/A";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Tiny helper so repeated label markup stays DRY ──────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5
      text-gray-400 dark:text-gray-500">
      {children}
    </p>
  );
}

// ────────────────────────────────────────────────────────────────────────────
export default function ContentPreviewModal({ item, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!item) return null;

  const schedule = getScheduleStatus(item.startTime, item.endTime);

  return (
    /* Backdrop — slightly darker in dark mode */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* ── Card ── */}
      <div
        className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden
          animate-fade
          bg-white        dark:bg-gray-900
          border border-transparent dark:border-gray-700/60"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4
          border-b border-gray-100 dark:border-gray-700/60">

          <div className="flex items-center gap-2">
            {/* violet accent — matches globals.css theme */}
            <FileImage size={18} className="text-violet-600 dark:text-violet-400" />
            <h2 className="text-base font-bold
              text-gray-900 dark:text-gray-100">
              Content Preview
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-xl flex items-center justify-center transition
              bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700
              dark:bg-gray-700/70 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Image preview ── */}
        <div className="bg-gray-50 dark:bg-gray-800
          border-b border-gray-100 dark:border-gray-700/60">
          <img
            src={item.fileUrl}
            alt={item.title}
            className="w-full max-h-56 object-cover"
          />
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-4">

          {/* Status badge + file size badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1
              rounded-full text-xs font-semibold border ${schedule.cls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${schedule.dot}`} />
              {schedule.label}
            </span>

            {item.fileSize && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1
                rounded-full text-xs font-semibold
                bg-gray-100 text-gray-500 border border-gray-200
                dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600">
                <HardDrive size={11} />
                {formatSize(item.fileSize)}
              </span>
            )}
          </div>

          {/* Title + Subject */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Title</FieldLabel>
              <p className="text-sm font-bold leading-snug
                text-gray-900 dark:text-gray-100">
                {item.title}
              </p>
            </div>
            <div>
              <FieldLabel>Subject</FieldLabel>
              {/* violet pill — matches globals.css violet safelist */}
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold
                bg-violet-50 text-violet-700 border border-violet-100
                dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700/50">
                {item.subject}
              </span>
            </div>
          </div>

          {/* Teacher + File size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Teacher</FieldLabel>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0
                  bg-violet-100 dark:bg-violet-900/40">
                  <User size={10} className="text-violet-600 dark:text-violet-400" />
                </div>
                <p className="text-sm font-semibold truncate
                  text-gray-800 dark:text-gray-200">
                  {item.uploadedBy?.name ?? "—"}
                </p>
              </div>
            </div>
            <div>
              <FieldLabel>File Size</FieldLabel>
              <div className="flex items-center gap-1.5">
                <HardDrive size={13} className="text-gray-400 dark:text-gray-500" />
                <p className="text-sm font-semibold
                  text-gray-800 dark:text-gray-200">
                  {formatSize(item.fileSize)}
                </p>
              </div>
            </div>
          </div>

          {/* Start + End times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Start</FieldLabel>
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="shrink-0 text-gray-400 dark:text-gray-500" />
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {new Date(item.startTime).toLocaleString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div>
              <FieldLabel>End</FieldLabel>
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="shrink-0 text-gray-400 dark:text-gray-500" />
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
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
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60">
              <FieldLabel>Description</FieldLabel>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
