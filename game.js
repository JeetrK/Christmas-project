// Game variables
let winCount = 0;
let moving = true;
let direction = 1; // 1 for right, -1 for left
let speed = 5;
let position = 0; // current left position of the mover

// Get DOM elements
const mover = document.getElementById('mover');
const target = document.getElementById('target');
const gameArea = document.getElementById('gameArea');
const winDisplay = document.getElementById('winCount');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const restartHint = document.getElementById('restartHint');
const winButtons = document.getElementById('winButtons');
const homeBtn = document.getElementById('homeBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Function to move the object
function move() {
    if (moving) {
        // Update position
        position += direction * speed;

        // Check for bouncing off edges
        if (position <= 0) {
            position = 0;
            direction = 1; // go right
        } else if (position >= gameArea.clientWidth - mover.clientWidth) {
            position = gameArea.clientWidth - mover.clientWidth;
            direction = -1; // go left
        }

        // Update mover position
        mover.style.left = position + 'px';
    }

    // Continue animation
    requestAnimationFrame(move);
}

// Start the movement
move();

// Listen for space bar to stop
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && moving) {
        moving = false;
        checkCollision();
    }
});

// Function to check if mover overlaps with target
function checkCollision() {
    const moverRect = mover.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Check for horizontal overlap (since they are at same height)
    const overlap = moverRect.left < targetRect.right && moverRect.right > targetRect.left;

    if (overlap) {
        // Win
        winCount++;
        speed += 6; // Increase speed after each win
        winDisplay.textContent = 'Wins: ' + winCount;

        if (winCount >= 8) {
            message.textContent = 'You Win!';
            winButtons.style.display = 'block';
            moving = false; // Stop the game
        } else {
            // Continue moving for next attempt
            moving = true;
        }
    } else {
        // Lose
        message.textContent = 'You Lose!';
        restartBtn.style.display = 'block';
        restartHint.style.display = 'block';
        moving = false;
    }
}

// Restart function
function restartGame() {
    winCount = 0;
    speed = 5; // Reset speed
    winDisplay.textContent = 'Wins: 0';
    message.textContent = '';
    restartBtn.style.display = 'none';
    restartHint.style.display = 'none';
    winButtons.style.display = 'none';
    moving = true;
    position = 0;
    direction = 1;
}

// Restart button event
restartBtn.addEventListener('click', restartGame);

// Home button event
homeBtn.addEventListener('click', function() {
    window.location.href = 'index.html';
});

// Play Again button event
playAgainBtn.addEventListener('click', restartGame);

// Listen for Ctrl key to restart when lose screen is shown
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && restartBtn.style.display === 'block') {
        restartGame();
    }
});