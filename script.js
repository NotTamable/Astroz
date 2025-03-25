document.getElementById('close-top-bar')?.addEventListener('click', function() {
    document.getElementById('top-bar').style.display = 'none';
});
fetch('/navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar').innerHTML = data);
document.appendChild(document.createElement('script')).src = '/navscript.js';
document.getElementById('search-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    window.location.href = `/products/index.html?search=${encodeURIComponent(query)}`;
});