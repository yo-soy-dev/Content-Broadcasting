"use client";

import Link from "next/link";

const screens = [
  {
    name: "Screen 1",
    title: "Screen 1",
    description: "Main display screen",
  },
  {
    name: "Screen 2",
    title: "Screen 2",
    description: "Secondary display screen",
  },
  {
    name: "Screen 3",
    title: "Screen 3",
    description: "Third display screen",
  },
  {
    name: "Main Hall",
    title: "Main Hall",
    description: "Announcements & general broadcasts",
  },
  {
    name: "Classroom A",
    title: "Classroom A",
    description: "Live content for Classroom A display",
  },
  {
    name: "Classroom B",
    title: "Classroom B",
    description: "Live content for Classroom B display",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 backdrop-blur-md bg-white/70 border-b border-green-100">
        <h1 className="text-lg font-semibold text-green-700 flex items-center gap-2">
          📡 Content Broadcasting
        </h1>
        <Link
          href="/auth/login"
          className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
        >
          Staff Login
        </Link>
      </div>

      <div className="text-center mt-12 px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Live Content Screens
        </h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          View real-time classroom and campus content displays. No login required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto w-full mt-10">
        {screens.map((screen) => (
          <Link
            key={screen.name}
            href={`/live/${encodeURIComponent(screen.name)}`}
            className="group relative bg-white rounded-2xl p-6 shadow-sm border border-green-100
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100
              bg-gradient-to-br from-green-100 to-emerald-200 transition duration-300" />

            <div className="relative flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition">
                  {screen.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{screen.description}</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  /live/{screen.name}
                </span>
                <span className="text-sm font-medium text-green-600 group-hover:underline">
                  View →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto text-center text-xs text-gray-500 py-4">
        Built for smart classroom broadcasting
      </div>
    </div>
  );
}