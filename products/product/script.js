const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
const product = window.products.find(p => p.id === productId);

function updateBasketCount() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketCount = document.getElementById('basket-count');
    if (basketCount) {
        const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
        basketCount.textContent = totalItems;
    }
}

if (product) {
    const productDetails = document.getElementById('product-details');
    if (productDetails) {
        const productNameSlug = product.name.replace(/\s+/g, '');
        productDetails.querySelector('.product-image').src = `/ProductImages/${productNameSlug}/${productNameSlug}--front.webp`;
        productDetails.querySelector('.product-name').textContent = product.name;
        productDetails.querySelector('.price').textContent = `£${product.price.toFixed(2)}`;

        const sizeContainer = document.getElementById('size-options');
        const colorContainer = document.getElementById('color-options');

        product.sizes.forEach(size => {
            const sizeCheckbox = document.createElement('input');
            sizeCheckbox.type = 'checkbox';
            sizeCheckbox.value = size;
            sizeCheckbox.id = `size-${size}`;
            sizeCheckbox.className = 'size-checkbox';

            const sizeLabel = document.createElement('label');
            sizeLabel.htmlFor = `size-${size}`;
            sizeLabel.textContent = size;

            sizeContainer.appendChild(sizeCheckbox);
            sizeContainer.appendChild(sizeLabel);
        });

        product.colors.forEach(color => {
            const colorLabel = document.createElement('label');
            colorLabel.textContent = color;
            colorLabel.htmlFor = `color-${color}`;
            colorLabel.style.display = 'block';

            const colorRadio = document.createElement('input');
            colorRadio.type = 'radio';
            colorRadio.name = 'color';
            colorRadio.value = color;
            colorRadio.id = `color-${color}`;
            colorRadio.className = 'color-radio';

            colorContainer.appendChild(colorRadio);
            colorContainer.appendChild(colorLabel);
        });

        const quantityInput = document.getElementById('quantity-text');
        const decreaseButton = document.querySelector('.quantity-controls button:first-child');
        const increaseButton = document.querySelector('.quantity-controls button:last-child');

        if (quantityInput && decreaseButton && increaseButton) {
            function updateQuantityButtons() {
                decreaseButton.disabled = quantityInput.value <= 1;
                increaseButton.disabled = quantityInput.value >= 10;
                decreaseButton.style.opacity = decreaseButton.disabled ? '0.5' : '1';
                increaseButton.style.opacity = increaseButton.disabled ? '0.5' : '1';
            }

            function decreaseQuantity() {
                if (quantityInput.value > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                    updateQuantityButtons();
                }
            }

            function increaseQuantity() {
                if (quantityInput.value < 10) {
                    quantityInput.value = parseInt(quantityInput.value) + 1;
                    updateQuantityButtons();
                }
            }

            decreaseButton.addEventListener('click', decreaseQuantity);
            increaseButton.addEventListener('click', increaseQuantity);
            quantityInput.value = 1;
            updateQuantityButtons();
        }

        const addToCartButton = document.querySelector('.add-to-cart-button');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', handleAddToCart);

            function handleAddToCart(event) {
                event.preventDefault();
                const selectedSizes = Array.from(document.querySelectorAll('.size-checkbox:checked')).map(cb => cb.value);
                const selectedColor = document.querySelector('.color-radio:checked')?.value;
                const quantity = parseInt(quantityInput.value);

                if (!selectedColor) {
                    alert('Please select a color.');
                    return;
                }

                if (selectedSizes.length === 0) {
                    alert('Please select at least one size.');
                    return;
                }

                const basket = JSON.parse(localStorage.getItem('basket')) || [];
                const addedItems = [];

                selectedSizes.forEach(size => {
                    const existingItem = basket.find(item => item.id === product.id && item.size === size && item.color === selectedColor);
                    if (existingItem) {
                        existingItem.quantity += quantity;
                    } else {
                        const newItem = { ...product, size, color: selectedColor, quantity, enabled: true };
                        basket.push(newItem);
                        addedItems.push(newItem);
                    }
                });

                localStorage.setItem('basket', JSON.stringify(basket));
                updateBasketCount();

                const popup = document.getElementById('basket-popup');
                if (popup) {
                    popup.style.display = 'block';

                    document.getElementById('undo-add-to-basket')?.addEventListener('click', () => {
                        addedItems.forEach(item => {
                            const index = basket.findIndex(basketItem => basketItem.id === item.id && basketItem.size === item.size && basketItem.color === item.color);
                            if (index > -1) basket.splice(index, 1);
                        });
                        localStorage.setItem('basket', JSON.stringify(basket));
                        updateBasketCount();
                        popup.style.display = 'none';
                    });

                    document.getElementById('go-to-basket')?.addEventListener('click', () => {
                        window.location.href = '/basket/';
                    });

                    document.getElementById('close-popup')?.addEventListener('click', () => {
                        popup.style.display = 'none';
                    });
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity-text');
    const decreaseButton = document.querySelector('.quantity-controls button:first-child');
    const increaseButton = document.querySelector('.quantity-controls button:last-child');
    if (quantityInput && decreaseButton && increaseButton) {
        function updateQuantityButtons() {
            decreaseButton.disabled = quantityInput.value <= 1;
            increaseButton.disabled = quantityInput.value >= 10;
            decreaseButton.style.opacity = decreaseButton.disabled ? '0.5' : '1';
            increaseButton.style.opacity = increaseButton.disabled ? '0.5' : '1';
        }
        updateQuantityButtons();
    }
});
