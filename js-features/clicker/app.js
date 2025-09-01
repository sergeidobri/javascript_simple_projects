const clicker = document.getElementById("cookie");
const clickerCounterElement = document.getElementById("clicker__counter");
const clickerSpeedCounterElement = document.getElementById("clicker__speed");
const clickTimes = [];
const maxElems = 50;

let prevClickTime = Date.now();
let clickerCounter = Number.parseInt(clickerCounterElement.textContent);
let clickerSpeed = Number.parseInt(clickerSpeedCounterElement.textContent);

function calculateNewSpeed() {
    const now = Date.now();
    const timeDiff = now - prevClickTime;
    prevClickTime = now;
    
    clickTimes.push(timeDiff);
    
    if (clickTimes.length > maxElems) {
        clickTimes.shift();
    }
    
    const averageTime = clickTimes.reduce((sum, time) => sum + time, 0) / clickTimes.length;
    
    return (1000 / averageTime).toFixed(2);
}

function incrementClickerCounter() {
    clickerCounterElement.textContent = String(++clickerCounter);
    clickerSpeedCounterElement.textContent = String(calculateNewSpeed());

    updateCookieSize();
}

function updateCookieSize() {
    clicker.style.transform = clickerCounter % 2 === 0 
        ? 'scale(1.1)' 
        : 'scale(1)';
}

clicker.addEventListener("click", incrementClickerCounter);