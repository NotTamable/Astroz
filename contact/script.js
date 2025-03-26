document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    const lastSubmitTime = localStorage.getItem('lastSubmitTime');
    const now = new Date().getTime();
    if (lastSubmitTime && now - lastSubmitTime < 24 * 60 * 60 * 1000) {
        event.preventDefault();
        alert('You can only send one message per day.');
    } else {
        localStorage.setItem('lastSubmitTime', now);
    }
});

fetch('/navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar').innerHTML = data);

const script = document.createElement('script');
script.src = '/navscript.js';
document.body.appendChild(script);

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