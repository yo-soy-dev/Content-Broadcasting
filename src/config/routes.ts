export const ROUTES = {

  // AUTH: {
  //   ROOT: "/auth", // optional
  //   LOGIN: "/auth/login",
  //   REGISTER: "/auth/register",
  // },
  AUTH: '/auth/login',
  REGISTER: "/auth/register",


  TEACHER: {
    DASHBOARD: "/teacher/dashboard",
    UPLOAD: "/teacher/upload",
    MY_CONTENT: "/teacher/my-content",
  },

  PRINCIPAL: {
    DASHBOARD: "/principal/dashboard",
    APPROVALS: "/principal/approvals",
    ALL_CONTENT: "/principal/all-content",
  },

  LIVE: (teacherId: string) => `/live/${teacherId}`,

  UNAUTHORIZED: "/unauthorized",
};