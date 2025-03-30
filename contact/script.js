document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    const lastSubmitDate = localStorage.getItem('lastSubmitDate');
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    if (lastSubmitDate === today) {
        event.preventDefault();
        alert('You can only send one message per day.');
    } else {
        localStorage.setItem('lastSubmitDate', today);
    }
});
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