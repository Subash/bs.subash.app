<script lang="ts">
  import { formatDateInBS } from "../utils/format-date-in-bs.js";
  import formatDate from "../utils/format-date.js";

  const date = new Date();
  const ad = formatDate(date);
  const bs = formatDateInBS(date);
</script>

<div class="wrapper">
  <div class="calendar">
    <div class="secondary-date">
      {ad.monthName}
      {ad.day},
      {ad.year}
    </div>
    <div>
      <div class="primary-day">{bs.day}</div>
      <div class="primary-date">{bs.monthName} {bs.year}</div>
    </div>
  </div>
</div>

<style>
  .wrapper {
    height: 100vh;
    height: 100dvh;
    display: grid;
    place-items: center;
  }

  .calendar {
    text-align: center;
  }

  .secondary-date {
    font-size: 4vmin;
    font-weight: 600;
  }

  .primary-day {
    font-size: 40vmin;
    font-weight: 600;
  }

  .primary-date {
    font-size: 8vmin;
    font-weight: 600;
  }
</style>
