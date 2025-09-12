const textField = document.getElementById("editor");
const button = document.getElementById("clear");

function saveText() {
    const text = textField.value;
    localStorage.setItem("text", JSON.stringify(text));
}

function loadText() {
    const storedText = localStorage.getItem("text");
    textField.value = JSON.parse(storedText);
}

function clearText() {
    textField.value = "";
    localStorage.removeItem("text");
}

loadText();
textField.addEventListener("keyup", saveText);
button.addEventListener("click", clearText);