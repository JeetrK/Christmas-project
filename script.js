document.getElementById('Switch').addEventListener('click', function() {
    if (document.body.classList.contains('hanukkah')) {
        window.location.href = 'GameTwo.html';
    } else {
        window.location.href = 'GameOne.html';
    }
});

// Load theme preference from localStorage
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'christmas';
    if (savedTheme === 'hanukkah') {
        document.body.classList.add('hanukkah');
        updatePageTitle();
    }
});

// Update page title based on theme
function updatePageTitle() {
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        if (document.body.classList.contains('hanukkah')) {
            pageTitle.textContent = 'Manora Lighting Game';
        } else {
            pageTitle.textContent = 'Tree Decorating Game';
        }
    }
}

// Theme toggle button
document.getElementById('ThemeToggle').addEventListener('click', function() {
    document.body.classList.toggle('hanukkah');
    updatePageTitle();
    
    // Save theme preference
    if (document.body.classList.contains('hanukkah')) {
        localStorage.setItem('theme', 'hanukkah');
    } else {
        localStorage.setItem('theme', 'christmas');
    }
});
