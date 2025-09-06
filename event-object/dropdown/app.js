const lstButtons = document.querySelectorAll(".dropdown__value");
const dropdownsList = document.querySelectorAll(".dropdown__list");

function changeListVisibility(lst) {
    lst.classList.toggle("dropdown__list_active");
}

function handleClick(event) {
    changeListVisibility(event.target.nextElementSibling);
}

function setNewValue(event) {
    event.preventDefault();  // это отключит перенаправление и обновление стр.

    const newValue = event.target.textContent;
    const targetList = event.target.closest(".dropdown__list");
    targetList.previousElementSibling.textContent = newValue;
    
    changeListVisibility(targetList);
}

lstButtons.forEach(btn => btn.addEventListener("click", handleClick));
dropdownsList.forEach(lst => Array.from(lst.children).forEach(lstItem => lstItem.addEventListener("click", setNewValue)));