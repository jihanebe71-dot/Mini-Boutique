
const watches = [
    { id: 1, name: "Gold Watch", price: 849, image: "photos/images (1).jpeg" },
    { id: 2, name: "Green Watch", price: 499, image: "photos/images (2).jpeg" },
    { id: 3, name: "Silver Watch", price: 1199, image: "photos/images (3).jpeg" },
    { id: 4, name: "Blue Watch", price: 699, image: "photos/images (4).jpeg" },
    { id: 5, name: "Black Watch", price: 699, image: "photos/2-025-03-0010.jpg" },
    { id: 6, name: "Black Big Watch", price: 699, image: "photos/images (5).jpeg" },
    { id: 7, name: "Brown Watch", price: 699, image: "photos/images (6).jpeg" },
    { id: 8, name: "Dark Brown Watch", price: 699, image: "photos/images (7).jpeg" },
    { id: 9, name: "Light Brown Watch", price: 699, image: "photos/images (8).jpeg" },
    { id: 10, name: "Gold Watch", price: 699, image: "photos/images (9).jpeg" }
];

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const product = watches.find(watch => watch.id === id);

const mainImage = document.getElementById("main-image");
const nameElement = document.getElementById("product-name");
const priceElement = document.getElementById("product-price");
const quantityInput = document.getElementById("quantity");
const addButton = document.getElementById("add-to-cart");

if (!product) {
    nameElement.textContent = "Product not found";
    priceElement.textContent = "";
    mainImage.style.display = "none";
    addButton.disabled = true;
} else {
    nameElement.textContent = product.name;
    priceElement.textContent = product.price.toFixed(2);
    mainImage.src = product.image;
    mainImage.alt = product.name;
    document.title = product.name + " - Timeless Watches";

    const thumbnails = document.getElementById("thumbnails");

    if (thumbnails) {
        const thumbnail = document.createElement("img");
        thumbnail.src = product.image;
        thumbnail.alt = product.name;
        thumbnail.addEventListener("click", () => {
            mainImage.src = product.image;
        });
        thumbnails.appendChild(thumbnail);
    }
}

document.getElementById("plus").addEventListener("click", () => {
    quantityInput.value = Math.max(1, Number(quantityInput.value) || 1) + 1;
});

document.getElementById("minus").addEventListener("click", () => {
    quantityInput.value = Math.max(1, (Number(quantityInput.value) || 1) - 1);
});

addButton.addEventListener("click", () => {
    if (!product) return;

    const quantity = Math.max(1, Math.floor(Number(quantityInput.value) || 1));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
});
