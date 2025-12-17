let winCount = 0;
let moving = true;
let direction = 1;
let speed = 5;
let position = 0;

/* ---------- HIGH SCORES ---------- */

// Load score.json ONCE if localStorage empty
async function loadHighScores() {
    if (!localStorage.getItem('highScores')) {
        try {
            const res = await fetch('score.json');
            const data = await res.json();
            localStorage.setItem('highScores', JSON.stringify(data));
        } catch {
            localStorage.setItem('highScores', JSON.stringify([]));
        }
    }
}
loadHighScores();

function saveHighScore(initials, score) {
    let scores = JSON.parse(localStorage.getItem('highScores'));
    scores.push({ initials, score });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(scores));
}

function showHighScores() {
    initialsScreen.style.display = 'none';
    highScoresScreen.style.display = 'flex';
    highScoresList.innerHTML = '';

    const scores = JSON.parse(localStorage.getItem('highScores'));
    scores.forEach((s, i) => {
        const div = document.createElement('div');
        div.textContent = `${i + 1}. ${s.initials} - ${s.score}`;
        highScoresList.appendChild(div);
    });
}

/* ---------- DOM ---------- */

const mover = document.getElementById('mover');
const target = document.getElementById('target');
const gameArea = document.getElementById('gameArea');
const winDisplay = document.getElementById('winCount');
const message = document.getElementById('message');

const initialsScreen = document.getElementById('initialsScreen');
const initialsInput = document.getElementById('initialsInput');
const submitInitials = document.getElementById('submitInitials');

const highScoresScreen = document.getElementById('highScoresScreen');
const highScoresList = document.getElementById('highScoresList');
const restartAfterScores = document.getElementById('restartAfterScores');
const homeAfterScores = document.getElementById('homeAfterScores');

/* ---------- GAME LOOP ---------- */

function move() {
    if (moving) {
        position += direction * speed;

        if (position <= 0) direction = 1;
        if (position >= gameArea.clientWidth - mover.clientWidth) direction = -1;

        mover.style.left = position + 'px';
    }
    requestAnimationFrame(move);
}
move();

document.addEventListener('keydown', e => {
    if (e.code === 'Space' && moving) {
        moving = false;
        checkCollision();
    }
});

function checkCollision() {
    const m = mover.getBoundingClientRect();
    const t = target.getBoundingClientRect();

    if (m.left < t.right && m.right > t.left) {
        winCount++;
        speed += 2;
        winDisplay.textContent = `Wins: ${winCount}`;
        moving = true;
    } else {
        message.textContent = 'You Lose!';
        initialsScreen.style.display = 'flex';
    }
}

/* ---------- INITIALS ---------- */

submitInitials.addEventListener('click', () => {
    const initials = initialsInput.value.toUpperCase();
    if (initials.length !== 3) {
        alert('Enter exactly 3 initials');
        return;
    }
    saveHighScore(initials, winCount);
    showHighScores();
});

/* ---------- RESTART / HOME ---------- */

function restartGame() {
    winCount = 0;
    speed = 5;
    position = 0;
    direction = 1;
    moving = true;

    winDisplay.textContent = 'Wins: 0';
    message.textContent = '';
    initialsScreen.style.display = 'none';
    highScoresScreen.style.display = 'none';
}

restartAfterScores.onclick = restartGame;
homeAfterScores.onclick = () => location.href = 'index.html';
