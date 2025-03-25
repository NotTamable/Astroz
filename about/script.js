fetch('/navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar').innerHTML = data);

const script = document.createElement('script');
script.src = '/navscript.js';
document.body.appendChild(script);