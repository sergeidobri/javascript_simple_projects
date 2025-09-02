let wins = 0;
let loses = 0;
let lastCaughtMoleIndex = null;
const holes = document.querySelectorAll('[id^="hole"]');
const deadMolesElement = document.getElementById("dead");
const lostMolesElement = document.getElementById("lost");

function resetGame() {
    wins = 0;
    loses = 0;
    lastCaughtMoleIndex = null;
    resetStatistics();
}

function resetStatistics() {
    deadMolesElement.textContent = wins;
    lostMolesElement.textContent = loses;
}

function checkGameOver() {
    if(wins >= 10) {
        alert("Победа!")
    } else if(loses >= 5) {
        alert("Поражение!") 
    } else {
        return;
    }
    resetGame();
}

function coughtMole() {
    const moleIndex = Number.parseInt(this.id[this.id.length-1]);
    if(moleIndex !== lastCaughtMoleIndex)  // защита от читинга (двойного клика на того же крота)
        ++wins;
    lastCaughtMoleIndex = moleIndex;
}

function missedMole() {
    ++loses;
}

function handleClick() {
    if(!playing) return;
    if(this.classList.contains("hole_has-mole"))
        coughtMole.call(this);
    else
        missedMole.call(this);
    checkGameOver();
    resetStatistics();
}

holes.forEach(hole => hole.addEventListener("click", handleClick));