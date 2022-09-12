<script lang="ts">
  import formatDate from "../utils/format-date";
  import { formatDateInBS } from "../utils/format-date-in-bs.js";

  export let date: Date;
  const ad = formatDate(date);
  const bs = formatDateInBS(date);
</script>

<div class="calendar">
  <div class="secondary-date">
    {ad.weekday},
    {ad.day}
    {ad.monthName}
    {ad.year}
  </div>
  <div>
    <div class="primary-day">{bs.day}</div>
    <div class="primary-date">{bs.monthName} {bs.year}</div>
  </div>
</div>

<style>
  .secondary-date {
    font-size: 4vmin;
  }

  .primary-day {
    font-size: 40vmin;
  }

  .primary-date {
    font-size: 8vmin;
  }
</style>
