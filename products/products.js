const products = [
    { name: "Astroz Hoodie - Green", price: "£10" },
    { name: "Product2", price: "£20" },
    { name: "Product3", price: "£30" }
];

document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.getElementById("products-container");
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        const productImage = document.createElement("img");
        productImage.src = `/ProductImages/${product.name.replace(/\s+/g, '')}.webp`;
        productImage.alt = product.name;

        const productName = document.createElement("h3");
        productName.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.textContent = product.price;

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);

        productsContainer.appendChild(productDiv);
    });
});
