import { toBS } from '@sbspk/bs';

// get formatted date in NPT
function getFormattedDate(options = {}) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu',
    ...options
  }).format(new Date());
}

function renderAD() {
  const node = document.querySelector('.Calendar__ad');

  const day = getFormattedDate({ day: 'numeric' });
  const dayName = getFormattedDate({ weekday: 'short' });
  const monthName = getFormattedDate({ month: 'long' });
  const year = getFormattedDate({ year: 'numeric' });

  node.innerText = `${dayName}, ${day} ${monthName} ${year}`;
}

function renderBS() {
  const dayNode = document.querySelector('.Calendar__bs-day');
  const dateNode = document.querySelector('.Calendar__bs-date');

  const adDate = {
    day: Number.parseInt(getFormattedDate({ day: 'numeric' }), 10),
    month: Number.parseInt(getFormattedDate({ month: 'numeric' }), 10),
    year: Number.parseInt(getFormattedDate({ year: 'numeric' }), 10)
  };

  const bsDate = toBS(adDate);

  const monthName = [
    "Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
    "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
  ][bsDate.month - 1];

  dayNode.innerText = bsDate.day;
  dateNode.innerText = `${monthName} ${bsDate.year}`;
}

function render() {
  renderAD();
  renderBS();
}

window.addEventListener('DOMContentLoaded', render);
window.addEventListener('focus', render);
