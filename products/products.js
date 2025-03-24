const products = [
    { id: 1, name: "Astroz Hoodie - Green", price: 10 },
    { id: 2, name: "Product2", price: 20 },
    { id: 3, name: "Product3", price: 30 }
];

document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.getElementById("products-container");
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.dataset.id = product.id;

        const productImage = document.createElement("img");
        productImage.src = `/ProductImages/${product.name.replace(/\s+/g, '')}.webp`;
        productImage.alt = product.name;

        const productName = document.createElement("h3");
        productName.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.className = "price";
        const displayedPrice = (product.price * 0.8).toFixed(2); // 20% less
        productPrice.textContent = `£${displayedPrice}`;

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);

        productDiv.addEventListener("click", function() {
            window.location.href = `product.html?id=${product.id}`;
        });

        productsContainer.appendChild(productDiv);
    });
});
