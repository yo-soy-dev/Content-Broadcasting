<div className="p-6 space-y-4">
  <div className="h-6 w-40 bg-gray-300 animate-pulse" />
  <div className="h-64 bg-gray-300 animate-pulse" />
</div>
export default function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
}