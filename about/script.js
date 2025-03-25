fetch('/navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar').innerHTML = data);
    document.appendChild(document.createElement('script')).src = '/navscript.js';