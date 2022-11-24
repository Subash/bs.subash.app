function format(date: Date, options: Record<string, string> = {}) {
  return date.toLocaleString("en", {
    timeZone: "Asia/Kathmandu",
    ...options
  });
}

export default function formatDate(date: Date) {
  return {
    monthName: format(date, { month: "long" }),
    day: format(date, { day: "numeric" }),
    month: format(date, { month: "numeric" }),
    year: format(date, { year: "numeric" })
  };
}
