fetch('/navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar').innerHTML = data);

const basket = JSON.parse(localStorage.getItem('basket')) || [];
const basketItemsContainer = document.getElementById('basket-items');
const totalExclVatElement = document.getElementById('total-excl-vat');
const totalInclVatElement = document.getElementById('total-incl-vat');
const feeElement = document.getElementById('fee');
const grandTotalElement = document.getElementById('grand-total');

let totalExclVat = 0;
let totalInclVat = 0;

if (basket.length === 0) {
    basketItemsContainer.textContent = 'Your basket is empty.';
} else {
    basket.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - £${(item.price * 0.8).toFixed(2)} excl. VAT, £${item.price.toFixed(2)} incl. VAT`;
        basketItemsContainer.appendChild(itemDiv);

        totalExclVat += item.price * 0.8;
        totalInclVat += item.price;
    });
}

const fee = Math.ceil(totalInclVat * 0.029 + 0.3);
const grandTotal = totalInclVat + fee;

totalExclVatElement.textContent = `Total Excluding VAT: £${totalExclVat.toFixed(2)}`;
totalInclVatElement.textContent = `Total Including VAT: £${totalInclVat.toFixed(2)}`;
feeElement.textContent = `Fee: £${fee}`;
grandTotalElement.textContent = `Grand Total: £${grandTotal.toFixed(2)}`;
