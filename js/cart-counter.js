
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    const counter = document.getElementById("cart-count");

    if (counter) {
        counter.textContent = totalItems;
    }
}

updateCartCounter();
