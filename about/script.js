document.addEventListener('DOMContentLoaded', () => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketButton = document.getElementById('basket-button');
    const basketCount = basketButton.querySelector('.basket-count');

    function updateBasketButton() {
        basketCount.textContent = basket.length;
        basketButton.style.display = basket.length > 0 ? 'flex' : 'none';
    }

    basketButton.addEventListener('click', () => {
        window.location.href = '/basket/';
    });

    updateBasketButton();
});