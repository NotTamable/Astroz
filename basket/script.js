fetch('/navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar').innerHTML = data);

const basket = JSON.parse(localStorage.getItem('basket')) || [];
const basketItemsContainer = document.getElementById('basket-items');
const totalExclVatElement = document.getElementById('total-excl-vat');
const totalInclVatElement = document.getElementById('total-incl-vat');
const feeElement = document.getElementById('fee');
const grandTotalElement = document.getElementById('grand-total');

function renderBasket() {
    const basketTableBody = document.querySelector('#basket-items tbody');
    basketTableBody.innerHTML = ''; // Clear existing rows
    let totalExclVat = 0;
    let totalInclVat = 0;

    basket.forEach((item, index) => {
        const row = document.createElement('tr');

        // Item name
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        // Price (Excl. VAT)
        const exclVatCell = document.createElement('td');
        exclVatCell.textContent = `£${(item.price * 0.8).toFixed(2)}`;
        row.appendChild(exclVatCell);

        // Price (Incl. VAT)
        const inclVatCell = document.createElement('td');
        inclVatCell.textContent = `£${item.price.toFixed(2)}`;
        row.appendChild(inclVatCell);

        // Toggle buy button
        const toggleCell = document.createElement('td');
        toggleCell.style.backgroundColor = 'white'; // Set background to white
        const toggleButton = document.createElement('img');
        toggleButton.src = item.buy ? '/images/eyesOpen.png' : '/images/eyesClosed.png';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.width = '20px';
        toggleButton.style.height = '20px';
        toggleButton.addEventListener('click', () => {
            item.buy = !item.buy;
            toggleButton.src = item.buy ? '/images/eyesOpen.png' : '/images/eyesClosed.png';
            localStorage.setItem('basket', JSON.stringify(basket));
            renderBasket();
        });
        toggleCell.appendChild(toggleButton);
        row.appendChild(toggleCell);

        // Remove button
        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', () => {
            basket.splice(index, 1);
            localStorage.setItem('basket', JSON.stringify(basket));
            renderBasket();
        });
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        basketTableBody.appendChild(row);

        // Update totals if the item is marked to buy
        if (item.buy !== false) {
            totalExclVat += item.price * 0.8;
            totalInclVat += item.price;
        }
    });

    // Update totals
    const fee = Math.ceil(totalInclVat * 0.029 + 0.3);
    const grandTotal = totalInclVat + fee;

    totalExclVatElement.textContent = `Total Excluding VAT: £${totalExclVat.toFixed(2)}`;
    totalInclVatElement.textContent = `Total Including VAT: £${totalInclVat.toFixed(2)}`;
    feeElement.textContent = `Fee: £${fee}`;
    grandTotalElement.textContent = `Grand Total: £${grandTotal.toFixed(2)}`;
}

// Clear basket functionality
document.getElementById('clear-basket').addEventListener('click', () => {
    basket.length = 0; // Clear the basket array
    localStorage.setItem('basket', JSON.stringify(basket));
    renderBasket();
});

renderBasket(); // Initial render
