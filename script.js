document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('close-top-bar')?.addEventListener('click', function() {
        document.getElementById('top-bar').style.display = 'none';
    });

    document.getElementById('search-form')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-input')?.value.trim().toLowerCase();
        if (query) {
            window.location.href = `/products/index.html?search=${encodeURIComponent(query)}`;
        }
    });
});