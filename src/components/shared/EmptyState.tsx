interface EmptyStateProps {
  message?: string;
  description?: string;
}

export default function EmptyState({
  message = "No data found",
  description = "Nothing to show here yet",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <span className="text-3xl">📭</span>
      </div>
      <p className="text-base font-semibold text-gray-700">{message}</p>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  );
}