document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('close-top-bar')?.addEventListener('click', function() {
        document.getElementById('top-bar').style.display = 'none';
    });

    document.querySelectorAll('img').forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto'; // Ensure images are responsive
    });
});