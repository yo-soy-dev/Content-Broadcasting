export const isContentActive = (start: string, end: string) => {
  const now = new Date().getTime();
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  return now >= startTime && now <= endTime;
};