fetch('../../navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar').innerHTML = data);

const script = document.createElement('script');
script.src = '/navscript.js';
document.body.appendChild(script);

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
const product = products.find(p => p.id === productId);

if (product) {
    const productDetails = document.getElementById('product-details');
    productDetails.querySelector('.product-image').src = `/ProductImages/${product.name.replace(/\s+/g, '')}.webp`;
    productDetails.querySelector('.product-name').textContent = product.name;
    productDetails.querySelector('.excl-vat').textContent = `£${(product.price * 0.8).toFixed(2)}`;
    productDetails.querySelector('.price').textContent = `£${product.price.toFixed(2)} incl. VAT`;
}

const basket = JSON.parse(localStorage.getItem('basket')) || [];
const addToCartButton = document.querySelector('.add-to-cart-button');
const basketButton = document.getElementById('basket-button');
const basketCount = basketButton.querySelector('.basket-count');

function updateBasketButton() {
    basketCount.textContent = basket.length;
    basketButton.style.display = basket.length > 0 ? 'flex' : 'none';
}

basketButton.addEventListener('click', () => {
    window.location.href = '/basket/';
});

addToCartButton?.addEventListener('click', () => {
    if (product) {
        const existingProduct = basket.find(p => p.id === product.id);
        if (!existingProduct) {
            product.buy = true;
            basket.push(product);
            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasketButton();
            showPopup();
        }
    }
});

const popup = document.createElement('div');
popup.id = 'basket-popup';
popup.style.display = 'none';
popup.style.position = 'fixed';
popup.style.top = '10px';
popup.style.left = '50%';
popup.style.transform = 'translateX(-50%)';
popup.style.backgroundColor = '#37ff00';
popup.style.color = 'black';
popup.style.padding = '10px 20px';
popup.style.borderRadius = '5px';
popup.style.zIndex = '1000';
popup.textContent = 'Item added to basket!';
document.body.appendChild(popup);

function showPopup() {
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 2000);
}

updateBasketButton();