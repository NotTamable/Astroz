document.addEventListener('DOMContentLoaded', () => {
    fetch('/navbar.html')
        .then(response => response.text())
        .then(data => document.getElementById('navbar').innerHTML = data);

    const script = document.createElement('script');
    script.src = '/navscript.js';
    document.body.appendChild(script);

    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketButton = document.getElementById('basket-button');
    const basketCount = basketButton?.querySelector('.basket-count');

    function updateBasketButton() {
        if (basketCount) {
            basketCount.textContent = basket.length;
            basketButton.style.display = basket.length > 0 ? 'flex' : 'none';
        }
    }

    basketButton?.addEventListener('click', () => {
        window.location.href = '/basket/';
    });

    updateBasketButton();
});