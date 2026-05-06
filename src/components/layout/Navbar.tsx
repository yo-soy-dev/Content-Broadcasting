"use client";

import { useAuth } from "@/hooks/useAuth";
import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isTeacher = (user?.role ?? "teacher") === "teacher";

  return (
    <header className={`h-16 bg-white dark:bg-gray-900 border-b flex items-center
      justify-between px-4 md:px-6 shrink-0
      ${isTeacher
        ? "border-indigo-100 dark:border-indigo-900"
        : "border-red-100 dark:border-red-900"
      }`}>

      {/* Left — mobile pe hamburger ke liye space */}
      <div className="flex items-center gap-2 ml-10 md:ml-0">
        <span className={`w-2 h-2 rounded-full shrink-0
          ${isTeacher ? "bg-indigo-500" : "bg-red-500"}`} />
        <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
          Content Broadcasting
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Dark Mode Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-xl flex items-center justify-center
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "dark"
              ? <Sun size={17} className="text-yellow-400" />
              : <Moon size={17} className="text-gray-500" />
            }
          </button>
        )}

        {/* Bell — mobile pe hide */}
        <button className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center
          hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Bell size={17} className="text-gray-500 dark:text-gray-400" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center
            text-white text-xs font-bold shrink-0
            ${isTeacher ? "bg-indigo-600" : "bg-red-600"}`}>
            {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-none">
              {user?.name ?? "User"}
            </p>
            <p className={`text-xs font-medium mt-0.5 capitalize
              ${isTeacher ? "text-indigo-600" : "text-red-600"}`}>
              {user?.role ?? "teacher"}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}