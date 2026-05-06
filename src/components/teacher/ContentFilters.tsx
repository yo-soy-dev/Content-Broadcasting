// // "use client";

// // import { useEffect, useState } from "react";
// // import useDebounce from "@/hooks/useDebounce";
// // import { Search } from "lucide-react";

// // interface ContentFiltersProps {
// //   onSearch: (val: string) => void;
// //   onStatusChange: (val: string) => void;
// // }

// // const statuses = ["all", "pending", "approved", "rejected"];

// // export default function ContentFilters({
// //   onSearch,
// //   onStatusChange,
// // }: ContentFiltersProps) {
// //   const [search, setSearch] = useState("");
// //   const [activeStatus, setActiveStatus] = useState("all");

// //   const debouncedSearch = useDebounce(search, 400);

// //   useEffect(() => {
// //     onSearch(debouncedSearch);
// //   }, [debouncedSearch]);

// //   useEffect(() => {
// //     onStatusChange(activeStatus === "all" ? "" : activeStatus);
// //   }, [activeStatus]);

// //   return (
// //     <div className="bg-white border rounded-2xl p-4 shadow-sm mb-6">
      
// //       <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
// //         {/* 🔍 Search */}
// //         <div className="relative w-full md:w-80">
// //           <Search
// //             size={16}
// //             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
// //           />
// //           <input
// //             type="text"
// //             placeholder="Search content..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50
// //             text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
// //           />
// //         </div>

// //         {/* 🎯 Status Filters */}
// //         <div className="flex flex-wrap gap-2">
// //           {statuses.map((status) => {
// //             const isActive = activeStatus === status;

// //             return (
// //               <button
// //                 key={status}
// //                 onClick={() => setActiveStatus(status)}
// //                 className={`px-3 py-1.5 text-xs rounded-full font-medium transition
// //                 ${
// //                   isActive
// //                     ? "bg-blue-500 text-white"
// //                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //                 }`}
// //               >
// //                 {status.charAt(0).toUpperCase() + status.slice(1)}
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useState } from "react";
// import useDebounce from "@/hooks/useDebounce";
// import { Search, X } from "lucide-react";

// interface ContentFiltersProps {
//   onSearch: (val: string) => void;
//   onStatusChange: (val: string) => void;
// }

// const statuses = [
//   { value: "all", label: "All" },
//   { value: "pending", label: "Pending", dot: "bg-amber-400" },
//   { value: "approved", label: "Approved", dot: "bg-emerald-400" },
//   { value: "rejected", label: "Rejected", dot: "bg-rose-400" },
// ];

// export default function ContentFilters({ onSearch, onStatusChange }: ContentFiltersProps) {
//   const [search, setSearch] = useState("");
//   const [activeStatus, setActiveStatus] = useState("all");
//   const debouncedSearch = useDebounce(search, 400);

//   useEffect(() => { onSearch(debouncedSearch); }, [debouncedSearch]);
//   useEffect(() => { onStatusChange(activeStatus === "all" ? "" : activeStatus); }, [activeStatus]);

//   return (
//     <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
//       {/* Search */}
//       <div className="relative w-full sm:w-72">
//         <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search by title or subject..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm
//             outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition"
//         />
//         {search && (
//           <button
//             onClick={() => setSearch("")}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             <X size={14} />
//           </button>
//         )}
//       </div>

//       {/* Status Pills */}
//       <div className="flex gap-1.5 flex-wrap">
//         {statuses.map(({ value, label, dot }) => {
//           const isActive = activeStatus === value;
//           return (
//             <button
//               key={value}
//               onClick={() => setActiveStatus(value)}
//               className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150
//                 ${isActive
//                   ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//             >
//               {dot && <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white/70" : dot}`} />}
//               {label}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";

interface ContentFiltersProps {
  onSearch: (val: string) => void;
  onStatusChange: (val: string) => void;
}

const statuses = ["all", "pending", "approved", "rejected"];

export default function ContentFilters({
  onSearch,
  onStatusChange,
}: ContentFiltersProps) {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    onStatusChange(activeStatus === "all" ? "" : activeStatus);
  }, [activeStatus]);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
      rounded-2xl p-4 shadow-sm mb-6">

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border
              border-gray-200 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700
              text-sm text-gray-900 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => {
            const isActive = activeStatus === status;
            return (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-3 py-1.5 text-xs rounded-full font-medium transition
                  ${isActive
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}