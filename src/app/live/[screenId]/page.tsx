"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLiveContent } from "@/hooks/useContent";
import { isContentActive } from "@/utils/statusHelpers";
import { Content } from "@/types/content.types";

/* ───────── Loading ───────── */
function LoadingScreen() {
  return (
    <div className="h-screen w-full bg-[#071a12] flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-green-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-green-400 animate-spin" />
      </div>
      <p className="text-green-300/70 text-sm font-medium tracking-widest uppercase">
        Loading Broadcast
      </p>
    </div>
  );
}

/* ───────── Error ───────── */
function ErrorScreen() {
  return (
    <div className="h-screen w-full bg-[#071a12] flex flex-col items-center justify-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" className="text-red-400/60">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>

      <div className="text-center">
        <p className="text-white/80 font-semibold text-lg">Broadcast Unavailable</p>
        <p className="text-white/30 text-sm mt-1">
          Could not load content. Try again.
        </p>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 text-xs font-semibold rounded-xl
        bg-green-500/10 border border-green-500/20 text-green-300
        hover:bg-green-500/20 transition"
      >
        Refresh
      </button>
    </div>
  );
}

/* ───────── Empty ───────── */
function EmptyScreen() {
  return (
    <div className="h-screen w-full bg-[#071a12] flex flex-col items-center justify-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" className="text-green-400/60">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>

      <div className="text-center">
        <p className="text-white/80 font-semibold text-lg">No Live Content</p>
        <p className="text-white/30 text-sm mt-1">No active broadcast now</p>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-green-400/40 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ───────── Main ───────── */
export default function LivePage() {
  const params = useParams();
  const screenName = decodeURIComponent(params.screenId as string);

  const { data, isLoading, isError } = useLiveContent(screenName);

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const activeContent: Content[] =
    (Array.isArray(data) ? data : []).filter((item: Content) =>
      isContentActive(item.startTime, item.endTime)
    );

  const duration = (activeContent[index]?.rotationDuration ?? 10) * 1000;

  /* auto rotate */
  useEffect(() => {
    if (activeContent.length === 0) return;
    setProgress(0);

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % activeContent.length);
      setProgress(0);
    }, duration);

    return () => clearInterval(interval);
  }, [activeContent.length, index, duration]);

  /* progress */
  useEffect(() => {
    if (activeContent.length === 0) return;

    const step = 100 / (duration / 100);

    const timer = setInterval(() => {
      setProgress(p => Math.min(p + step, 100));
    }, 100);

    return () => clearInterval(timer);
  }, [index, duration, activeContent.length]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;
  if (activeContent.length === 0) return <EmptyScreen />;

  const current = activeContent[index];

  return (
    <div className="h-screen w-full bg-[#071a12] flex flex-col overflow-hidden relative">

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500/10">
        <div
          className="h-full bg-green-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-300/60 text-xs uppercase tracking-widest">
            Live Broadcast
          </span>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5">
          <span className="text-green-300 text-xs">
            {index + 1} / {activeContent.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-8 pb-8">
        <div className="w-full max-w-5xl">

          <div className="rounded-2xl overflow-hidden border border-green-500/20 bg-green-950/30 mb-8">
            <img
              key={current._id}
              src={current.fileUrl}
              alt={current.title}
              className="w-full max-h-[55vh] object-contain animate-fade"
            />
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-green-400 text-xs uppercase tracking-widest mb-2">
                {current.subject}
              </p>

              <h1 className="text-white text-2xl md:text-4xl font-bold">
                {current.title}
              </h1>

              {current.description && (
                <p className="text-white/40 text-sm mt-2">
                  {current.description}
                </p>
              )}
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2">
              <p className="text-green-300 text-xs uppercase">Screen</p>
              <p className="text-white text-sm font-semibold">
                {current.screen ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* dots */}
      {activeContent.length > 1 && (
        <div className="flex justify-center gap-2 pb-6">
          {activeContent.map((item, i) => (
            <button
              key={item._id}
              onClick={() => { setIndex(i); setProgress(0); }}
              className={`rounded-full transition-all duration-300
                ${i === index
                  ? "w-6 h-2 bg-green-400"
                  : "w-2 h-2 bg-green-500/20"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
