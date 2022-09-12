import { toBS, type ADDate, type BSDate } from "@sbspk/bs";
import formatDate from "./format-date.js";

export function formatDateInBS(date: Date): ReturnType<typeof formatDate> {
  const ad: ADDate = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };

  const bs: BSDate = toBS(ad);

  // prettier-ignore
  const months = [
    "Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
    "Kartik","Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
  ];

  return {
    weekday: formatDate(date).weekday,
    monthName: months[bs.month - 1],
    day: String(bs.day).padStart(2, "0"),
    month: String(bs.month).padStart(2, "0"),
    year: String(bs.year)
  };
}
