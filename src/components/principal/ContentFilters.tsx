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