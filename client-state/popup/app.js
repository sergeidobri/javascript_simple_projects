const popup = document.querySelector(".modal");
const popupClose = popup.querySelector(".modal__close_times");

popupClose.addEventListener("click", () => {
    popup.classList.remove("modal_active");
})

document.addEventListener("DOMContentLoaded", () => {
    console.log(document.cookie);
    if(document.cookie.search("modalClosedBefore") != -1) return;
    document.cookie = "modalClosedBefore=1";
    popup.classList.add("modal_active");
});
