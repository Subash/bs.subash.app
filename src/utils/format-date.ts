export default function format(
  date: Date,
  options: Record<string, string> = {}
) {
  return date.toLocaleString("en-CA", {
    timeZone: "Asia/Kathmandu",
    ...options
  });
}
