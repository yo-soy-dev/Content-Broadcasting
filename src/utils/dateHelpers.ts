export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

export function getScheduleStatus(start: string, end: string): "scheduled" | "active" | "expired" {
  const now = Date.now();
  if (now < new Date(start).getTime()) return "scheduled";
  if (now > new Date(end).getTime()) return "expired";
  return "active";
}