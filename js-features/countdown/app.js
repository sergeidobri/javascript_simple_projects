const timer = document.getElementById("timer");
let timerCounter = Number.parseInt(timer.textContent);
let interval;

function formatClockTime(clockTime) {
    const h = Math.floor(clockTime / 3600) % 24;
    const m = Math.floor(clockTime / 60) % 60;
    const s = clockTime % 60;
    
    return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
}

function updateTimer(newValue) {
    timer.textContent = formatClockTime(newValue);
}

function countdown() {
    interval = setInterval(() => {
        --timerCounter;
        updateTimer(timerCounter);
        if(timerCounter <= 0) {
            clearInterval(interval);
            alert("Вы победили! Начинается установка вируса (ШУТКА)");
            location = "https://download.samplelib.com/xls/sample-empty.xls";
        }
    }, 1000);
}

updateTimer(timerCounter);

document.addEventListener("DOMContentLoaded", countdown);
