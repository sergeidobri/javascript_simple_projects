const revealElements = document.querySelectorAll(".reveal");

function handleReveal() {
    revealElements.forEach(revealElement => {
        if(revealElement.getBoundingClientRect().bottom < 0 
           ||
           revealElement.getBoundingClientRect().top > window.innerHeight)
            revealElement.classList.remove("reveal_active");
        else if(revealElement.getBoundingClientRect().top <= window.innerHeight)
            revealElement.classList.add("reveal_active");
    });
}

window.addEventListener("scroll", handleReveal);