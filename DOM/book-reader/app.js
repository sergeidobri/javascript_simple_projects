const fontSizeBtns = document.querySelectorAll(".font-size");
const textColorBtns = document.querySelectorAll("[data-text-color]");
const bgColorBtns = document.querySelectorAll("[data-bg-color]");

const content = document.querySelector(".book__content");

function handleChangeFontSize(event) {
    event.preventDefault();
    if(this.classList.contains("font-size_active")) return;

    const active = Array.from(fontSizeBtns).find(btn => btn.classList.contains("font-size_active"));
    active.classList.remove("font-size_active");
    this.classList.add("font-size_active");

    ["book_fs-small", "book_fs-big"].forEach((cls) => {
        if(content.classList.contains(cls))
            content.classList.remove(cls);
    })
    
    switch(this.dataset.size) {
        case "small":
            content.classList.add("book_fs-small");
            break;
        case "big":
            content.classList.add("book_fs-big");
            break;
    }
}

function handleChangeTextColor(event) {
    event.preventDefault();
    if(this.classList.contains("color_active")) return;

    const active = Array.from(textColorBtns).find(btn => btn.classList.contains("color_active"));
    active.classList.remove("color_active");
    this.classList.add("color_active");

    ["book_color-black", "book_color-gray", "book_color-whitesmoke"].forEach((cls) => {
        if(content.classList.contains(cls))
            content.classList.remove(cls);
    })
    
    switch(this.dataset.textColor) {
        case "black":
            content.classList.add("book_color-black");
            break;
        case "gray":
            content.classList.add("book_color-gray");
            break;
        case "whitesmoke":
            content.classList.add("book_color-whitesmoke");
            break;
    }
}

function handleChangeBGColor(event) {
    event.preventDefault();
    if(this.classList.contains("color_active")) return;

    const active = Array.from(bgColorBtns).find(btn => btn.classList.contains("color_active"));
    active.classList.remove("color_active");
    this.classList.add("color_active");

    ["bg_color_black", "bg_color_gray", "bg_color_white"].forEach((cls) => {
        if(content.classList.contains(cls))
            content.classList.remove(cls);
    })
    
    switch(this.dataset.bgColor) {
        case "black":
            content.classList.add("bg_color_black");
            break;
        case "gray":
            content.classList.add("bg_color_gray");
            break;
        case "white":
            content.classList.add("bg_color_white");
            break;
    }
}

fontSizeBtns.forEach(btn => btn.addEventListener("click", handleChangeFontSize));
textColorBtns.forEach(btn => btn.addEventListener("click", handleChangeTextColor));
bgColorBtns.forEach(btn => btn.addEventListener("click", handleChangeBGColor));