window.products = [
    { id: 1, name: "Astroz Hoodie - Default", price: 10, sizes: ['3-4', '4-5', '5-6', '6-7', '7-8'] },
    { id: 2, name: "Product2", price: 20, sizes: ['S', 'M', 'L', 'XL'] },
    { id: 3, name: "Product3", price: 30, sizes: ['One Size'] }
];

document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.getElementById("products-container");
    if (!productsContainer) {
        console.error("Error: #products-container not found.");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const filteredProducts = searchQuery ? window.products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : window.products;

    productsContainer.innerHTML = '';
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.dataset.id = product.id;

        const productNameSlug = product.name.replace(/\s+/g, '');

        const productImage = document.createElement("img");
        productImage.src = `/ProductImages/${productNameSlug}/${productNameSlug}--front.webp`;
        productImage.alt = product.name;

        const productName = document.createElement("h3");
        productName.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.className = "price";
        productPrice.textContent = `£${product.price.toFixed(2)}`;

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);

        productDiv.addEventListener("click", function() {
            window.location.href = `product/index.html?id=${product.id}`;
        });

        productsContainer.appendChild(productDiv);
    });
});
