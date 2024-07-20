document.getElementById("start-timer").addEventListener("click", startTimer);

const timers = [];

function startTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  const totalTime = hours * 3600 + minutes * 60 + seconds;

  if (totalTime <= 0) return;

  const timerId = setInterval(() => {
    const remainingTime =
      totalTime - Math.floor((Date.now() - startTime) / 1000);

    if (remainingTime <= 0) {
      clearInterval(timerId);
      document.getElementById(`timer-${index}`).innerHTML = "Time’s Up!";
      document.getElementById(`timer-${index}`).classList.add("timer-end");
      document.getElementById("end-sound").play();
    } else {
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;

      document.getElementById(`timer-${index}`).innerHTML = `
                <span>${hours}:${minutes}:${seconds}</span>
                <button onclick="stopTimer(${index})">Stop Timer</button>
            `;
    }
  }, 1000);

  const startTime = Date.now();
  const index = timers.length;
  timers.push(timerId);

  const timerItem = document.createElement("li");
  timerItem.classList.add("timer-item");
  timerItem.id = `timer-${index}`;
  timerItem.innerHTML = `
        <span>${hours}:${minutes}:${seconds}</span>
        <button onclick="stopTimer(${index})">Stop Timer</button>
    `;

  document.getElementById("timer-list").appendChild(timerItem);
}

function stopTimer(index) {
  clearInterval(timers[index]);
  document.getElementById(`timer-${index}`).innerHTML = "Timer Stopped";
  document.getElementById(`timer-${index}`).classList.add("timer-end");
}
