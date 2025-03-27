document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('close-top-bar')?.addEventListener('click', function() {
        document.getElementById('top-bar').style.display = 'none';
    });

    fetch('/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbar = document.getElementById('navbar');
            if (navbar) navbar.innerHTML = data;
        });

    const script = document.createElement('script');
    script.src = '/navscript.js';
    document.body.appendChild(script);

    document.getElementById('search-form')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-input')?.value.trim().toLowerCase();
        if (query) {
            window.location.href = `/products/index.html?search=${encodeURIComponent(query)}`;
        }
    });
});