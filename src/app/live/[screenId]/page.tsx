"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLiveContent } from "@/hooks/useContent";
import { isContentActive } from "@/utils/statusHelpers";
import { Content } from "@/types/content.types";

function LoadingScreen() {
  return (
    <div className="h-screen w-full bg-gray-950 flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-teal-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent
          border-t-teal-400 animate-spin" />
      </div>
      <p className="text-teal-400/70 text-sm font-medium tracking-widest uppercase">
        Loading Broadcast
      </p>
    </div>
  );
}

function ErrorScreen() {
  return (
    <div className="h-screen w-full bg-gray-950 flex flex-col items-center
      justify-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20
        flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" className="text-red-400/50">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white/80 font-semibold text-lg">Broadcast Unavailable</p>
        <p className="text-white/30 text-sm mt-1">Could not load content. Try refreshing.</p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 text-xs font-semibold rounded-xl
          bg-white/5 border border-white/10 text-white/50
          hover:bg-white/10 hover:text-white/70 transition"
      >
        Refresh
      </button>
    </div>
  );
}

function EmptyScreen() {
  return (
    <div className="h-screen w-full bg-gray-950 flex flex-col items-center
      justify-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/20
        flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" className="text-teal-400/50">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white/80 font-semibold text-lg">No Live Content</p>
        <p className="text-white/30 text-sm mt-1">No active broadcast at this time</p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-teal-500/40 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

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

  // Auto rotate
  useEffect(() => {
    if (activeContent.length === 0) return;
    setProgress(0);
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % activeContent.length);
      setProgress(0);
    }, duration);
    return () => clearInterval(interval);
  }, [activeContent.length, index, duration]);

  // Progress bar
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
    <div className="h-screen w-full bg-gray-950 flex flex-col overflow-hidden relative">

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5 z-50">
        <div
          className="h-full bg-teal-400 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">
            Live Broadcast
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10
          rounded-full px-3 py-1.5">
          <span className="text-white/40 text-xs">{index + 1}</span>
          <span className="text-white/20 text-xs">/</span>
          <span className="text-white/40 text-xs">{activeContent.length}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-8 pb-8">
        <div className="w-full max-w-5xl">

          <div className="relative rounded-2xl overflow-hidden border border-white/10
            bg-white/5 shadow-2xl mb-8" style={{ minHeight: 380 }}>
            <img
              key={current._id}
              src={current.fileUrl}
              alt={current.title}
              className="w-full max-h-[55vh] object-contain animate-fade"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-teal-500/10
              rounded-2xl pointer-events-none" />
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-teal-400 text-xs font-semibold tracking-widest
                uppercase mb-2">
                {current.subject}
              </p>
              <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                {current.title}
              </h1>
              {current.description && (
                <p className="text-white/40 text-sm mt-2 max-w-xl">
                  {current.description}
                </p>
              )}
            </div>

            <div className="shrink-0 ml-6 bg-white/5 border border-white/10
              rounded-xl px-4 py-2 text-right">
              <p className="text-white/30 text-[10px] uppercase tracking-widest">
                Screen
              </p>
              <p className="text-white/70 text-sm font-semibold mt-0.5">
                {current.screen ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      {activeContent.length > 1 && (
        <div className="flex justify-center gap-2 pb-6">
          {activeContent.map((item, i) => (
            <button
              key={item._id}
              onClick={() => { setIndex(i); setProgress(0); }}
              className={`rounded-full transition-all duration-300
                ${i === index
                  ? "w-6 h-2 bg-teal-400"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}      <div className="text-center">
        <p className="text-white/80 font-semibold text-lg">Broadcast Unavailable</p>
        <p className="text-white/30 text-sm mt-1">
          Could not load content. Try refreshing.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 text-xs font-semibold rounded-xl
          bg-white/5 border border-white/10 text-white/50
          hover:bg-white/10 hover:text-white/70 transition"
      >
        Refresh
      </button>
    </div>
  );
}

function EmptyScreen() {
  return (
    <div className="h-screen w-full bg-gray-950 flex flex-col items-center
      justify-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/20
        flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" className="text-teal-400/50">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white/80 font-semibold text-lg">No Live Content</p>
        <p className="text-white/30 text-sm mt-1">No active broadcast at this time</p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-teal-500/40 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

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

  // Auto rotate
  useEffect(() => {
    if (activeContent.length === 0) return;
    setProgress(0);
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % activeContent.length);
      setProgress(0);
    }, duration);
    return () => clearInterval(interval);
  }, [activeContent.length, index, duration]);

  // Progress bar
  useEffect(() => {
    if (activeContent.length === 0) return;
    const step = 100 / (duration / 100);
    const timer = setInterval(() => {
      setProgress(p => Math.min(p + step, 100));
    }, 100);
    return () => clearInterval(timer);
  }, [index, duration, activeContent.length]);

  // ✅ Alag alag screens
  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;
  if (activeContent.length === 0) return <EmptyScreen />;

  const current = activeContent[index];

  return (
    <div className="h-screen w-full bg-gray-950 flex flex-col overflow-hidden relative">

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5 z-50">
        <div
          className="h-full bg-teal-400 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">
            Live Broadcast
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10
          rounded-full px-3 py-1.5">
          <span className="text-white/40 text-xs">{index + 1}</span>
          <span className="text-white/20 text-xs">/</span>
          <span className="text-white/40 text-xs">{activeContent.length}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-8 pb-8">
        <div className="w-full max-w-5xl">

          <div className="relative rounded-2xl overflow-hidden border border-white/10
            bg-white/5 shadow-2xl mb-8" style={{ minHeight: 380 }}>
            <img
              key={current._id}
              src={current.fileUrl}
              alt={current.title}
              className="w-full max-h-[55vh] object-contain animate-fade"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-teal-500/10
              rounded-2xl pointer-events-none" />
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-teal-400 text-xs font-semibold tracking-widest
                uppercase mb-2">
                {current.subject}
              </p>
              <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                {current.title}
              </h1>
              {current.description && (
                <p className="text-white/40 text-sm mt-2 max-w-xl">
                  {current.description}
                </p>
              )}
            </div>

            <div className="shrink-0 ml-6 bg-white/5 border border-white/10
              rounded-xl px-4 py-2 text-right">
              <p className="text-white/30 text-[10px] uppercase tracking-widest">
                Screen
              </p>
              <p className="text-white/70 text-sm font-semibold mt-0.5">
                {current.screen ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      {activeContent.length > 1 && (
        <div className="flex justify-center gap-2 pb-6">
          {activeContent.map((item, i) => (
            <button
              key={item._id}
              onClick={() => { setIndex(i); setProgress(0); }}
              className={`rounded-full transition-all duration-300
                ${i === index
                  ? "w-6 h-2 bg-teal-400"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}      <div className="text-center">
        <p className="text-white/80 font-semibold text-lg">Broadcast Unavailable</p>
        <p className="text-white/30 text-sm mt-1">
          Could not load content. Try refreshing.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 text-xs font-semibold rounded-xl
          bg-white/5 border border-white/10 text-white/50
          hover:bg-white/10 hover:text-white/70 transition"
      >
        Refresh
      </button>
    </div>
  );
}

function EmptyScreen() {
  return (
    <div className="h-screen w-full bg-gray-950 flex flex-col items-center
      justify-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/20
        flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" className="text-teal-400/50">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white/80 font-semibold text-lg">No Live Content</p>
        <p className="text-white/30 text-sm mt-1">No active broadcast at this time</p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-teal-500/40 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

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

  // Auto rotate
  useEffect(() => {
    if (activeContent.length === 0) return;
    setProgress(0);
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % activeContent.length);
      setProgress(0);
    }, duration);
    return () => clearInterval(interval);
  }, [activeContent.length, index, duration]);

  // Progress bar
  useEffect(() => {
    if (activeContent.length === 0) return;
    const step = 100 / (duration / 100);
    const timer = setInterval(() => {
      setProgress(p => Math.min(p + step, 100));
    }, 100);
    return () => clearInterval(timer);
  }, [index, duration, activeContent.length]);

  // ✅ Alag alag screens
  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;
  if (activeContent.length === 0) return <EmptyScreen />;

  const current = activeContent[index];

  return (
    <div className="h-screen w-full bg-gray-950 flex flex-col overflow-hidden relative">

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5 z-50">
        <div
          className="h-full bg-teal-400 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">
            Live Broadcast
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10
          rounded-full px-3 py-1.5">
          <span className="text-white/40 text-xs">{index + 1}</span>
          <span className="text-white/20 text-xs">/</span>
          <span className="text-white/40 text-xs">{activeContent.length}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-8 pb-8">
        <div className="w-full max-w-5xl">

          <div className="relative rounded-2xl overflow-hidden border border-white/10
            bg-white/5 shadow-2xl mb-8" style={{ minHeight: 380 }}>
            <img
              key={current._id}
              src={current.fileUrl}
              alt={current.title}
              className="w-full max-h-[55vh] object-contain animate-fade"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-teal-500/10
              rounded-2xl pointer-events-none" />
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-teal-400 text-xs font-semibold tracking-widest
                uppercase mb-2">
                {current.subject}
              </p>
              <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                {current.title}
              </h1>
              {current.description && (
                <p className="text-white/40 text-sm mt-2 max-w-xl">
                  {current.description}
                </p>
              )}
            </div>

            <div className="shrink-0 ml-6 bg-white/5 border border-white/10
              rounded-xl px-4 py-2 text-right">
              <p className="text-white/30 text-[10px] uppercase tracking-widest">
                Screen
              </p>
              <p className="text-white/70 text-sm font-semibold mt-0.5">
                {current.screen ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      {activeContent.length > 1 && (
        <div className="flex justify-center gap-2 pb-6">
          {activeContent.map((item, i) => (
            <button
              key={item._id}
              onClick={() => { setIndex(i); setProgress(0); }}
              className={`rounded-full transition-all duration-300
                ${i === index
                  ? "w-6 h-2 bg-teal-400"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}        {[0,1,2].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-500/40 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

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

  useEffect(() => {
    if (activeContent.length === 0) return;
    setProgress(0);

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % activeContent.length);
      setProgress(0);
    }, duration);

    return () => clearInterval(interval);
  }, [activeContent.length, index, duration]);

  // Progress bar
  useEffect(() => {
    if (activeContent.length === 0) return;
    const step = 100 / (duration / 100);
    const timer = setInterval(() => {
      setProgress(p => Math.min(p + step, 100));
    }, 100);
    return () => clearInterval(timer);
  }, [index, duration, activeContent.length]);

  if (isLoading) return <LoadingScreen />;
  if (isError || activeContent.length === 0) return <EmptyScreen />;

  const current = activeContent[index];

  return (
    <div className="h-screen w-full bg-gray-950 flex flex-col overflow-hidden relative">

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5 z-50">
        <div
          className="h-full bg-teal-400 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between px-8 py-5 z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">
            Live Broadcast
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          <span className="text-white/40 text-xs">{index + 1}</span>
          <span className="text-white/20 text-xs">/</span>
          <span className="text-white/40 text-xs">{activeContent.length}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 pb-8">
        <div className="w-full max-w-5xl">

          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl mb-8"
            style={{ minHeight: 380 }}>
            <img
              key={current._id}
              src={current.fileUrl}
              alt={current.title}
              className="w-full max-h-[55vh] object-contain animate-fade"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-teal-500/10 rounded-2xl pointer-events-none" />
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase mb-2">
                {current.subject}
              </p>
              <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                {current.title}
              </h1>
              {current.description && (
                <p className="text-white/40 text-sm mt-2 max-w-xl">
                  {current.description}
                </p>
              )}
            </div>

            <div className="shrink-0 ml-6 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-right">
              <p className="text-white/30 text-[10px] uppercase tracking-widest">Screen</p>
              <p className="text-white/70 text-sm font-semibold mt-0.5">
                {current.screen ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {activeContent.length > 1 && (
        <div className="flex justify-center gap-2 pb-6">
          {activeContent.map((item, i) => (
            <button
              key={item._id}
              onClick={() => { setIndex(i); setProgress(0); }}
              className={`rounded-full transition-all duration-300
                ${i === index
                  ? "w-6 h-2 bg-teal-400"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}
