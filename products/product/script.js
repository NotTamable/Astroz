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
    const productImage = productDetails.querySelector('.product-image');
    productImage.src = `/ProductImages/${product.name.replace(/\s+/g, '')}.webp`;
    productImage.alt = product.name;

    const productName = productDetails.querySelector('.product-name');
    productName.textContent = product.name;

    const priceContainer = productDetails.querySelector('.price-container');

    const productPriceExclVAT = priceContainer.querySelector('.excl-vat');
    productPriceExclVAT.textContent = `£${(product.price * 0.8).toFixed(2)}`;

    const productPriceInclVAT = priceContainer.querySelector('.price');
    productPriceInclVAT.textContent = `£${product.price.toFixed(2)}incl. VAT`;
}

const exclVatPrice = document.querySelector('.excl-vat');
const exclVatFixed = document.createElement('p');
exclVatFixed.className = 'excl-vat-fixed';
exclVatFixed.textContent = exclVatPrice.textContent;
document.body.appendChild(exclVatFixed);

function toggleFixedExclVat() {
    const rect = exclVatPrice.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
        exclVatFixed.style.display = 'none'; // Hide fixed price when original is visible
    } else {
        exclVatFixed.style.display = 'block'; // Show fixed price when original is not visible
    }
}

window.addEventListener('scroll', toggleFixedExclVat);
toggleFixedExclVat(); // Initial check

let basket = JSON.parse(localStorage.getItem('basket')) || [];

const addToCartButton = document.querySelector('.add-to-cart-button');
if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
        if (product) {
            product.buy = true; // Default to "buy" when added
            basket.push(product); // Add the current product to the basket
            localStorage.setItem('basket', JSON.stringify(basket)); // Save the basket to localStorage
            updateBasketButton(); // Update the basket button visibility
            showPopup(); // Show popup instead of alert
        }
    });
}

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
    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000);
}

const basketButton = document.createElement('button');
basketButton.className = 'basket-button';
const basketIcon = document.createElement('img');
basketIcon.src = '/images/cartIcon.png';
basketIcon.alt = 'Cart Icon';
basketButton.appendChild(basketIcon);
const basketCount = document.createElement('span');
basketButton.appendChild(basketCount);
function updateBasketButton() {
    if (basket.length > 0) {
        basketButton.style.display = 'block'; // Show the basket button
        basketButton.textContent = `View Basket (${basket.length})`; // Update item count
    } else {
        basketButton.style.display = 'none'; // Hide the basket button
    }
}

updateBasketButton(); // Initial check to set basket button visibility