"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";

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

  const hasActiveFilter = search || activeStatus !== "all";

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100
      dark:border-gray-700 rounded-2xl p-4 shadow-sm mb-6">

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-lg border
              border-gray-200 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700
              text-sm text-gray-900 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              outline-none focus:ring-2 focus:ring-red-400/30
              focus:border-red-300 transition"
          />
          {/* Clear search */}
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-gray-600 transition"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Status buttons */}
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => {
            const isActive = activeStatus === status;
            return (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-3 py-1.5 text-xs rounded-full font-medium transition
                  ${isActive
                    ? "bg-red-600 text-white shadow-sm shadow-red-200"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ✅ Active filter indicators */}
      {hasActiveFilter && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t
          border-gray-100 dark:border-gray-700 flex-wrap">
          <span className="text-xs text-gray-400">Active filters:</span>

          {activeStatus !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5
              bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300
              border border-red-100 dark:border-red-800
              rounded-full text-xs font-medium">
              {activeStatus}
              <button
                onClick={() => setActiveStatus("all")}
                className="hover:text-red-800 transition ml-0.5"
              >
                <X size={10} />
              </button>
            </span>
          )}

          {search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5
              bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300
              rounded-full text-xs font-medium">
              "{debouncedSearch}"
              <button
                onClick={() => setSearch("")}
                className="hover:text-gray-800 dark:hover:text-gray-100
                  transition ml-0.5"
              >
                <X size={10} />
              </button>
            </span>
          )}

          {/* Clear all */}
          <button
            onClick={() => { setSearch(""); setActiveStatus("all"); }}
            className="text-xs text-gray-400 hover:text-gray-600
              dark:hover:text-gray-200 underline transition ml-1"
          >
            Clear all
          </button>
        </div>
      )}

    </div>
  );
}
