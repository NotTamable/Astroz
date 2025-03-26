fetch('/navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar').innerHTML = data);

const basket = JSON.parse(localStorage.getItem('basket')) || [];
const emptyBasketMessage = document.getElementById('empty-basket-message');
const basketContent = document.getElementById('basket-content');
const basketTableBody = document.querySelector('#basket-items tbody');
const totalExclVatElement = document.getElementById('total-excl-vat');
const totalInclVatElement = document.getElementById('total-incl-vat');
const feeElement = document.getElementById('fee');
const grandTotalElement = document.getElementById('grand-total');

document.getElementById('go-to-products').addEventListener('click', () => {
    window.location.href = '/products/';
});

document.getElementById('clear-basket').addEventListener('click', () => {
    basket.length = 0;
    localStorage.setItem('basket', JSON.stringify(basket));
    renderBasket();
});

function renderBasket() {
    if (basket.length === 0) {
        emptyBasketMessage.style.display = 'block';
        basketContent.style.display = 'none';
        return;
    }

    emptyBasketMessage.style.display = 'none';
    basketContent.style.display = 'block';
    basketTableBody.innerHTML = '';

    let totalExclVat = 0, totalInclVat = 0;

    basket.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="color: ${item.buy ? 'green' : 'red'};">${item.name}</td>
            <td>£${(item.price * 0.8).toFixed(2)}</td>
            <td>£${item.price.toFixed(2)}</td>
            <td><button>X</button></td>
            <td style="background-color: white;">
                <img src="${item.buy ? '/images/eyesOpen.png' : '/images/eyesClosed.png'}" style="cursor: pointer; width: 20px; height: 20px; object-fit: contain;">
            </td>
        `;

        row.querySelector('button').addEventListener('click', () => {
            basket.splice(index, 1);
            localStorage.setItem('basket', JSON.stringify(basket));
            renderBasket();
        });

        row.querySelector('img').addEventListener('click', () => {
            item.buy = !item.buy;
            localStorage.setItem('basket', JSON.stringify(basket));
            renderBasket();
        });

        basketTableBody.appendChild(row);

        if (item.buy) {
            totalExclVat += item.price * 0.8;
            totalInclVat += item.price;
        }
    });

    const fee = Math.ceil(totalInclVat * 0.029 + 0.3);
    const grandTotal = totalInclVat + fee;

    totalExclVatElement.textContent = `Total Excluding VAT: £${totalExclVat.toFixed(2)}`;
    totalInclVatElement.textContent = `Total Including VAT: £${totalInclVat.toFixed(2)}`;
    feeElement.textContent = `Fee: £${fee}`;
    grandTotalElement.textContent = `Grand Total: £${grandTotal.toFixed(2)}`;
}

renderBasket();
