"use client";

import Link from "next/link";
import { ArrowRight, Radio, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen bg-[#071a12] relative overflow-hidden flex flex-col">

      {/* ───────────────── Background Effects ───────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full
          bg-green-600/20 blur-3xl"
        />

        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full
          bg-emerald-600/15 blur-3xl"
        />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #86efac 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ───────────────── Navbar ───────────────── */}
      <header
        className="relative z-10 flex items-center justify-between
        px-5 md:px-8 py-4 border-b border-green-500/10
        backdrop-blur-md bg-black/10"
      >
        <div className="flex items-center gap-3">

          <div
            className="w-11 h-11 rounded-2xl bg-green-500/90
            flex items-center justify-center
            shadow-lg shadow-green-500/30"
          >
            <Radio className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="text-white font-semibold text-lg tracking-tight">
              EduBroadcast
            </h1>

            <p className="text-green-300/60 text-xs">
              Smart Content Broadcasting
            </p>
          </div>
        </div>

        <Link
          href="/auth/login"
          className="px-4 py-2 rounded-xl
          bg-green-500 hover:bg-green-400
          text-white text-sm font-semibold
          shadow-lg shadow-green-500/20
          transition-all duration-200"
        >
          Staff Login
        </Link>
      </header>

      {/* ───────────────── Hero ───────────────── */}
      <section className="relative z-10 text-center px-6 pt-16 md:pt-24">
        <div
          className="inline-flex items-center gap-2
          px-4 py-2 rounded-full
          border border-green-500/20
          bg-green-500/10 backdrop-blur-md
          text-green-300 text-xs uppercase tracking-[0.25em]"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Live Display Network
        </div>

        <h2
          className="mt-7 text-4xl sm:text-5xl md:text-6xl
          font-bold text-white tracking-tight leading-tight"
        >
          Smart Campus
          <span className="block text-green-400">
            Broadcasting System
          </span>
        </h2>

        <p
          className="mt-6 text-green-100/60 text-sm md:text-base
          max-w-2xl mx-auto leading-relaxed"
        >
          Access live classroom displays, announcements, campus broadcasts,
          and real-time educational content across all connected screens.
        </p>

        {/* Stats */}
        <div className="flex justify-center mt-10">
          <div
            className="grid grid-cols-3 gap-4
            bg-green-900/20 border border-green-500/20
            backdrop-blur-xl rounded-3xl p-4 md:p-5"
          >
            {[
              ["6+", "Active Screens"],
              ["24/7", "Broadcasting"],
              ["Live", "Content Feed"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="px-4 md:px-8"
              >
                <h3 className="text-white text-2xl font-bold">
                  {value}
                </h3>

                <p className="text-green-300/50 text-xs mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Screen Grid ───────────────── */}
      <section
        className="relative z-10 grid grid-cols-1
        sm:grid-cols-2 lg:grid-cols-3
        gap-6 px-5 md:px-8 py-14
        max-w-7xl mx-auto w-full"
      >
        {screens.map((screen, index) => (
          <Link
            key={screen.name}
            href={`/live/${encodeURIComponent(screen.name)}`}
            className="group relative overflow-hidden rounded-3xl
            bg-green-900/20 backdrop-blur-xl
            border border-green-500/20
            hover:border-green-400/40
            shadow-2xl shadow-black/30
            hover:-translate-y-1.5
            transition-all duration-300"
          >

            {/* Glow */}
            <div
              className="absolute inset-0 opacity-0
              group-hover:opacity-100 transition duration-500
              bg-gradient-to-br from-green-400/10 via-transparent to-emerald-400/10"
            />

            {/* Top line */}
            <div
              className="absolute top-0 left-0 h-[2px]
              w-0 group-hover:w-full
              bg-green-400 transition-all duration-500"
            />

            <div className="relative p-6 flex flex-col h-full">

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl
                bg-green-500/10 border border-green-500/20
                flex items-center justify-center mb-6"
              >
                <Radio className="w-6 h-6 text-green-400" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="text-2xl font-semibold
                    text-white group-hover:text-green-300
                    transition-colors"
                  >
                    {screen.title}
                  </h3>

                  <span
                    className="text-[10px] uppercase tracking-widest
                    text-green-400/60"
                  >
                    0{index + 1}
                  </span>
                </div>

                <p className="text-green-100/50 text-sm leading-relaxed">
                  {screen.description}
                </p>
              </div>

              {/* Footer */}
              <div
                className="mt-7 pt-5 border-t border-green-500/10
                flex items-center justify-between"
              >
                <span
                  className="text-[11px] font-mono
                  text-green-300/40 truncate"
                >
                  /live/{screen.name}
                </span>

                <div
                  className="flex items-center gap-2
                  text-green-300 text-sm font-medium"
                >
                  Open

                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1
                    transition-transform"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ───────────────── Bottom ───────────────── */}
      <footer
        className="relative z-10 mt-auto
        border-t border-green-500/10
        backdrop-blur-md bg-black/10"
      >
        <div
          className="max-w-7xl mx-auto px-5 md:px-8 py-5
          flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-green-300/50 text-sm">
            <ShieldCheck className="w-4 h-4" />
            Secure campus broadcasting environment
          </div>

          <p className="text-xs text-green-300/40">
            Built for smart classroom & digital signage systems
          </p>
        </div>
      </footer>
    </div>
  );
}
