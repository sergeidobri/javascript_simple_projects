const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".tab__content");

function handleTabToggleVisibility(event) {
    tabs.forEach(tab => {
        if(tab.classList.contains("tab_active"))
            tab.classList.remove("tab_active");
    });
    pages.forEach(page => {
        if(page.classList.contains("tab__content_active"))
            page.classList.remove("tab__content_active");
    });
    const tabIndex = Array.from(tabs).findIndex(tab => tab === this);

    tabs[tabIndex].classList.add("tab_active");
    pages[tabIndex].classList.add("tab__content_active");
}

tabs.forEach(tab => tab.addEventListener("click", handleTabToggleVisibility));