<script lang="ts">
  import { toBS } from "@sbspk/bs";
  import format from "../utils/format-date";
  export let date: Date;

  const monthNames = [
    "Baishakh",
    "Jestha",
    "Ashadh",
    "Shrawan",
    "Bhadra",
    "Ashwin",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra"
  ];

  const [year, month, day] = format(date)
    .slice(0, 10)
    .split("-")
    .map((n) => Number.parseInt(n, 10));

  const ad = { year, month, day };
  const bs = toBS(ad);
</script>

<div class="calendar">
  <div class="secondary-date">
    {format(date, { weekday: "long" })},
    {format(date, { day: "2-digit" })}
    {format(date, { month: "long" })}
    {format(date, { year: "numeric" })}
  </div>
  <div>
    <div class="primary-day">{bs.day}</div>
    <div class="primary-date">{monthNames[bs.month - 1]} {bs.year}</div>
  </div>
</div>

<style>
  .calendar {
    height: 85vh;
    display: grid;
    align-content: center;
    text-align: center;
  }

  .secondary-date {
    font-size: 4vmin;
  }

  .primary-day {
    font-size: 40vmin;
    font-weight: 100;
  }

  .primary-date {
    font-size: 8vmin;
  }
</style>
