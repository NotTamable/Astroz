const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
const product = products.find(p => p.id === productId);

if (product) {
    const productDetails = document.getElementById('product-details');
    if (productDetails) {
        productDetails.querySelector('.product-image').src = `/ProductImages/${product.name.replace(/\s+/g, '')}/${product.name.replace(/\s+/g, '')}--front.webp`;
        productDetails.querySelector('.product-name').textContent = product.name;
        productDetails.querySelector('.excl-vat').textContent = `£${(product.price * 0.8).toFixed(2)}`;
        productDetails.querySelector('.price').textContent = `£${product.price.toFixed(2)} incl. VAT`;

        const sizeOptions = ['3-4', '4-5', '5-6', '6-7', '7-8'];
        const colorOptions = ['Red', 'Blue', 'Green', 'Black'];

        const sizeContainer = document.getElementById('size-options');
        const colorContainer = document.getElementById('color-options');

        sizeOptions.forEach(size => {
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

        colorOptions.forEach(color => {
            const colorRadio = document.createElement('input');
            colorRadio.type = 'radio';
            colorRadio.name = 'color';
            colorRadio.value = color;
            colorRadio.id = `color-${color}`;
            colorRadio.className = 'color-radio';

            const colorLabel = document.createElement('label');
            colorLabel.htmlFor = `color-${color}`;
            colorLabel.textContent = color;

            colorContainer.appendChild(colorRadio);
            colorContainer.appendChild(colorLabel);
        });

        const addToCartButton = productDetails.querySelector('.add-to-cart-button');

        addToCartButton.addEventListener('click', () => {
            const selectedSizes = Array.from(document.querySelectorAll('.size-checkbox:checked')).map(cb => cb.value);
            const selectedColor = document.querySelector('.color-radio:checked')?.value;

            if (!selectedColor) {
                alert('Please select a color.');
                return;
            }

            if (selectedSizes.length === 0) {
                alert('Please select at least one size.');
                return;
            }

            const basket = JSON.parse(localStorage.getItem('basket')) || [];

            selectedSizes.forEach(size => {
                const existingItem = basket.find(item => item.id === product.id && item.size === size && item.color === selectedColor);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    basket.push({ ...product, size, color: selectedColor, quantity: 1, enabled: true });
                }
            });

            localStorage.setItem('basket', JSON.stringify(basket));
            alert('Items added to basket.');
        });
    }
}