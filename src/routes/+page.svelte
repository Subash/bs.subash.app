<script lang="ts">
  import Calendar from "../components/calendar.svelte";
  const date = new Date();
</script>

<div class="wrapper">
  <Calendar {date} />
</div>

<style>
  .wrapper {
    height: 100vh;
    height: 100dvh;
    display: grid;
    place-items: center;
  }
</style>
