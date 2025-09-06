const tabs = document.querySelectorAll(".tab");

function handleTabClick(event) {
    const targetTabsElement = event.target.closest(".tabs");
    ["tab__content_active", "tab_active"].forEach(cls => {
        console.log(targetTabsElement.querySelector(cls));
        targetTabsElement.querySelector(`.${cls}`).classList.remove(cls);
    });

    const targetTabsList = targetTabsElement.querySelector(".tab__navigation").children;
    const targetPagesList = targetTabsElement.querySelector(".tab__contents").children;
    const tabIndex = Array.from(targetTabsList).findIndex(tab => tab === this);

    targetTabsList[tabIndex].classList.add("tab_active");
    targetPagesList[tabIndex].classList.add("tab__content_active");
}

tabs.forEach(tab => tab.addEventListener("click", handleTabClick));