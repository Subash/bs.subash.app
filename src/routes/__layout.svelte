<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<slot />

<style global>
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  body {
    background: #0f0f1e;
    color: #fff;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
  }
</style>
