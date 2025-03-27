fetch('../../navbar.html')
    .then(response => response.text())
    .then(data => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.innerHTML = data;
    });

const script = document.createElement('script');
script.src = '/navscript.js';
document.body.appendChild(script);

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
const product = products.find(p => p.id === productId);

if (product) {
    const productDetails = document.getElementById('product-details');
    if (productDetails) {
        productDetails.querySelector('.product-image').src = `/ProductImages/${product.name.replace(/\s+/g, '')}.webp`;
        productDetails.querySelector('.product-name').textContent = product.name;
        productDetails.querySelector('.excl-vat').textContent = `£${(product.price * 0.8).toFixed(2)}`;
        productDetails.querySelector('.price').textContent = `£${product.price.toFixed(2)} incl. VAT`;

        const addToCartButton = productDetails.querySelector('.add-to-cart-button');

        function showQuantityModal(product, callback) {
            const modal = document.createElement('div');
            modal.className = 'quantity-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Select Quantity</h3>
                    <div class="quantity-controls">
                        <button id="decrease-quantity">-</button>
                        <input type="number" id="quantity-input" value="1" min="1">
                        <button id="increase-quantity">+</button>
                    </div>
                    <button id="confirm-quantity">Confirm</button>
                </div>
            `;
            document.body.appendChild(modal);

            const quantityInput = modal.querySelector('#quantity-input');
            modal.querySelector('#decrease-quantity').addEventListener('click', () => {
                quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
            });
            modal.querySelector('#increase-quantity').addEventListener('click', () => {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            });
            modal.querySelector('#confirm-quantity').addEventListener('click', () => {
                const quantity = parseInt(quantityInput.value);
                document.body.removeChild(modal);
                callback(quantity);
            });
        }

        addToCartButton.addEventListener('click', () => {
            addToCartButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                addToCartButton.style.transform = 'scale(1)';
            }, 200); // Reset after animation

            showQuantityModal(product, quantity => {
                const basket = JSON.parse(localStorage.getItem('basket')) || [];
                const existingItem = basket.find(item => item.id === product.id);

                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    basket.push({ ...product, quantity, enabled: true });
                }

                localStorage.setItem('basket', JSON.stringify(basket));

                // Show popup
                const popup = document.createElement('div');
                popup.className = 'basket-popup';
                popup.innerHTML = `
                    <p>${product.name} added to basket.</p>
                    <button id="undo-button">Undo</button>
                    <button id="view-basket-button">View Basket</button>
                `;
                document.body.appendChild(popup);

                document.getElementById('undo-button').addEventListener('click', () => {
                    if (existingItem) {
                        existingItem.quantity -= quantity;
                        if (existingItem.quantity <= 0) {
                            basket.splice(basket.indexOf(existingItem), 1);
                        }
                    } else {
                        basket.pop();
                    }
                    localStorage.setItem('basket', JSON.stringify(basket));
                    popup.remove();
                });

                document.getElementById('view-basket-button').addEventListener('click', () => {
                    window.location.href = '/basket/';
                });

                setTimeout(() => popup.remove(), 5000); // Auto-remove after 5 seconds
            });
        });
    }
}