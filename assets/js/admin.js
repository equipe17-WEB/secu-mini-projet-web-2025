document.addEventListener("DOMContentLoaded", () => {
    loadCharts();
});

async function loadCharts() {
    try {
        const response = await fetch('../api/get_stats.php');
        const data = await response.json();

        if (data.success) {
            renderStockChart(data.stocks);
            renderPriceChart(data.prices);
            renderSalesChart(data.sales);
        }
    } catch (error) {
        console.error('Error loading charts:', error);
    }
}

function renderStockChart(stocks) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: stocks.map(s => s.category),
            datasets: [{
                data: stocks.map(s => s.total_stock),
                backgroundColor: ['#d4a574', '#8b6f47', '#5c4a30', '#c89563'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#f8f8f8' } }
            }
        }
    });
}

function renderPriceChart(prices) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: prices.map(p => p.price_range),
            datasets: [{
                label: 'Products Count',
                data: prices.map(p => p.count),
                backgroundColor: '#d4a574',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#f8f8f8' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#f8f8f8' }, grid: { display: false } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function renderSalesChart(sales) {
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sales.map(s => s.label),
            datasets: [{
                label: 'Revenue ($)',
                data: sales.map(s => s.value),
                borderColor: '#d4a574',
                backgroundColor: 'rgba(212, 165, 116, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#d4a574'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#f8f8f8' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#f8f8f8' }, grid: { display: false } }
            },
            plugins: {
                legend: { labels: { color: '#f8f8f8' } }
            }
        }
    });
}

function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Add Product';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productModal').classList.add('active');
}

function openEditModal(product) {
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productDesc').value = product.description;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productImage').value = product.image_url;
    document.getElementById('productCategory').value = product.category_id;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productModal').classList.add('active');
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const isEdit = data.id !== '';
    const url = isEdit ? '../api/update_product.php' : '../api/add_product.php';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            location.reload();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        alert('Server error');
    }
});

async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        const response = await fetch('../api/delete_product.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            location.reload();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        alert('Server error');
    }
}
