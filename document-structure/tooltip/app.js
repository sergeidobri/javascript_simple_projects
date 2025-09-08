const links = document.querySelectorAll(".has-tooltip");

function createTooltip(event) {
    const {width: widthLink} = event.target.getBoundingClientRect();
    event.target.insertAdjacentHTML("afterend", `
        <div class="tooltip">
            ${event.target.title}
        </div>
    `)

    const newTooltip = event.target.nextElementSibling;
    const {width} = newTooltip.getBoundingClientRect();

    switch(event.target.dataset.position) {
        case "left":
            newTooltip.style.transform = `translate(${-widthLink - width - 8}px, -20%)`;
            break;
        case "top":
            newTooltip.style.transform = `translate(${(-widthLink - width - 8) / 2}px, -100%)`;
            break;
        case "bottom":
            newTooltip.style.transform = `translate(${(-widthLink - width - 8) / 2}px, 60%)`;
    }

    return newTooltip;
}

function handleTooltipClick(event) {
    event.preventDefault();
    
    let tooltip = event.target.nextElementSibling?.classList.contains("tooltip")
        ? event.target.nextElementSibling
        : createTooltip(event);

    const activeTooltip = document.querySelector(".tooltip_active");
    if(activeTooltip == tooltip)
        tooltip.classList.remove("tooltip_active");
    else {
        activeTooltip?.classList.remove("tooltip_active");  // если есть - отключаем
        tooltip.classList.add("tooltip_active");
    }
}

links.forEach(lnk => lnk.addEventListener("click", handleTooltipClick));