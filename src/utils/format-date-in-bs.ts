import { toBikramSambat } from "@sbspk/bs";
import formatDate from "./format-date.js";

export function formatDateInBS(date: Date): ReturnType<typeof formatDate> {
  const { year, month, day } = formatDate(date);

  const ce = {
    year: parseInt(year, 10),
    month: parseInt(month, 10),
    day: parseInt(day, 10)
  };

  const bs = toBikramSambat(ce);

  // prettier-ignore
  const months = [
    "Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
    "Kartik","Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
  ];

  return {
    monthName: months[bs.month - 1],
    day: String(bs.day),
    month: String(bs.month),
    year: String(bs.year)
  };
}
