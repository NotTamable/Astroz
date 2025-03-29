fetch('/navbar.html')
    .then(response => response.text())
    .then(data => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.innerHTML = data;
    });
function openModal(modalid) {
    document.getElementById(modalid).style.display = 'block';
}
function closeModal(modalid) {
    document.getElementById(modalid).style.display = 'none';
}

function updateBasketCount() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketCount = document.getElementById('basket-count');
    if (basketCount) {
        const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
        basketCount.textContent = totalItems;
    }
}

function updateBasketTable() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketTableBody = document.querySelector('#basket-table tbody');
    const subtotalElement = document.getElementById('subtotal');
    const feeElement = document.getElementById('fee');
    const totalElement = document.getElementById('total');

    if (basketTableBody) {
        basketTableBody.innerHTML = ''; // Clear existing rows
        let subtotal = 0;

        basket.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>£${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>
                    <img src="/images/eyesOpen.png" alt="Enable" class="toggle-item" data-id="${item.id}" style="cursor: pointer; width: 20px;">
                </td>
                <td>
                    <button class="remove-item-button" data-id="${item.id}" style="background: none; border: none; color: red; font-size: 1.5rem; cursor: pointer;">X</button>
                </td>
            `;
            basketTableBody.appendChild(row);
            subtotal += item.price * item.quantity;
        });

        const fee = Math.round((subtotal * 0.029 + 0.3) * 100) / 100;
        const total = subtotal + fee;

        subtotalElement.textContent = subtotal.toFixed(2);
        feeElement.textContent = fee.toFixed(2);
        totalElement.textContent = total.toFixed(2);
    }
}

window.onload = () => {
    updateBasketCount();
    updateBasketTable();
};

document.addEventListener('DOMContentLoaded', () => {
    updateBasketTable(); // Ensure basket table updates on page load
    document.getElementById('search-form')?.addEventListener('submit', function (event) {
        event.preventDefault();
        const query = document.getElementById('search-input')?.value.trim().toLowerCase();
        if (query) {
            window.location.href = `/products/index.html?search=${encodeURIComponent(query)}`;
        }
    });
});
document.getElementById('search-toggle')?.addEventListener('click', () => {
    document.getElementById('search-modal').style.display = 'block';
});
document.getElementById('nav-toggle')?.addEventListener('click', () => {
    const navToggle = document.getElementById('nav-toggle');
    navToggle.style.transform = 'rotate(90deg)';
    setTimeout(() => {
        navToggle.style.transform = 'rotate(0deg)';
    }, 300);
});