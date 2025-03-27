document.addEventListener('DOMContentLoaded', () => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketTableBody = document.querySelector('#basket-table tbody');
    const subtotalElement = document.getElementById('subtotal');
    const feeElement = document.getElementById('fee');
    const totalElement = document.getElementById('total');

    function updateBasket() {
        basketTableBody.innerHTML = ''; // Clear existing rows
        let subtotal = 0;

        basket.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>£${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td style="background-color: white;">
                    <img src="${item.enabled ? '/images/eyesOpen.png' : '/images/eyesClosed.png'}" alt="Enable" style="cursor: pointer; width: 20px;" onclick="toggleItem(${item.id})">
                </td>
                <td>
                    <button style="background: none; border: none; color: red; font-size: 1.5rem; cursor: pointer;" onclick="removeItem(${item.id})">X</button>
                </td>
            `;
            basketTableBody.appendChild(row);
            if (item.enabled) {
                subtotal += item.price * item.quantity;
            }
        });

        const fee = Math.round((subtotal * 0.029 + 0.3) * 100) / 100;
        const total = subtotal + fee;

        subtotalElement.textContent = subtotal.toFixed(2);
        feeElement.textContent = fee.toFixed(2);
        totalElement.textContent = total.toFixed(2);
    }

    window.toggleItem = function (itemId) {
        const item = basket.find(item => item.id === itemId);
        if (item) {
            item.enabled = !item.enabled;
            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasket();
        }
    };

    window.removeItem = function (itemId) {
        const itemIndex = basket.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            basket.splice(itemIndex, 1);
            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasket();
        }
    };

    document.getElementById('clear-basket-button').onclick = () => {
        localStorage.removeItem('basket');
        updateBasket();
    };

    document.getElementById('checkout-button').onclick = () => {
        alert('Checkout functionality is not implemented yet.');
    };

    updateBasket();
});