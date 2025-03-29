document.addEventListener('DOMContentLoaded', () => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketItemsContainer = document.getElementById('basket-items');
    const basketContent = document.getElementById('basket-content');
    const emptyBasketMessage = document.getElementById('empty-basket-message');
    const subtotalElement = document.getElementById('subtotal');
    const feeElement = document.getElementById('fee');
    const totalElement = document.getElementById('total');

    function calculateCharge(desiredAmount) {
        const percentageFee = 0.0349; // 3.49%
        const flatFee = 0.30; // £0.49 flat fee
        const charge = (desiredAmount + flatFee) / (1 - percentageFee);
        return parseFloat(charge.toFixed(2)); // Rounds to two decimal places
    }

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
                    <img src="/ProductImages/${item.name.replace(/\s+/g, '')}/${item.name.replace(/\s+/g, '')}--front.webp" alt="${item.name}">
                </div>
                <div class="basket-item-details">
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}</p>
                    <p>Color: ${item.color}</p>
                    <p>Price: £${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${item.id})">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button onclick="increaseQuantity(${item.id})">+</button>
                        <button class="remove-item-button" onclick="removeItem(${item.id})">🗙</button>
                    </div>
                </div>
            `;
            basketItemsContainer.appendChild(itemCard);
            subtotal += item.price * item.quantity;
        });

        const fee = calculateCharge(subtotal) - subtotal;
        const total = subtotal + fee;

        subtotalElement.textContent = subtotal.toFixed(2);
        feeElement.textContent = fee.toFixed(2);
        totalElement.textContent = total.toFixed(2);

        updateBasketCount();
    }

    window.increaseQuantity = function (itemId) {
        const item = basket.find(item => item.id === itemId);
        if (item && item.quantity < 10) {
            item.quantity += 1;
            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasket();
        }
    };

    window.decreaseQuantity = function (itemId) {
        const item = basket.find(item => item.id === itemId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
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
        basket.length = 0;
        updateBasket();
        updateBasketCount(); // Ensure navbar basket count is updated
    };

    document.getElementById('checkout-button').onclick = () => {
        alert('Checkout functionality is not implemented yet.');
    };

    updateBasket();
});