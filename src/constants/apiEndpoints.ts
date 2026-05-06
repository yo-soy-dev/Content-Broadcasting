export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',

  CONTENT: {
    UPLOAD: '/content/upload',
    MY_CONTENT: '/content/my',
    MY_STATS: '/content/my/stats',
    DELETE: (id: string) => `/content/${id}`,
  },

    LIVE: (screenId: string) => `/live/${encodeURIComponent(screenId)}`,

  APPROVAL: {
    ALL: '/approval/all',
    PENDING: '/approval/pending',
    STATS: '/approval/stats',
    APPROVE: (id: string) => `/approval/${id}/approve`,
    REJECT: (id: string) => `/approval/${id}/reject`,
  },
} as const;