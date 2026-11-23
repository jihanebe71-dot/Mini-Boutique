
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const clearButton = document.getElementById("clear-cart");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<h2>Your cart is empty!</h2>";
    }

    cart.forEach((product, index) => {
        total += product.price * product.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${product.name}</h3>
                    <p>${product.price.toFixed(2)} MAD</p>

                    <div class="quantity">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${product.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>

                <button class="remove-btn"
                    onclick="removeProduct(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    totalElement.textContent = `Total: ${total.toFixed(2)} MAD`;

    document.getElementById("checkout-btn").style.display =
        cart.length === 0 ? "none" : "inline-block";
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}

function removeProduct(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

clearButton.addEventListener("click", () => {
    cart = [];
    saveCart();
    displayCart();
});

displayCart();
