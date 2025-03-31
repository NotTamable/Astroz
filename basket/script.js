document.addEventListener('DOMContentLoaded', function () {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketCounts = document.getElementsByClassName('basket-count');
    const basketItemsContainer = document.getElementById('basket-items');
    const basketContent = document.getElementById('basket-content');
    const emptyBasketMessage = document.getElementById('empty-basket-message');
    const subtotalElement = document.getElementById('subtotal');
    const feeElement = document.getElementById('fee');
    const totalElement = document.getElementById('total');
    const clearBasketButton = document.getElementById('clear-basket-button');
    const checkoutButton = document.getElementById('checkout-button');

    function updateBasketCount() {
        const totalItems = basket.reduce(function (sum, item) {
            return sum + item.quantity;
        }, 0);

        for (let i = 0; i < basketCounts.length; i++) {
            basketCounts[i].textContent = totalItems;
        }
    }

    function calculateCharge(desiredAmount) {
        const percentageFee = 0.0349;
        const flatFee = 0.30;
        const charge = (desiredAmount + flatFee) / (1 - percentageFee);
        return parseFloat(charge.toFixed(2));
    }

    function updateBasket() {
        basketItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (basket.length === 0) {
            basketContent.style.display = 'none';
            emptyBasketMessage.style.display = 'block';
            updateBasketCount();
            return;
        }

        basketContent.style.display = 'block';
        emptyBasketMessage.style.display = 'none';

        basket.forEach(function (item, index) {
            const itemCard = document.createElement('div');
            itemCard.className = 'basket-item';
            itemCard.innerHTML = `
                <div class="basket-item-image">
                    <img src="/ProductImages/${item.name.replace(/\s+/g, '')}/${item.name.replace(/\s+/g, '')}--front.webp" alt="${item.name}">
                    <input type="checkbox" class="enable-checkbox" id="enable-${index}" ${item.enabled ? 'checked' : ''}>
                </div>
                <div class="basket-item-details">
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}</p>
                    <p>Color: ${item.color}</p>
                    <p>Price: £${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button id="decrease-${index}">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button id="increase-${index}">+</button>
                        <button class="remove-item-button" id="remove-${index}">X</button>
                    </div>
                </div>
            `;
            basketItemsContainer.appendChild(itemCard);

            if (item.enabled) {
                subtotal += item.price * item.quantity;
            }

            document.getElementById(`enable-${index}`).addEventListener('change', function (event) {
                item.enabled = event.target.checked;
                localStorage.setItem('basket', JSON.stringify(basket));
                updateBasket();
            });

            const decreaseButton = document.getElementById(`decrease-${index}`);
            const increaseButton = document.getElementById(`increase-${index}`);
            const removeButton = document.getElementById(`remove-${index}`);

            decreaseButton.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                document.activeElement.blur(); // Remove focus from any element
                decreaseQuantity(index);
            });

            increaseButton.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                document.activeElement.blur();
                increaseQuantity(index);
            });

            removeButton.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                removeItem(index);
            });
        });

        const fee = calculateCharge(subtotal) - subtotal;
        const total = subtotal + fee;

        subtotalElement.textContent = subtotal.toFixed(2);
        feeElement.textContent = fee.toFixed(2);
        totalElement.textContent = total.toFixed(2);

        updateBasketCount();
    }

    function increaseQuantity(index) {
        if (basket[index].quantity < 10) {
            basket[index].quantity++;
            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasket();
        }
    }

    function decreaseQuantity(index) {
        if (basket[index].quantity > 1) {
            basket[index].quantity--;
            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasket();
        }
    }

    function removeItem(index) {
        basket.splice(index, 1);
        localStorage.setItem('basket', JSON.stringify(basket));
        updateBasket();
    }

    function clearBasket() {
        localStorage.removeItem('basket');
        basket.length = 0;
        updateBasket();
        updateBasketCount();
    }

    function handleCheckout() {
        alert('Checkout functionality is not implemented yet.');
    }

    if (clearBasketButton) {
        clearBasketButton.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            clearBasket();
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            handleCheckout();
        });
    }

    updateBasket();
});