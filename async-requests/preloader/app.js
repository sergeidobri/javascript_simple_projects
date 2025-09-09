const loadingGif = document.getElementById("loader");

function createValuteElement(valute) {
    document.getElementById("items").insertAdjacentHTML("beforeend", `
        <div class="item">
            <div class="item__code">
                ${valute.charCode}
            </div>
            <div class="item__value">
                ${valute.value}
            </div>
            <div class="item__currency">
                руб.
            </div>
        </div>
    `)
}

function showValutes(valutes) {
    for(let valute in valutes) {
        const valuteObject = valutes[valute];
        createValuteElement({
            charCode: valuteObject.CharCode,
            value: valuteObject.Value,
        });
    }
}

function loadValutesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("valutes"));
}

function saveValutesToLocalStorage(valutes) {
    localStorage.setItem("valutes", JSON.stringify(valutes))
}

async function getValutes() {
    let valutes = loadValutesFromLocalStorage();
    if(valutes) {
        loadingGif.classList.remove("loader_active");
        showValutes(valutes);
        console.log("Отображаются данные из кеша");
    }

    console.log("Идет загрузка данных...");
    const response = await fetch("https://students.netoservices.ru/nestjs-backend/slow-get-courses");
    const responseJSON = await response.json();
    console.log("Запрос получен");

    valutes = responseJSON.response.Valute;
    document.getElementById("items").replaceChildren();  // удаляем предыдущие
    showValutes(valutes);  // показываем новые

    saveValutesToLocalStorage(valutes);
    console.log("Данные сохранены в кеш");
    loadingGif.classList.remove("loader_active");
}

getValutes();