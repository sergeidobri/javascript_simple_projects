const form = document.querySelector("#signin__form");
const error = document.querySelector(".error");
let storedUserId;

async function authenticateUser(event) {
    event.preventDefault();

    const response = await fetch("https://students.netoservices.ru/nestjs-backend/auth", {
        method: "POST",
        body: new FormData(form)
    });
    const responseJSON = await response.json();
    if(responseJSON.success) {
        storedUserId = responseJSON["user_id"];
        localStorage.setItem("userId", storedUserId);
    } else {
        handleError();
        form.reset();
        return;
    }

    showWelcome();
}

function handleError() {
    error.classList.add("error_active");
}

function showWelcome() {
    document.querySelector("#signin").classList.remove("signin_active");
    document.querySelector("#welcome").classList.add("welcome_active");
    document.querySelector("#user_id").innerText = storedUserId;
}

document.getElementById("signin__btn").addEventListener("click", authenticateUser);


storedUserId = localStorage.getItem("userId");

if(storedUserId && storedUserId != 0) showWelcome();