import { ROUTES } from "@/config/routes";

export function getDashboardRoute(role: string): string {
  if (role === "principal") return ROUTES.PRINCIPAL.DASHBOARD;
  return ROUTES.TEACHER.DASHBOARD;
}

export function isTeacher(role: string): boolean {
  return role === "teacher";
}

export function isPrincipal(role: string): boolean {
  return role === "principal";
}