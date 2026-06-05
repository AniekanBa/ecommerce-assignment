// Initialize cart from localStorage or create an empty array [cite: 29]
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save the cart state to localStorage [cite: 29]
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add a product to the cart [cite: 28]
function addToCart(id, name, price) {
    cart.push({ id, name, price });
    saveCart();
    alert(name + " was added to your cart!");
}

// Function to remove a product from the cart [cite: 30]
function removeFromCart(index) {
    cart.splice(index, 1); // Remove 1 item at the specific index
    saveCart();
    renderCart(); // Re-render the UI
}

// Function to display cart items on the cart.html page
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    
    // Only run if we are on the cart page
    if (!cartContainer) return;
    
    cartContainer.innerHTML = ''; // Clear current items
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('h3');
    totalDiv.innerText = `Total: $${total}`;
    cartContainer.appendChild(totalDiv);
}

// Automatically render the cart when the page loads
window.onload = renderCart;