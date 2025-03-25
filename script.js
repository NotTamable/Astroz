document.getElementById('close-top-bar')?.addEventListener('click', function() {
    document.getElementById('top-bar').style.display = 'none';
});

fetch('/navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar').innerHTML = data);

document.getElementById('search-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    window.location.href = `/products/index.html?search=${encodeURIComponent(query)}`;
});

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