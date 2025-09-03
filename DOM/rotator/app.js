const rotators = document.querySelectorAll(".rotator");

function handleRotate(rotator) {
    const active = rotator.querySelector(".rotator__case_active");
    active.style.color = active.dataset.color;

    let interval = setInterval(() => {
        let next = active.nextElementSibling;

        if(!next)
            next = rotator.firstElementChild;

        active.classList.remove("rotator__case_active");
        active.style.color = "#000000";
        next.classList.add("rotator__case_active");
        clearInterval(interval);
        handleRotate(rotator);

    }, active.dataset.speed);
}

rotators.forEach(handleRotate);