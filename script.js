// Product data
const products = [
    { id: 1, name: "Classic Hoodie", price: 59.99, category: "hoodies", image: "/images for brand/Hoodie Sample Image.jpg", description: "Our classic hoodie offers ultimate comfort with a modern fit. Perfect for any casual occasion." },
    { id: 2, name: "Zip-up Hoodie", price: 64.99, category: "hoodies", image: "/images for brand/Graphic Hoodie Front Back.jpg", description: "Our zip-up hoodie combines style and functionality. Easy to wear and perfect for layering." },
    { id: 3, name: "Basic Tee", price: 29.99, category: "tees", image: "/api/placeholder/400/300", description: "Our basic tee is anything but basic. Made from premium cotton for all-day comfort." },
    { id: 4, name: "Graphic Tee", price: 34.99, category: "tees", image: "/api/placeholder/400/300", description: "Make a statement with our graphic tee. Featuring unique designs and a comfortable fit." }
];

let cart = [];

document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products");
    const cartIcon = document.getElementById("cart-icon");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const categoryFilter = document.getElementById("category-filter");
    const sortBy = document.getElementById("sort-by");

    function renderProducts(productsToRender) {
        productsContainer.innerHTML = "";
        productsToRender.forEach(product => {
            const productElement = document.createElement("div");
            productElement.className = "bg-white rounded-lg shadow-lg overflow-hidden";
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="p-6">
                    <h3 class="text-2xl font-semibold mb-2">${product.name}</h3>
                    <p class="text-xl text-gray-600 mb-4">$${product.price.toFixed(2)}</p>
                    <p class="text-gray-700 mb-4">${product.description}</p>
                    <button class="btn-pop bg-accent-blue text-white font-bold py-2 px-4 rounded-full hover:opacity-90" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    function filterAndSortProducts() {
        let filteredProducts = products;
        const category = categoryFilter.value;
        if (category !== "all") {
            filteredProducts = products.filter(product => product.category === category);
        }

        const sortValue = sortBy.value;
        filteredProducts.sort((a, b) => {
            if (sortValue === "name") {
                return a.name.localeCompare(b.name);
            } else if (sortValue === "price-low-high") {
                return a.price - b.price;
            } else if (sortValue === "price-high-low") {
                return b.price - a.price;
            }
        });

        renderProducts(filteredProducts);
    }

    categoryFilter.addEventListener("change", filterAndSortProducts);
    sortBy.addEventListener("change", filterAndSortProducts);

    renderProducts(products);

    cartIcon.addEventListener("click", function() {
        cartSidebar.classList.toggle("translate-x-full");
    });

    checkoutBtn.addEventListener("click", function() {
        if (cart.length === 0) {
            alert("Your cart is empty. Add some items before checking out.");
        } else {
            alert("Thank you for your purchase! Your order has been placed.");
            cart = [];
            updateCart();
        }
    });

    // Load cart from local storage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <p class="font-semibold">${item.name}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="text-red-500" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
        count += item.quantity;
    });

    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2);

    // Save cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
}