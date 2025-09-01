let wins = 0;
let loses = 0;
let gameOver = false;
let lastCaughtMoleIndex = null;
const holes = document.querySelectorAll('[id^="hole"]');
const deadMolesElement = document.getElementById("dead");
const lostMolesElement = document.getElementById("lost");

function stopGame() {
    playing = false;
}

function checkGameOver() {
    if(playing && wins >= 10) {
        alert("Победа!")
    } else if(playing && loses >= 5) {
        alert("Поражение!") 
    } else if(playing) {
        return;
    }
    stopGame();
}

function coughtMole() {
    const moleIndex = Number.parseInt(this.id[this.id.length-1]);
    if(moleIndex !== lastCaughtMoleIndex)  // защита от читинга (двойного клика на того же крота)
        ++wins;
    lastCaughtMoleIndex = moleIndex;

    deadMolesElement.textContent = wins;
}

function missedMole() {
    ++loses;
    lostMolesElement.textContent = loses;
}

function handleClick() {
    if(!playing) return;
    if(this.classList.contains("hole_has-mole"))
        coughtMole.call(this);
    else
        missedMole.call(this);
    checkGameOver();
}

holes.forEach(hole => hole.addEventListener("click", handleClick));