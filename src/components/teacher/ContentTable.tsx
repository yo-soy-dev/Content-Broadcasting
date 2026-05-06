"use client";

import { Content } from "@/types/content.types";
import { useDeleteContent } from "@/hooks/useContent";
import { Trash2, Clock, CheckCircle2, XCircle, FileImage } from "lucide-react";


const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
    icon: <Clock size={11} />,
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    icon: <CheckCircle2 size={11} />,
  },
  rejected: {
    label: "Rejected",
    className: "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800",
    icon: <XCircle size={11} />,
  },
};

function ScheduleBadge({ startTime, endTime }: { startTime: string; endTime: string }) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  let label = "Scheduled";
  let cls = "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-300 border border-sky-200 dark:border-sky-800";

  if (now >= start && now <= end) {
    label = "Active";
    cls = "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200";
  } else if (now > end) {
    label = "Expired";
    cls = "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${cls}`}>
      {label}
    </span>
  );
}

export default function ContentTable({ data }: { data: Content[] }) {
  const deleteMutation = useDeleteContent();

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-dashed
        border-gray-200 dark:border-gray-700 py-20 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-700
          flex items-center justify-center mb-4">
          <FileImage size={24} className="text-gray-400" />
        </div>
        <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
          No content uploaded yet
        </p>
        <p className="text-sm text-gray-400 mt-1">Click "Upload Content" to get started</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {data.map((item) => {
          const status = statusConfig[item.status] ?? statusConfig.pending;
          return (
            <div key={item._id} className="bg-white dark:bg-gray-800 rounded-2xl border
              border-gray-100 dark:border-gray-700 p-4 shadow-sm space-y-3">

              {/* Preview + title */}
              <div className="flex gap-3">
                <div className="w-20 h-14 rounded-xl overflow-hidden border
                  border-gray-100 dark:border-gray-700 shrink-0">
                  <img src={item.fileUrl} alt={item.title}
                    className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5
                      bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300
                      rounded-full text-xs font-medium">
                      {item.subject}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5
                      rounded-full text-xs font-semibold ${status.className}`}>
                      {status.icon} {status.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rejection reason */}
              {item.rejectionReason && (
                <div className="flex gap-1.5 p-2.5 bg-rose-50 dark:bg-rose-900/20
                  rounded-xl border border-rose-100 dark:border-rose-800">
                  <XCircle size={13} className="text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-600 dark:text-rose-300">
                    {item.rejectionReason}
                  </p>
                </div>
              )}

              {/* Schedule + action */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
                  <p className="text-xs text-gray-400">
                    {new Date(item.startTime).toLocaleDateString()} —{" "}
                    {new Date(item.endTime).toLocaleDateString()}
                  </p>
                </div>
                {item.status === "pending" && (
                  <button
                    onClick={() => deleteMutation.mutate(item._id)}
                    disabled={deleteMutation.isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
                      rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300
                      border border-rose-100 hover:bg-rose-100 transition disabled:opacity-40"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700
              bg-gray-50/80 dark:bg-gray-900/50">
              {["Content", "Subject", "Preview", "Status", "Schedule", "Action"].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold
                  text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {data.map((item) => {
              const status = statusConfig[item.status] ?? statusConfig.pending;
              return (
                <tr key={item._id}
                  className="hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition group">
                  <td className="px-5 py-4 max-w-[220px]">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                    {item.rejectionReason && (
                      <div className="mt-1.5 flex items-start gap-1">
                        <XCircle size={11} className="text-rose-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-rose-500 line-clamp-2">
                          {item.rejectionReason}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30
                      text-indigo-700 dark:text-indigo-300 border border-indigo-100
                      dark:border-indigo-800 rounded-full text-xs font-semibold">
                      {item.subject}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="w-20 h-14 rounded-xl overflow-hidden
                      border border-gray-100 dark:border-gray-700 bg-gray-50">
                      <img src={item.fileUrl} alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1
                      rounded-full text-xs font-semibold ${status.className}`}>
                      {status.icon} {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-1.5">
                      <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
                      <p className="text-xs text-gray-400">
                        {new Date(item.startTime).toLocaleDateString()} —{" "}
                        {new Date(item.endTime).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] text-gray-300 dark:text-gray-600">
                        Rotation: {item.rotationDuration}s
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {item.status === "pending" && (
                      <button
                        onClick={() => deleteMutation.mutate(item._id)}
                        disabled={deleteMutation.isPending}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
                          rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300
                          border border-rose-100 hover:bg-rose-100 transition disabled:opacity-40"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}





// "use client";

// import { Content } from "@/types/content.types";
// import { useDeleteContent } from "@/hooks/useContent";
// import { Trash2, FileImage } from "lucide-react";
// import StatusBadge from "@/components/shared/StatusBadge";
// import EmptyState from "@/components/shared/EmptyState";
// import { formatDate, getScheduleStatus } from "@/utils/dateHelpers";

// function ScheduleBadge({ startTime, endTime }: { startTime: string; endTime: string }) {
//   const status = getScheduleStatus(startTime, endTime);
//   const config = {
//     scheduled: { label: "Scheduled", cls: "bg-sky-50 text-sky-600 border-sky-200" },
//     active:    { label: "Active",    cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
//     expired:   { label: "Expired",   cls: "bg-gray-100 text-gray-500 border-gray-200" },
//   };
//   const { label, cls } = config[status];
//   return (
//     <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cls}`}>
//       {label}
//     </span>
//   );
// }

// export default function ContentTable({ data }: { data: Content[] }) {
//   const deleteMutation = useDeleteContent();

//   if (data.length === 0) {
//     return (
//       <EmptyState
//         message="No content uploaded yet"
//         description='Click "Upload Content" to get started'
//       />
//     );
//   }

//   return (
//     <>
//       {/* Mobile cards */}
//       <div className="md:hidden space-y-4">
//         {data.map((item) => (
//           <div key={item._id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
//             <div className="flex gap-3">
//               <div className="w-20 h-14 rounded-xl overflow-hidden border border-gray-100 shrink-0">
//                 <img src={item.fileUrl} alt={item.title} className="w-full h-full object-cover" />
//               </div>
//               <div className="min-w-0">
//                 <p className="font-semibold text-gray-900 truncate">{item.title}</p>
//                 <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>
//                 <div className="flex gap-2 mt-1.5 flex-wrap">
//                   <span className="px-2 py-0.5 bg-violet-50 text-violet-700 border border-violet-100 rounded-full text-xs font-medium">
//                     {item.subject}
//                   </span>
//                   <StatusBadge status={item.status} />
//                 </div>
//               </div>
//             </div>

//             {item.rejectionReason && (
//               <div className="flex gap-1.5 p-2.5 bg-rose-50 rounded-xl border border-rose-100">
//                 <p className="text-xs text-rose-600">{item.rejectionReason}</p>
//               </div>
//             )}

//             <div className="flex items-center justify-between">
//               <div className="space-y-0.5">
//                 <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
//                 <p className="text-xs text-gray-400">
//                   {formatDate(item.startTime)} — {formatDate(item.endTime)}
//                 </p>
//               </div>
//               {item.status === "pending" && (
//                 <button
//                   onClick={() => deleteMutation.mutate(item._id)}
//                   disabled={deleteMutation.isPending}
//                   className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
//                     rounded-xl bg-rose-50 text-rose-600 border border-rose-100
//                     hover:bg-rose-100 transition disabled:opacity-40"
//                 >
//                   <Trash2 size={13} /> Delete
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Desktop table */}
//       <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-gray-100 bg-gray-50/80">
//               {["Content", "Subject", "Preview", "Status", "Schedule", "Action"].map(h => (
//                 <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {data.map((item) => (
//               <tr key={item._id} className="hover:bg-gray-50/60 transition group">
//                 <td className="px-5 py-4 max-w-[220px]">
//                   <p className="font-semibold text-gray-900 truncate">{item.title}</p>
//                   {item.description && (
//                     <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.description}</p>
//                   )}
//                   {item.rejectionReason && (
//                     <p className="text-xs text-rose-500 mt-1 line-clamp-2">
//                       ✕ {item.rejectionReason}
//                     </p>
//                   )}
//                 </td>

//                 <td className="px-5 py-4">
//                   <span className="px-2.5 py-1 bg-violet-50 text-violet-700 border border-violet-100 rounded-full text-xs font-semibold">
//                     {item.subject}
//                   </span>
//                 </td>

//                 <td className="px-5 py-4">
//                   <div className="w-20 h-14 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
//                     <img src={item.fileUrl} alt={item.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
//                   </div>
//                 </td>

//                 <td className="px-5 py-4">
//                   <StatusBadge status={item.status} />
//                 </td>

//                 <td className="px-5 py-4">
//                   <div className="space-y-1.5">
//                     <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
//                     <p className="text-xs text-gray-400">
//                       {formatDate(item.startTime)} — {formatDate(item.endTime)}
//                     </p>
//                     <p className="text-[10px] text-gray-300">Rotation: {item.rotationDuration}s</p>
//                   </div>
//                 </td>

//                 <td className="px-5 py-4">
//                   {item.status === "pending" && (
//                     <button
//                       onClick={() => deleteMutation.mutate(item._id)}
//                       disabled={deleteMutation.isPending}
//                       className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
//                         rounded-lg bg-rose-50 text-rose-600 border border-rose-100
//                         hover:bg-rose-100 transition disabled:opacity-40"
//                     >
//                       <Trash2 size={13} /> Delete
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }