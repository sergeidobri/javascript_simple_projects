const popup = document.querySelector(".modal");
const popupClose = popup.querySelector(".modal__close_times");

if(!(localStorage.getItem("popupClosedBefore")))
    popup.classList.add("modal_active");

popupClose.addEventListener("click", () => {
    localStorage.setItem("popupClosedBefore", JSON.stringify(true))
    popup.classList.remove("modal_active");
});