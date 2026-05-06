"use client";

import { useTeacherStats } from "@/hooks/useContent";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

const statCards = [
  {
    key: "total",
    label: "Total Uploaded",
    icon: FileText,
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-100 dark:border-indigo-800",
    iconBg: "bg-indigo-100 dark:bg-indigo-800/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    valueColor: "text-indigo-700 dark:text-indigo-300",
    dot: "bg-indigo-400",
  },
  {
    key: "pending",
    label: "Pending Review",
    icon: Clock,
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-100 dark:border-amber-800",
    iconBg: "bg-amber-100 dark:bg-amber-800/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    valueColor: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-400",
  },
  {
    key: "approved",
    label: "Approved",
    icon: CheckCircle,
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-100 dark:border-emerald-800",
    iconBg: "bg-emerald-100 dark:bg-emerald-800/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    valueColor: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-400",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: XCircle,
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-100 dark:border-rose-800",
    iconBg: "bg-rose-100 dark:bg-rose-800/50",
    iconColor: "text-rose-600 dark:text-rose-400",
    valueColor: "text-rose-700 dark:text-rose-300",
    dot: "bg-rose-400",
  },
] as const;

export default function TeacherStats() {
  const { data, isLoading } = useTeacherStats();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map(({ key, label, icon: Icon, bg, border, iconBg, iconColor, valueColor, dot }) => (
        <div
          key={key}
          className={`relative rounded-2xl p-5 ${bg} border ${border}
            overflow-hidden group hover:shadow-md transition-all duration-200`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
              <Icon size={18} className={iconColor} />
            </div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1
              rounded-full bg-white/70 dark:bg-white/10 ${iconColor}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </div>

          {isLoading ? (
            <div className="h-9 w-14 bg-white/60 dark:bg-white/10 animate-pulse rounded-lg mb-1" />
          ) : (
            <p className={`text-4xl font-bold tracking-tight ${valueColor} mb-0.5`}>
              {data?.[key] ?? 0}
            </p>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>

          <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full
            ${iconBg} opacity-50 group-hover:scale-110 transition-transform duration-300`} />
        </div>
      ))}
    </div>
  );
}