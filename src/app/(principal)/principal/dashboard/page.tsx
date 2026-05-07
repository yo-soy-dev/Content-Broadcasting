'use client';

import PrincipalStats from '@/components/principal/PrincipalStats';

export default function PrincipalDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Overview of all content activity
        </p>
      </div>
      <PrincipalStats />
    </div>
  );
}
