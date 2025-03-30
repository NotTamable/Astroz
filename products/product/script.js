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

        const colorOptions = ['Red', 'Blue', 'Green', 'Black'];
        colorOptions.forEach((color) => {
            const colorLabel = document.createElement('label');
            colorLabel.textContent = color;
            colorLabel.htmlFor = `color-${color}`; // Ensure proper association
            colorLabel.style.display = 'block';

            const colorRadio = document.createElement('input');
            colorRadio.type = 'radio';
            colorRadio.name = 'color';
            colorRadio.value = color;
            colorRadio.id = `color-${color}`; // Match the id with the label's for attribute
            colorRadio.className = 'color-radio';

            colorContainer.appendChild(colorRadio);
            colorContainer.appendChild(colorLabel);
        });

        const quantityInput = document.getElementById('quantity-text');
        const decreaseButton = document.querySelector('.quantity-controls button:first-child');
        const increaseButton = document.querySelector('.quantity-controls button:last-child');

        function updateQuantityButtons() {
            decreaseButton.disabled = quantityInput.value <= 1;
            increaseButton.disabled = quantityInput.value >= 10;

            decreaseButton.style.opacity = decreaseButton.disabled ? '0.5' : '1';
            increaseButton.style.opacity = increaseButton.disabled ? '0.5' : '1';
        }

        decreaseButton.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateQuantityButtons();
            }
        });

        increaseButton.addEventListener('click', () => {
            if (quantityInput.value < 10) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
                updateQuantityButtons();
            }
        });

        quantityInput.value = 1;
        updateQuantityButtons();

        const addToCartButton = productDetails.querySelector('.add-to-cart-button');

        addToCartButton.addEventListener('click', () => {
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

            // Show popup
            const popup = document.getElementById('basket-popup');
            popup.style.display = 'block';

            // Undo button functionality
            document.getElementById('undo-add-to-basket').onclick = () => {
                addedItems.forEach(item => {
                    const index = basket.findIndex(basketItem => basketItem.id === item.id && basketItem.size === item.size && basketItem.color === item.color);
                    if (index > -1) basket.splice(index, 1);
                });
                localStorage.setItem('basket', JSON.stringify(basket));
                updateBasketCount();
                popup.style.display = 'none';
            };

            // Go to basket button functionality
            document.getElementById('go-to-basket').onclick = () => {
                window.location.href = '/basket/';
            };

            // Close popup button functionality
            document.getElementById('close-popup').onclick = () => {
                popup.style.display = 'none';
            };
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateQuantityButtons();
});