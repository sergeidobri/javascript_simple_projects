const lstButton = document.querySelector(".dropdown__value");
const dropdownList = document.querySelector(".dropdown__list");

function handleListToggleVisibility() {
    dropdownList.classList.toggle("dropdown__list_active");
}

function setNewValue(event) {
    event.preventDefault();  // это отключит перенаправление и обновление стр.
    const newValue = event.target.textContent;
    lstButton.textContent = newValue;
    handleListToggleVisibility();
}

lstButton.addEventListener("click", handleListToggleVisibility);
Array.from(dropdownList.children).forEach(lstItem => lstItem.addEventListener("click", setNewValue));