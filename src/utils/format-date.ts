function format(date: Date, options: Record<string, string> = {}) {
  return date.toLocaleString("en-CA", {
    timeZone: "Asia/Kathmandu",
    ...options
  });
}

export default function formatDate(date: Date) {
  return {
    weekday: format(date, { weekday: "long" }),
    monthName: format(date, { month: "long" }),
    day: format(date, { day: "2-digit" }),
    month: format(date, { month: "2-digit" }),
    year: format(date, { year: "numeric" })
  };
}
