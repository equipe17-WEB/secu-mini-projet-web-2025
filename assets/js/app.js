const cart = JSON.parse(localStorage.getItem('cart')) || [];
let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartCount();

    const searchInput = document.getElementById('product-search');
    const categoryFilter = document.getElementById('category-filter');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    if (searchInput) searchInput.addEventListener('input', () => filterProducts());
    if (categoryFilter) categoryFilter.addEventListener('change', () => filterProducts());
    if (minPriceInput) minPriceInput.addEventListener('input', () => filterProducts());
    if (maxPriceInput) maxPriceInput.addEventListener('input', () => filterProducts());
});

function loadProducts() {
    const productContainer = document.getElementById('product-list');

    fetch('api/get_products.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                productContainer.innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }
            allProducts = data;
            renderProducts(allProducts);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productContainer.innerHTML = '<p>Offline or connection error.</p>';
        });
}

function filterProducts() {
    const searchTerm = document.getElementById('product-search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    const filtered = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);

        const matchesCategory = category === 'all' || product.category_name === category;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    renderProducts(filtered);
}

function renderProducts(products) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';

    if (products.length === 0) {
        productContainer.innerHTML = '<p>No products found matching your criteria.</p>';
        return;
    }

    products.forEach(item => {
        const productCard = document.createElement('div');
        productCard.className = 'glass product-card';

        productCard.innerHTML = `
            <div class="product-image" onclick="window.location.href='product.php?id=${item.id}'" style="cursor: pointer;">
                <img src="${item.image_url}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/500x500?text=No+Image'">
            </div>
            <div class="product-info">
                <h3 onclick="window.location.href='product.php?id=${item.id}'" style="cursor: pointer;">${item.name}</h3>
                <p>${item.description}</p>
                <div class="product-price-row">
                    <span class="price">$${parseFloat(item.price).toFixed(2)}</span>
                    <button class="btn-add" onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

function getProductIcon(name) {
    const n = name.toLowerCase();
    if (n.includes('keyboard')) return '⌨️';
    if (n.includes('mouse')) return '🖱️';
    if (n.includes('mug')) return '☕';
    if (n.includes('laptop')) return '💻';
    if (n.includes('phone')) return '📱';
    return '📦';
}

function addToCart(id, name, price) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    saveCart();
    if (typeof showToast === 'function') {
        showToast(`${name} added to cart!`, 'success');
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartLinks = document.querySelectorAll('a[href="cart.php"]');
    cartLinks.forEach(link => {
        link.innerHTML = `Cart (${count})`;
    });
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) {
        if (typeof showToast === 'function') {
            showToast('Please enter both username and password', 'error');
        } else {
            alert('Please enter both username and password');
        }
        return;
    }
    fetch('api/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (typeof showToast === 'function') {
                    showToast('Login successful!', 'success');
                }
                setTimeout(() => {
                    window.location.href = data.role === 'admin' ? 'admin/index.php' : 'index.php';
                }, 1000);
            } else {
                if (typeof showToast === 'function') {
                    showToast(data.message, 'error');
                } else {
                    alert(data.message);
                }
            }
        })
        .catch(error => console.error('Error logging in:', error));
}

function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✅' : (type === 'error' ? '❌' : 'ℹ️');

    toast.innerHTML = `
        <span>${icon}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}