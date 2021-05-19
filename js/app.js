import { toBS, toAD } from '@sbspk/bs';

// get formatted date in NPT
function format(date, options = {}) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu',
    ...options
  }).format(date);
}

function renderPrimary({ day, monthName, year }) {
  document.querySelector('.Calendar__primary-day').innerText = day;
  document.querySelector('.Calendar__primary-date').innerText = `${monthName} ${year}`;
}

function renderSecondary({ day, dayName, monthName, year }) {
  document.querySelector('.Calendar__secondary').innerText = `${dayName}, ${day} ${monthName} ${year}`;
}

function formatAsAD(date) {
  const day = format(date, { day: 'numeric' });
  const dayName = format(date, { weekday: 'short' });
  const monthName = format(date, { month: 'long' });
  const year = format(date, { year: 'numeric' });

  return { day, dayName, monthName, year };
}

function formatAsBS(date) {
  const monthNames = [
    "Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
    "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
  ];

  const adDate = {
    day: Number.parseInt(format(date, { day: 'numeric' }), 10),
    month: Number.parseInt(format(date, { month: 'numeric' }), 10),
    year: Number.parseInt(format(date, { year: 'numeric' }), 10)
  };

  const bsDate = toBS(adDate);

  return {
    day: bsDate.day,
    dayName: format(date, { weekday: 'short' }),
    monthName: monthNames[bsDate.month - 1],
    year: bsDate.year
  }
}

function getDateFromQuery() {
  const NPT_OFFSET_MS = 345 * 60 * 1000;
  const split = str=> str.split('-').map(part=> Number.parseInt(part, 10)); // split YYYY-MM-DD formatted string into parts
  const params = new URLSearchParams(window.location.search);

  if(params.get('ad')) {
    const [year, month, day] = split(params.get('ad'));
    if(!year || !month || !day) throw new Error('Please enter the date query in a valid format. Eg: 2020-01-30');

    return {
      queryType: 'ad',
      date: new Date(Date.UTC(year, month - 1, day) + NPT_OFFSET_MS) // always assume the input is in NPT
    };
  }

  if(params.get('bs')) {
    const [year, month, day] = split(params.get('bs'));
    if(!year || !month || !day) throw new Error('Please enter the date query in a valid format. Eg: 2075-01-30');
    const ad = toAD({ year, month, day });

    return {
      queryType: 'bs',
      date: new Date(Date.UTC(ad.year, ad.month - 1, ad.day) + NPT_OFFSET_MS) // always assume the input is in NPT
    }
  }

  return {};
}

function renderCalendar() {
  const { date = new Date(), queryType } = getDateFromQuery();

  switch(queryType) {
    case 'bs':
      document.body.classList.add('is-query');
      renderPrimary(formatAsAD(date));
      renderSecondary(formatAsBS(date));
      break;

    case 'ad':
      document.body.classList.add('is-query');
      renderPrimary(formatAsBS(date));
      renderSecondary(formatAsAD(date));
      break;

    default: {
      document.body.classList.remove('is-query');
      renderPrimary(formatAsBS(date));
      renderSecondary(formatAsAD(date));
    }
  }
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
