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