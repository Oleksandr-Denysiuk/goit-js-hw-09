import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

const fp = flatpickr(dateInput, options);
startBtn.disabled = true;
const currentTime = Date.now();

startBtn.addEventListener('click', onStart);

function onStart() {
  startBtn.disabled = true;
  const selectedTime = fp.selectedDates[0];
  let timerData = selectedTime - currentTime;

  const interval = setInterval(() => {
    timerData -= 1000;

    if (timerData <= 1000) {
      clearInterval(interval);
      Notiflix.Notify.success('Timed out!');
    }
    let timeLeft = convertMs(timerData);

    days.textContent = addLeadingZero(timeLeft.days);
    hours.textContent = addLeadingZero(timeLeft.hours);
    minutes.textContent = addLeadingZero(timeLeft.minutes);
    seconds.textContent = addLeadingZero(timeLeft.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
