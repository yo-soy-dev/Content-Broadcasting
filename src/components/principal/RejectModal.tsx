'use client';

import { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';

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

  // Escape key se band
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

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

  const remaining = 300 - reason.length;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-xl
          border border-gray-100 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4
          border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-900/30
              flex items-center justify-center">
              <XCircle size={16} className="text-red-500" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Reject Content
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-700
              hover:bg-gray-200 dark:hover:bg-gray-600
              flex items-center justify-center
              text-gray-500 dark:text-gray-400 transition text-sm"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please provide a reason so the teacher can make improvements.
          </p>

          <div className="space-y-1">
            <textarea
              maxLength={300}
              className={`w-full border rounded-xl p-3 text-sm outline-none resize-none
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
            <div className="flex items-center justify-between">
              {error
                ? <p className="text-xs text-red-500">{error}</p>
                : <span />
              }
              <p className={`text-xs ml-auto ${remaining < 30 ? 'text-red-400' : 'text-gray-400'}`}>
                {remaining} left
              </p>
            </div>
          </div>

          {/* Quick reason chips */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Quick reasons
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Image quality too low',
                'Wrong subject',
                'Inappropriate content',
                'Incomplete information',
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => { setReason(chip); setError(''); }}
                  className="px-2.5 py-1 text-xs rounded-full border
                    border-gray-200 dark:border-gray-600
                    bg-gray-50 dark:bg-gray-700
                    text-gray-600 dark:text-gray-300
                    hover:border-red-300 hover:text-red-600 hover:bg-red-50
                    dark:hover:border-red-500 dark:hover:text-red-400
                    transition"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
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
            disabled={isLoading || !reason.trim()}
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
