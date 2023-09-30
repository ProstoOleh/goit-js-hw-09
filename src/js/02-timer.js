import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateEl = document.querySelector('#datetime-picker');
const dayEl = document.querySelector('[data-days]');
const hourEl = document.querySelector('[data-hours]');
const minEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');
const valueEl = document.querySelectorAll('.value');
const labelEl = document.querySelectorAll('.label');
const timerEl = document.querySelector('.timer');
const field = document.querySelectorAll('.field');

const startBtn = document.querySelector('[data-start]');

let timerId = null;

function timerStyle() {
  dateEl.style.fontWeight = '700';
  timerEl.style.display = 'flex';
  timerEl.style.gap = '14px';
  timerEl.style.marginTop = '10px';
  valueEl.forEach(element => {
    element.style.fontSize = '40px';
    element.style.textAlign = 'center';
  });
  labelEl.forEach(element => {
    element.style.fontSize = '12px';
    element.style.fontWeight = '700';
    element.style.textTransform = 'uppercase';
    element.style.textAlign = 'center';
  });
  field.forEach(element => {
    element.style.flexDirection = 'column';
    element.style.display = 'flex';
  });
}
timerStyle();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
      setActive(true);
    } else {
      setActive(false);
    }
  },
};

function setActive(value) {
  startBtn.disabled = value;
  startBtn.style.backgroundColor = value ? '	#C0C0C0' : '	none';
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addPad(value) {
  return String(value).padStart(2, 0);
}

function countTime() {
  setActive(false);

  timerId = setInterval(() => {
    const futureDate = new Date(dateEl.value);
    const dif = futureDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(dif);
    if (dif > 1000) {
      dayEl.textContent = addPad(days);
      hourEl.textContent = addPad(hours);
      minEl.textContent = addPad(minutes);
      secEl.textContent = addPad(seconds);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

setActive(false);

flatpickr(dateEl, options);

startBtn.addEventListener('click', countTime);
