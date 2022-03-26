/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

declare module "@sbspk/bs" {
  interface SimpleDate {
    year: number;
    month: number;
    day: number;
  }

  let toBS: (ad: SimpleDate) => SimpleDate;
}
