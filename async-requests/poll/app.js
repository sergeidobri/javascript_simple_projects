const poll = document.querySelector(".poll");

function answerPollQuestion(event) {
    alert("Спасибо! Ваш голос засчитан");
    const answerIndex = Array.from(document.querySelector(".poll__answers").children)
        .findIndex((ans => ans == event.target));
    showStatistics(answerIndex);
}

function addPollOnDocument(id, answers, title) {
    poll.insertAdjacentHTML("beforeend", `
        <div class="poll__title" id="poll__title" data-poll-id="${id}">
            ${title}
        </div>
        <div class="poll__answers poll__answers_active" id="poll__answers">
            ${answers.map(ans => `<button class="poll__answer">${ans}</button>`).join("")}
        </div>
    `)
    const pollBtns = poll.querySelectorAll(".poll__answer");
    pollBtns.forEach(pollBtn => pollBtn.addEventListener("click", answerPollQuestion));
}

async function createPoll() {
    poll.replaceChildren();

    const pollInfo = await fetch("https://students.netoservices.ru/nestjs-backend/poll");
    const pollInfoJSON = await pollInfo.json();

    const {
        id = 0,
        data: {
            answers = [],
            title = ""
        } = {}
    } = pollInfoJSON || {};

    addPollOnDocument(id, answers, title);
}

async function showStatistics(answerIndex) {
    document.querySelector(".poll__answers").classList.remove("poll__answers_active");
    const answer = Array.from(document.querySelector(".poll__answers").children)
        .find((_, i) => i == answerIndex).innerText;
    const title = document.querySelector("#poll__title");

    const response = await fetch(`https://students.netoservices.ru/nestjs-backend/poll`, {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: `vote=${title.dataset.pollId}&answer=${answerIndex}`
    });
    const responseJSON = await response.json();
    const votesCount = responseJSON.stat.reduce((acc, st) => acc + st.votes, 0);

    poll.insertAdjacentHTML("beforeend", `
        <div class="poll__statistics">
            ${responseJSON.stat.map(st => `
                <p>${st.answer}: <b>${Number(100*st.votes/votesCount).toFixed()}%</b>  ${st.answer == answer ? `<-- Ваш выбор!` : ``}</p>
            `).join("")}
        </div>    
    `);
}

createPoll();