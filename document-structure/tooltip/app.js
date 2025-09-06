const links = document.querySelectorAll(".has-tooltip");

function createTooltip(event) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.classList.add(`tooltip_${event.target.dataset.position}`);
    tooltip.textContent = event.target.title;

    event.target.insertAdjacentElement("beforeend", tooltip);
    return tooltip;
}

function handleTooltipClick(event) {
    event.preventDefault();
    const tooltip = event.target.firstElementChild?.classList.contains("tooltip")
        ? event.target.firstElementChild
        : createTooltip(event);

    document.querySelector(".tooltip_active")?.classList
        .remove("tooltip_active");

    tooltip.classList.add("tooltip_active");
}

links.forEach(lnk => lnk.addEventListener("click", handleTooltipClick));