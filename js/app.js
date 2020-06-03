import { toBS, toAD } from '@sbspk/bs';

// get formatted date in NPT
function format(date, options = {}) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu',
    ...options
  }).format(date);
}

function renderAD(date) {
  const node = document.querySelector('.Calendar__ad');

  const day = format(date, { day: 'numeric' });
  const dayName = format(date, { weekday: 'short' });
  const monthName = format(date, { month: 'long' });
  const year = format(date, { year: 'numeric' });

  node.innerText = `${dayName}, ${day} ${monthName} ${year}`;
}

function renderBS(date) {
  const dayNode = document.querySelector('.Calendar__bs-day');
  const dateNode = document.querySelector('.Calendar__bs-date');

  const adDate = {
    day: Number.parseInt(format(date, { day: 'numeric' }), 10),
    month: Number.parseInt(format(date, { month: 'numeric' }), 10),
    year: Number.parseInt(format(date, { year: 'numeric' }), 10)
  };

  const bsDate = toBS(adDate);

  const monthName = [
    "Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
    "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
  ][bsDate.month - 1];

  dayNode.innerText = bsDate.day;
  dateNode.innerText = `${monthName} ${bsDate.year}`;
}

function getDateFromQuery() {
  const NPT_OFFSET_MS = -345 * 60 * 1000;
  const split = str=> str.split('-').map(part=> Number.parseInt(part, 10)); // split YYYY-MM-DD formatted string into parts
  const params = new URLSearchParams(window.location.search);

  if(params.get('ad')) {
    const [year, month, day] = split(params.get('ad'));
    if(!year || !month || !day) throw new Error('Please set the date query in a valid format. Eg: 2070-01-30');
    return new Date(Date.UTC(year, month - 1, day) + NPT_OFFSET_MS); // always assume the input is in NPT
  }

  if(params.get('bs')) {
    const [year, month, day] = split(params.get('bs'));
    if(!year || !month || !day) throw new Error('Please set the date query in a valid format. Eg: 2020-01-30');
    const ad = toAD({ year, month, day });
    return new Date(Date.UTC(ad.year, ad.month - 1, ad.day) + NPT_OFFSET_MS); // always assume the input is in NPT
  }
}

function renderCalendar() {
  const date = getDateFromQuery();
  if(date) {
    document.body.classList.add('is-query');
  } else {
    document.body.classList.remove('is-query');
  }

  renderAD(date || new Date());
  renderBS(date || new Date());
}

function renderError(message) {
  if(message) {
    document.body.classList.add('has-error');
    document.querySelector('.Error__message').innerText = message;
  } else {
    document.body.classList.remove('has-error');
    document.querySelector('.Error__message').innerText = '';
  }
}

function render() {
  try {
    renderCalendar();
    renderError(); // remove error if the rendering is successful
  } catch (err) {
    renderError(err.message);
  }
}

window.addEventListener('DOMContentLoaded', render);
window.addEventListener('focus', render);
