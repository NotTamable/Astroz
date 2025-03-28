document.addEventListener('DOMContentLoaded', () => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketItemsContainer = document.getElementById('basket-items');
    const basketContent = document.getElementById('basket-content');
    const emptyBasketMessage = document.getElementById('empty-basket-message');
    const subtotalElement = document.getElementById('subtotal');
    const feeElement = document.getElementById('fee');
    const totalElement = document.getElementById('total');

    function updateBasket() {
        basketItemsContainer.innerHTML = ''; // Clear existing items
        let subtotal = 0;

        if (basket.length === 0) {
            basketContent.style.display = 'none';
            emptyBasketMessage.style.display = 'block';
            return;
        }

        basketContent.style.display = 'block';
        emptyBasketMessage.style.display = 'none';

        basket.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'basket-item';
            itemCard.innerHTML = `
                <div class="basket-item-image">
                    <img src="/ProductImages/${item.name.replace(/\s+/g, '')}.webp" alt="${item.name}">
                    <input type="checkbox" class="enable-checkbox" ${item.enabled ? 'checked' : ''} onclick="toggleItem(${item.id})">
                </div>
                <div class="basket-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: £${item.price.toFixed(2)} incl. VAT</p>
                    <div class="quantity-controls">
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                        <button class="remove-item-button" onclick="removeItem(${item.id})">X</button>
                    </div>
                </div>
            `;
            basketItemsContainer.appendChild(itemCard);
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

    window.updateQuantity = function (itemId, quantity) {
        const item = basket.find(item => item.id === itemId);
        if (item) {
            item.quantity = Math.max(1, parseInt(quantity));
            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasket();
        }
    };

    window.removeItem = function (itemId) {
        const itemIndex = basket.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            basket.splice(itemIndex, 1);
            localStorage.setItem('basket', JSON.stringify(basket));
            location.reload(); // Reload the page
        }
    };

    document.getElementById('clear-basket-button').onclick = () => {
        localStorage.removeItem('basket');
        location.reload(); // Reload the page
    };

    document.getElementById('checkout-button').onclick = () => {
        alert('Checkout functionality is not implemented yet.');
    };

    updateBasket();
});