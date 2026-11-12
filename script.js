let cart = [];

const cartButton = document.getElementById('cart-button');
const cartPanel = document.getElementById('cart-panel');
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

cartButton.addEventListener("click", function () {
    cartPanel.classList.add("active");
});

closeCart.addEventListener("click", function () {
    cartPanel.classList.remove("active");
});

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {

        const name = this.dataset.name;
        const price = Number(this.dataset.price);

        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            })
        }

        updateCart();
    });

});

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-product">
                <div>
                    <strong>${item.name}</strong>
                    <p>$${item.price.toFixed(2)} </p>
                    
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    
                    ${item.quantity}
                    
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    
                    <button class="remove-item"
                    onclick="removeProduct(${index})">
                    Remove 
                    </button>
                </div>
                
            `;
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
    }

    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2);
}

function changeQuantity(index, amount) {
    
    cart[index].quantity += amount;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

        updateCart();
}

function removeProduct(index) {
    
    cart.splice(index, 1);
    updateCart();
}




    