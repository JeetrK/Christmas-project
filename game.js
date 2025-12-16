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
        speed += 2; // Increase speed after each win
        winDisplay.textContent = 'Wins: ' + winCount;

        if (winCount >= 8) {
            message.textContent = 'You Win!';
            moving = false; // Stop the game
        } else {
            // Continue moving for next attempt
            moving = true;
        }
    } else {
        // Lose
        message.textContent = 'You Lose!';
        restartBtn.style.display = 'block';
        moving = false;
    }
}

// Restart button event
restartBtn.addEventListener('click', function() {
    winCount = 0;
    speed = 5; // Reset speed
    winDisplay.textContent = 'Wins: 0';
    message.textContent = '';
    restartBtn.style.display = 'none';
    moving = true;
    position = 0;
    direction = 1;
});