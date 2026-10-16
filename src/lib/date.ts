export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isToday(dateISO: string): boolean {
  return dateISO === todayISO();
}