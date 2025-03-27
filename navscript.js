function openModal(modalid) {
    document.getElementById(modalid).style.display = 'block';
}
function closeModal(modalid) {
    document.getElementById(modalid).style.display = 'none';
}

function updateBasketCount() {
    alert("updateBasketCount() called"); // Debug log
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    alert("Basket contents:", basket); // Debug log
    const basketCount = document.getElementById('basket-count');
    if (basketCount) {
        const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
        basketCount.textContent = totalItems;
        alert("Basket count updated to:", totalItems); // Debug log
    } else {
        console.error("Basket count element not found"); // Debug log
    }
}

document.addEventListener('DOMContentLoaded', () => {
    alert("DOMContentLoaded event fired"); // Debug log
    updateBasketCount();
});