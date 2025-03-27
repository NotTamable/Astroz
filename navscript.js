function openModal(modalid) {
    document.getElementById(modalid).style.display = 'block';
}
function closeModal(modalid) {
    document.getElementById(modalid).style.display = 'none';
}

function updateBasketCount() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketCount = document.getElementById('basket-count');
    if (basketCount) {
        basketCount.textContent = basket.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateBasketCount();
});