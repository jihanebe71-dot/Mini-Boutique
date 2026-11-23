
const searchInput = document.querySelector('input[type="search"]');
const products = document.querySelectorAll(".produit");

searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(searchValue)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});
let cartCount = 0;
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();

        product.style.display = productName.includes(searchValue)
            ? "block"
            : "none";
    });
});

// Shopping Cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartButtons = document.querySelectorAll(".add-cart");
const cartCounter = document.getElementById("cart-count");

function updateCounter() {
    cartCounter.textContent = cart.reduce(
        (total, item) => total + item.quantity, 0
    );
}

cartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const product = button.closest(".produit");

        const id = Number(product.dataset.id);
        const name = product.querySelector("h3").textContent.trim();
        const price = Number(
            product.querySelector(".prix").textContent
                .replace(/,/g, "")
                .replace(/[^\d.]/g, "")
        );

        const image = product.querySelector("img").getAttribute("src");

        const existing = cart.find(item => item.id === id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCounter();
    });
});

updateCounter();


