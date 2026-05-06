"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Upload, FileText,
  CheckCircle, BookOpen, LogOut, Menu, X,
} from "lucide-react";

type SidebarProps = {
  role: "teacher" | "principal";
};

const teacherLinks = [
  { href: "/teacher/dashboard",  label: "Dashboard", icon: LayoutDashboard },
  { href: "/teacher/upload",     label: "Upload",     icon: Upload },
  { href: "/teacher/my-content", label: "My Content", icon: FileText },
];

const principalLinks = [
  { href: "/principal/dashboard",   label: "Dashboard",   icon: LayoutDashboard },
  { href: "/principal/approvals",   label: "Approvals",   icon: CheckCircle },
  { href: "/principal/all-content", label: "All Content", icon: FileText },
];

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const links = role === "teacher" ? teacherLinks : principalLinks;
  const isTeacher = role === "teacher";

  // Route change pe mobile sidebar band karo
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <aside className="w-64 h-full bg-white dark:bg-gray-900
      border-r border-gray-100 dark:border-gray-800 flex flex-col">

      {/* Logo */}
      <div className="flex items-center justify-between gap-3 px-5 py-5
        border-b border-gray-50 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md
            ${isTeacher ? "bg-indigo-600 shadow-indigo-200" : "bg-red-600 shadow-red-200"}`}>
            <BookOpen size={18} className="text-white" />
          </div>
          <span className="text-base font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            EduBroadcast
          </span>
        </div>
        {/* Close button — sirf mobile pe */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden w-8 h-8 flex items-center justify-center
            rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-gray-50 dark:border-gray-800">
        <div className="flex items-center gap-3 p-3 rounded-xl
          bg-gray-50 dark:bg-gray-800">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm
            ${isTeacher ? "bg-indigo-600" : "bg-red-600"}`}>
            <span className="text-sm font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
              {user?.name ?? "User"}
            </p>
            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5
              ${isTeacher
                ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
              }`}>
              {isTeacher ? "Teacher" : "Principal"}
            </span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500
          uppercase tracking-widest px-3 mb-2">
          Menu
        </p>
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150
                ${isActive
                  ? isTeacher
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-red-600 text-white shadow-md shadow-red-200"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
            >
              <Icon size={17} className={isActive ? "text-white" : "text-gray-400 dark:text-gray-500"} />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 pt-2 border-t border-gray-50 dark:border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            text-gray-500 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-rose-900/20
            hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-150 group"
        >
          <LogOut size={17} className="text-gray-400 group-hover:text-rose-500 transition-colors" />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar — hamesha visible */}
      <div className="hidden md:flex h-screen shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile hamburger button — Navbar mein nahi, yahan render hoga */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 w-9 h-9 flex items-center justify-center
          bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
          rounded-xl shadow-sm hover:bg-gray-50 transition"
      >
        <Menu size={18} className="text-gray-600 dark:text-gray-300" />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`md:hidden fixed top-0 left-0 h-full z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent />
      </div>
    </>
  );
}