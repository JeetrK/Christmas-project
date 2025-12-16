document.getElementById('Switch').addEventListener('click', function() {
    window.location.href = 'GameOne.html';
});

// Load theme preference from localStorage
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'christmas';
    if (savedTheme === 'hanukkah') {
        document.body.classList.add('hanukkah');
    }
});

// Theme toggle button
document.getElementById('ThemeToggle').addEventListener('click', function() {
    document.body.classList.toggle('hanukkah');
    
    // Save theme preference
    if (document.body.classList.contains('hanukkah')) {
        localStorage.setItem('theme', 'hanukkah');
    } else {
        localStorage.setItem('theme', 'christmas');
    }
});
