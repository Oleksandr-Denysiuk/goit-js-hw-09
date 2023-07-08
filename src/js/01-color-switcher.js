function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', startSwitcher);
stopBtn.addEventListener('click', stopSwitcher);

let isActive = false;
let intervalId = null;

function startSwitcher() {
  if (isActive) {
    return;
  }

  isActive = true;

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopSwitcher() {
  clearInterval(intervalId);
  isActive = false;
}
