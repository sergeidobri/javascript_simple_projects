const cartProducts = document.querySelector(".cart__products");
const cart = document.querySelector(".cart");
const products = document.querySelector(".products");

// animation
function animatePushing(productInCart) {
    const productId = productInCart.dataset.id;
    const product = Array.from(products.children).find(prod => prod.dataset.id == productId);
    const productImage = product.querySelector(".product__image");
    const productInCartImage = productInCart.querySelector(".cart__product-image");

    const {left: leftProduct, top: topProduct} = productImage.getBoundingClientRect();
    const {left: leftProductInCart, top: topProductInCart} = productInCartImage.getBoundingClientRect();

    const photoToMove = document.createElement("img");
    photoToMove.className = "product__image";
    photoToMove.src = product.querySelector(".product__image").src;
    photoToMove.style.position = "absolute";
    photoToMove.style.left = `${leftProduct}px`;
    photoToMove.style.top = `${topProduct}px`;
    photoToMove.style.transform = "translate(0px, 0px)";
    photoToMove.style.transition = "transform .1s linear 0s";

    document.body.append(photoToMove);
    photoToMove.addEventListener("transitionend", function removePhoto() {
        photoToMove.removeEventListener("transitionend", removePhoto);
        photoToMove.remove();
    });
    setTimeout(() => {
        photoToMove.style.transform = `translate(${leftProductInCart - leftProduct}px, ${topProductInCart - topProduct}px)`
    }, 0);
}

// products
function changeQuantity(event) {
    const targetProduct = event.target.closest(".product");
    const productQuantity = targetProduct.querySelector(".product__quantity-value");

    if(event.target.className.includes("dec")) {
        if(+productQuantity.textContent <= 1) return;
        productQuantity.textContent = --productQuantity.textContent;
    } else if(event.target.className.includes("inc")) {
        productQuantity.textContent = ++productQuantity.textContent;
    } else if(event.target.className.includes("add")) {
        productQuantity.textContent = 1;
    }
}

function createProduct(productProto) {
    cartProducts.insertAdjacentHTML("beforeend", `
        <div class="cart__product" data-id="${productProto.dataset.id}">
            <img class="cart__product-image" src="${productProto.querySelector(".product__image").src}">
            <div class="cart__product-count">${productProto.querySelector(".product__quantity-value").innerText}</div>
            <div class="cart__product-count__decrease">-1</div>
        </div>
    `)

    const newProduct = cartProducts.lastElementChild;

    const productQuantity = newProduct.querySelector(".cart__product-count");
    productQuantity.addEventListener("click", removeProductFromCart);
    productQuantity.addEventListener("mouseover", showRemoveButton);
    productQuantity.addEventListener("mouseout", hideRemoveButton);

    const decreaseQuantityBtn = newProduct.querySelector(".cart__product-count__decrease");
    decreaseQuantityBtn.addEventListener("click", decreaseCartQuantity);

    return newProduct;
}

// cart
function pushProductToCart(event) {
    const productToAdd = event.target.closest(".product");
    const productIndex = Array.from(cartProducts.children)
        .findIndex(prodInCart => 
            prodInCart.dataset.id === productToAdd.dataset.id
        );
    let newProduct;
    if(productIndex === -1) {
        newProduct = createProduct(productToAdd);
    } else {
        newProduct = cartProducts.children[productIndex];
        const productInCartQuantity = getCountElementOfProduct(Array.from(cartProducts.children)[productIndex]);
        const quantityToAdd = productToAdd.querySelector(".product__quantity-value").textContent;

        productInCartQuantity.innerText = +productInCartQuantity.innerText + +quantityToAdd;
    }

    animatePushing(newProduct)
    saveCartToLocalStorage();
    changeQuantity(event);
    showCart();
}

function removeProductFromCart(event) {
    const productToRemove = event.target.closest(".cart__product");
    const productQuantity = getCountElementOfProduct(productToRemove);
    productQuantity.removeEventListener("click", removeProductFromCart);
    productQuantity.removeEventListener("mouseover", showRemoveButton);
    productQuantity.removeEventListener("mouseout", hideRemoveButton);

    const decreaseQuantityBtn = productToRemove.querySelector(".cart__product-count__decrease");
    decreaseQuantityBtn.removeEventListener("click", decreaseCartQuantity);

    productToRemove.remove();

    if(cartProducts.children.length == 0) 
        hideCart();
    else 
        showCart();

    saveCartToLocalStorage();
}

function decreaseCartQuantity(event) {
    const productElement = this.closest(".cart__product");
    const quantity = getCountElementOfProduct(productElement);
    if(Number.parseInt(quantity.innerText) <= 1)
        removeProductFromCart(event);
    else
        quantity.innerText = Number.parseInt(quantity.innerText) - 1;

    saveCartToLocalStorage();
}

// local storage
function loadCartFromLocalStorage() {
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));

    if(!cartInStorage) {
        localStorage.setItem("cart", JSON.stringify([]));
        return;
    }

    showCart();
    cartInStorage.forEach(prodInCart => {
        const productProto = getProductById(prodInCart.id);
        const newProduct = createProduct(productProto);
        getCountElementOfProduct(newProduct).innerText = prodInCart.quantity;
    });
}

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(Array.from(cartProducts.children).map(prod => {
        return {
            id: prod.dataset.id,
            quantity: Number.parseInt(getCountElementOfProduct(prod).innerText)
        };
    })));
}

// utils
function hideCart() {
    cart.classList.add("hide");
}

function showCart() {
    cart.classList.remove("hide");
}

function showRemoveButton(event) {
    event.target.style.color = "rgba(0, 0, 0, 0)"
    event.target.style.backgroundImage = 'url("./trash.svg")';
    event.target.style.backgroundSize = `${event.target.getBoundingClientRect().width*0.8}px ${event.target.getBoundingClientRect().height*0.8}px`;
    event.target.style.backgroundPosition = "center center";
}

function hideRemoveButton(event) {
    event.target.style.color = "rgba(0, 0, 0, 1)"
    event.target.style.backgroundImage = "none";
}

function getProductById(id) {
    return Array.from(products.children).find(prod => prod.dataset.id == id);
}

function getCountElementOfProduct(product) {
    return product.querySelector(".cart__product-count");
}

Array.from(products.children).forEach(prod => {
    const decBtn = prod.querySelector(".product__quantity-control_dec");
    const incBtn = prod.querySelector(".product__quantity-control_inc");
    const pushBtn = prod.querySelector(".product__add");
    
    decBtn.addEventListener("click", changeQuantity);
    incBtn.addEventListener("click", changeQuantity);
    pushBtn.addEventListener("click", pushProductToCart);
});

document.addEventListener("DOMContentLoaded", loadCartFromLocalStorage);