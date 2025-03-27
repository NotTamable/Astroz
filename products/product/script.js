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
        addToCartButton.addEventListener('click', () => {
            const basket = JSON.parse(localStorage.getItem('basket')) || [];
            basket.push(product);
            localStorage.setItem('basket', JSON.stringify(basket));
            alert(`${product.name} has been added to your basket.`);
        });
    }
}