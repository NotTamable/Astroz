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
                    <img src="${item.enabled ? '/images/eyesOpen.png' : '/images/eyesClosed.png'}" alt="Enable" class="toggle-item" data-id="${item.id}" style="cursor: pointer; width: 20px;">
                </td>
                <td>
                    <button class="remove-item-button" data-id="${item.id}" style="background: none; border: none; color: red; font-size: 1.5rem; cursor: pointer;">X</button>
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

        attachEventListeners(); // Reattach event listeners after updating the table
    }

    function attachEventListeners() {
        document.querySelectorAll('.toggle-item').forEach(img => {
            img.addEventListener('click', () => {
                const itemId = parseInt(img.dataset.id);
                const item = basket.find(item => item.id === itemId);
                if (item) {
                    item.enabled = !item.enabled;
                    localStorage.setItem('basket', JSON.stringify(basket));
                    updateBasket();
                }
            });
        });

        document.querySelectorAll('.remove-item-button').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.dataset.id);
                const itemIndex = basket.findIndex(item => item.id === itemId);
                if (itemIndex > -1) {
                    basket.splice(itemIndex, 1);
                    localStorage.setItem('basket', JSON.stringify(basket));
                    updateBasket();
                }
            });
        });
    }

    document.getElementById('clear-basket-button').addEventListener('click', () => {
        localStorage.removeItem('basket');
        updateBasket();
    });

    document.getElementById('checkout-button').addEventListener('click', () => {
        alert('Checkout functionality is not implemented yet.');
    });

    updateBasket();
});