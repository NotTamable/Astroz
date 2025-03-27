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
        const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
        basketCount.textContent = totalItems;
        alert(totalItems)
    }
}
document.addEventListener('DOMContentLoaded', () => {
    alert("hi111")
    updateBasketCount();
    alert("hi")
});