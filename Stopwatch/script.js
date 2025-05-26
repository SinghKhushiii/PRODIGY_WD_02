let time = 0;
let interval = null;

const stopwatchE1 = document.getElementById("stopwatch");
const tickContainer = document.querySelector(".tick-lines");
const dotWrapper = document.querySelector(".dot-wrapper");
const ticks = [];

// Create 60 tick marks positioned around the circle
for (let i = 0; i < 60; i++) {
  const tick = document.createElement("div");
  tick.classList.add("tick");
  
  // Position each tick around the circle
  const angle = (i * 6) - 90; // 6 degrees apart, start from top
  tick.style.transform = `translateX(-50%) rotate(${angle}deg)`;
  tick.style.transformOrigin = 'center 100px'; // Distance from center
  
  tickContainer.appendChild(tick);
  ticks.push(tick);
}

function updateStopwatchDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  stopwatchE1.textContent = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  
  // Clear all active ticks
  ticks.forEach(tick => tick.classList.remove("active"));
  
  // Highlight current second tick
  if (ticks[seconds]) {
    ticks[seconds].classList.add("active");
  }
  
  // Rotate the dot to current second position
  const dotAngle = (seconds * 6) - 90; // 6 degrees per second, start from top
  dotWrapper.style.transform = `rotate(${dotAngle}deg)`;
}

document.getElementById("start-button").addEventListener("click", () => {
  if (!interval) {
    interval = setInterval(() => {
      time++;
      updateStopwatchDisplay();
    }, 1000);
  }
});

document.getElementById("pause-button").addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
});

document.getElementById("reset-button").addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  time = 0;
  updateStopwatchDisplay();
});

// Initialize display
updateStopwatchDisplay();