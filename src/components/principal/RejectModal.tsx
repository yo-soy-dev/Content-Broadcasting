'use client';

import { useState } from 'react';

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  isLoading?: boolean;
}

export default function RejectModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: RejectModalProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError('Rejection reason is required');
      return;
    }
    onSubmit(reason.trim());
    setReason('');
    setError('');
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-xl
        border border-gray-100 dark:border-gray-700">

        {/* Header */}
        <div className="flex items-center justify-between p-6
          border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Reject Content
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
              transition text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please provide a reason so the teacher can make improvements.
          </p>
          <textarea
            className={`w-full border rounded-lg p-3 text-sm outline-none resize-none
              focus:ring-2 focus:ring-red-400 focus:border-transparent transition
              bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              ${error
                ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-200 dark:border-gray-600'
              }`}
            placeholder="e.g. Image quality is too low, please re-upload..."
            rows={4}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (error) setError('');
            }}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 pb-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-lg border
              border-gray-200 dark:border-gray-600
              hover:bg-gray-50 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white
              hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white
                  border-t-transparent rounded-full animate-spin" />
                Rejecting...
              </span>
            ) : 'Reject Content'}
          </button>
        </div>
      </div>
    </div>
  );
}