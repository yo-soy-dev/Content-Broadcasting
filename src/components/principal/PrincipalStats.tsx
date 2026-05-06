"use client";

import { usePrincipalStats } from "@/hooks/useApproval";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

const statCards = [
  {
    key: "total",
    label: "Total Content",
    icon: FileText,
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-800 dark:text-gray-100",
    iconColor: "text-gray-500 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-700",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock,
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-700 dark:text-amber-300",
    iconColor: "text-amber-500 dark:text-amber-400",
    border: "border-amber-100 dark:border-amber-800",
  },
  {
    key: "approved",
    label: "Approved",
    icon: CheckCircle,
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-700 dark:text-emerald-300",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    border: "border-emerald-100 dark:border-emerald-800",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: XCircle,
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-700 dark:text-red-300",
    iconColor: "text-red-500 dark:text-red-400",
    border: "border-red-100 dark:border-red-800",
  },
] as const;

export default function PrincipalStats() {
  const { data, isLoading } = usePrincipalStats();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map(({ key, label, icon: Icon, bg, text, iconColor, border }) => (
        <div
          key={key}
          className={`rounded-2xl p-5 ${bg} border ${border} shadow-sm
            hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {label}
            </p>
            <div className={`w-8 h-8 rounded-xl ${bg} border ${border}
              flex items-center justify-center`}>
              <Icon size={16} className={iconColor} />
            </div>
          </div>

          {isLoading ? (
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
          ) : (
            <p className={`text-3xl font-bold ${text}`}>
              {data?.[key] ?? 0}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}