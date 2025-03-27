document.addEventListener('DOMContentLoaded', () => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketTableBody = document.querySelector('#basket-table tbody');
    const subtotalElement = document.getElementById('subtotal');
    const feeElement = document.getElementById('fee');
    const totalElement = document.getElementById('total');

    let subtotal = 0;

    basket.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>£${item.price.toFixed(2)}</td>
            <td>1</td>
        `;
        basketTableBody.appendChild(row);
        subtotal += item.price;
    });

    const fee = Math.round((subtotal * 0.029 + 0.3) * 100) / 100;
    const total = subtotal + fee;

    subtotalElement.textContent = subtotal.toFixed(2);
    feeElement.textContent = fee.toFixed(2);
    totalElement.textContent = total.toFixed(2);

    document.getElementById('checkout-button').addEventListener('click', () => {
        alert('Checkout functionality is not implemented yet.');
    });
});
fetch('/navbar.html')
    .then(response => response.text())
    .then(data => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.innerHTML = data;
    });

const script = document.createElement('script');
script.src = '/navscript.js';
document.body.appendChild(script);
