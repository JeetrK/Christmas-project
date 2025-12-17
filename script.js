// Play button
document.getElementById('Switch').addEventListener('click', function() {
    document.body.classList.add('explode');
    setTimeout(() => {
        if (document.body.classList.contains('hanukkah')) {
            window.location.href = 'GameTwo.html';
        } else {
            // Check if Unlimited mode is active
            if (window.unlimitedMode) {
                window.location.href = 'unlimited.html';
            } else {
                window.location.href = 'GameOne.html';
            }
        }
    }, 1000);
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
    
    // Spin the page
    document.body.classList.add('spin');
    setTimeout(() => {
        document.body.classList.remove('spin');
    }, 1000);
});

// Unlimited button logic
window.unlimitedMode = false; // global flag for Unlimited mode
const unlimitedBtn = document.getElementById('UnlimitedBtn');
unlimitedBtn.addEventListener('click', function() {

    // Redirect to unlimited.html
    window.location.href = 'unlimited.html';
});
