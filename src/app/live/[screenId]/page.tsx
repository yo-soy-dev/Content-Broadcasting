"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLiveContent } from "@/hooks/useContent";
import { isContentActive } from "@/utils/statusHelpers";
import { Content } from "@/types/content.types";
import { Radio } from "lucide-react";

/* ───────────────────────────────────────────────────────────── */
/* Shared Background */
/* ───────────────────────────────────────────────────────────── */

function BackgroundEffects() {
  return (
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
  );
}

/* ───────────────────────────────────────────────────────────── */
/* Loading */
/* ───────────────────────────────────────────────────────────── */

function LoadingScreen() {
  return (
    <div className="h-screen w-full bg-[#071a12] relative flex flex-col items-center justify-center gap-5 overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border border-green-500/20" />

          <div
            className="absolute inset-0 rounded-full border-2
            border-transparent border-t-green-400 animate-spin"
          />

          <div
            className="absolute inset-3 rounded-full bg-green-500/10
            backdrop-blur-xl border border-green-500/20"
          />
        </div>

        <div className="text-center">
          <p className="text-green-300/80 text-sm tracking-[0.25em] uppercase font-medium">
            Loading Broadcast
          </p>

          <p className="text-white/30 text-xs mt-2">
            Preparing live content...
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────── */
/* Error */
/* ───────────────────────────────────────────────────────────── */

function ErrorScreen() {
  return (
    <div className="h-screen w-full bg-[#071a12] relative flex items-center justify-center overflow-hidden">
      <BackgroundEffects />

      <div
        className="relative z-10 w-full max-w-md rounded-3xl
        bg-green-900/20 backdrop-blur-xl border border-red-500/20
        shadow-2xl shadow-black/50 p-8 text-center"
      >
        <div
          className="mx-auto w-20 h-20 rounded-2xl
          bg-red-500/10 border border-red-500/20
          flex items-center justify-center mb-6"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-red-400/70"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-white">
          Broadcast Unavailable
        </h2>

        <p className="text-green-300/50 text-sm mt-2">
          Could not load content. Please try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-7 px-5 py-3 rounded-2xl
          bg-green-500 hover:bg-green-400
          text-white text-sm font-semibold
          shadow-lg shadow-green-500/20
          transition-all duration-200"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────── */
/* Empty */
/* ───────────────────────────────────────────────────────────── */

function EmptyScreen() {
  return (
    <div className="h-screen w-full bg-[#071a12] relative flex items-center justify-center overflow-hidden">
      <BackgroundEffects />

      <div
        className="relative z-10 w-full max-w-md rounded-3xl
        bg-green-900/20 backdrop-blur-xl border border-green-500/20
        shadow-2xl shadow-black/50 p-8 text-center"
      >
        <div
          className="mx-auto w-20 h-20 rounded-2xl
          bg-green-500/10 border border-green-500/20
          flex items-center justify-center mb-6"
        >
          <Radio className="w-9 h-9 text-green-400/70" />
        </div>

        <h2 className="text-2xl font-bold text-white">
          No Live Content
        </h2>

        <p className="text-green-300/50 text-sm mt-2">
          There is no active broadcast right now.
        </p>

        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-green-400/50 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────── */
/* Main */
/* ───────────────────────────────────────────────────────────── */

export default function LivePage() {
  const params = useParams();
  const screenName = decodeURIComponent(params.screenId as string);

  const { data, isLoading, isError } = useLiveContent(screenName);

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  //const activeContent: Content[] =
   //(Array.isArray(data) ? data : []).filter((item: Content) =>
      //isContentActive(item.startTime, item.endTime)
    //);
  const contentList = Array.isArray(data?.data) ? data.data : [];

  const activeContent: Content[] = contentList.filter(
    (item: Content) =>
      isContentActive(item.startTime, item.endTime)
  );

  const duration = (activeContent[index]?.rotationDuration ?? 10) * 1000;

  /* Auto rotate */
  useEffect(() => {
    if (activeContent.length === 0) return;

    setProgress(0);

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeContent.length);
      setProgress(0);
    }, duration);

    return () => clearInterval(interval);
  }, [activeContent.length, index, duration]);

  /* Progress */
  useEffect(() => {
    if (activeContent.length === 0) return;

    const step = 100 / (duration / 100);

    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 100);

    return () => clearInterval(timer);
  }, [index, duration, activeContent.length]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;
  if (activeContent.length === 0) return <EmptyScreen />;

  const current = activeContent[index];

  return (
    <div className="h-screen w-full bg-[#071a12] relative overflow-hidden flex flex-col">
      <BackgroundEffects />

      {/* Progress */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-green-500/10 z-20">
        <div
          className="h-full bg-green-400 transition-all duration-100 shadow-[0_0_12px_rgba(74,222,128,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between
        px-6 md:px-10 py-5"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <div
              className="absolute w-3 h-3 rounded-full bg-green-400/40
              animate-ping"
            />
          </div>

          <div>
            <p className="text-green-300/70 text-xs uppercase tracking-[0.3em]">
              Live Broadcast
            </p>

            <p className="text-white/30 text-[11px] mt-1">
              PulseBoard System
            </p>
          </div>
        </div>

        <div
          className="px-4 py-2 rounded-full
          bg-green-500/10 border border-green-500/20
          backdrop-blur-md"
        >
          <span className="text-green-300 text-sm font-medium">
            {index + 1} / {activeContent.length}
          </span>
        </div>
      </header>

      {/* Content */}
      <main
        className="relative z-10 flex-1 flex items-center
        justify-center px-5 md:px-10 pb-8"
      >
        <div className="w-full max-w-6xl">

          {/* Image card */}
          <div
            className="rounded-3xl overflow-hidden
            bg-green-900/20 backdrop-blur-xl
            border border-green-500/20
            shadow-2xl shadow-black/50 mb-8"
          >
            <img
              key={current._id}
              src={current.fileUrl}
              alt={current.title}
              className="w-full max-h-[62vh] object-contain animate-fade"
            />
          </div>

          {/* Bottom content */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            {/* Left */}
            <div className="max-w-3xl">
              <p
                className="text-green-400 text-xs uppercase
                tracking-[0.25em] mb-3"
              >
                {current.subject}
              </p>

              <h1
                className="text-white text-3xl md:text-5xl
                font-bold tracking-tight leading-tight"
              >
                {current.title}
              </h1>

              {current.description && (
                <p className="text-white/45 text-sm md:text-base mt-4 leading-relaxed">
                  {current.description}
                </p>
              )}
            </div>

            {/* Right */}
            <div
              className="min-w-[160px] rounded-2xl
              bg-green-500/10 border border-green-500/20
              backdrop-blur-md px-5 py-4"
            >
              <p className="text-green-300/70 text-xs uppercase tracking-widest">
                Screen
              </p>

              <p className="text-white text-lg font-semibold mt-1">
                {current.screen ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Dots */}
      {activeContent.length > 1 && (
        <div className="relative z-10 flex justify-center gap-2 pb-6">
          {activeContent.map((item, i) => (
            <button
              key={item._id}
              onClick={() => {
                setIndex(i);
                setProgress(0);
              }}
              className={`rounded-full transition-all duration-300
                ${
                  i === index
                    ? "w-8 h-2 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]"
                    : "w-2 h-2 bg-green-500/30 hover:bg-green-400/50"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
