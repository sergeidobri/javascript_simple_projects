const textField = document.getElementById("editor");
const button = document.getElementById("clear");

function saveText() {
    const text = textField.value;
    console.log(text);
    localStorage.setItem("text", JSON.stringify(text));
}

function loadText() {
    const storedText = localStorage.getItem("text");

    if(!storedText) return;
    textField.value = JSON.parse(storedText);
}

function clearText() {
    textField.value = "";
    saveText();
}

loadText();
textField.addEventListener("keyup", saveText);
button.addEventListener("click", clearText);