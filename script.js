// Constants and variables
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

const DAY_COLOR = "#FFFFFF";
const DAY_BALL_COLOR = "#000000";
const NIGHT_COLOR = "#000000";
const NIGHT_BALL_COLOR = "#FFFFFF";
const SQUARE_SIZE = 30;
const MAX_SPEED = 10; // Define the maximum speed

const numSquaresX = canvas.width / SQUARE_SIZE;
const numSquaresY = canvas.height / SQUARE_SIZE;

let dayScore = 0;
let nightScore = 0;

const squares = [];

// Initialize the squares
for (let i = 0; i < numSquaresX; i++) {
    squares[i] = [];
    for (let j = 0; j < numSquaresY; j++) {
        squares[i][j] = i < numSquaresX / 2 ? DAY_COLOR : NIGHT_COLOR;
    }
}

// Function to draw the squares
function drawSquares() {
    for (let i = 0; i < numSquaresX; i++) {
        for (let j = 0; j < numSquaresY; j++) {
            ctx.fillStyle = squares[i][j];
            ctx.fillRect(i * SQUARE_SIZE, j * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        }
    }
}

const balls = [
    {
        x: canvas.width / 4,
        y: canvas.height / 2,
        dx: 8, // Initial horizontal velocity
        dy: -8, // Initial vertical velocity
        ballColor: DAY_BALL_COLOR
    },
    {
        x: (canvas.width / 4) * 3,
        y: canvas.height / 2,
        dx: -8, // Initial horizontal velocity
        dy: 8, // Initial vertical velocity
        ballColor: NIGHT_BALL_COLOR
    }
];

// Function to draw a ball
function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, SQUARE_SIZE / 2, 0, Math.PI * 2, false);
    ctx.fillStyle = ball.ballColor;
    ctx.fill();
    ctx.closePath();
}

// Function to check collision with squares and handle changes
function checkSquareCollision(ball) {
    const ballX = Math.floor(ball.x / SQUARE_SIZE);
    const ballY = Math.floor(ball.y / SQUARE_SIZE);

    if (ball.ballColor === DAY_BALL_COLOR && squares[ballX][ballY] === NIGHT_COLOR) {
        squares[ballX][ballY] = DAY_COLOR; // Turn white square to white
        ball.dx = -ball.dx; // Reverse horizontal velocity
        ball.dy = -ball.dy; // Reverse vertical velocity
    } else if (ball.ballColor === NIGHT_BALL_COLOR && squares[ballX][ballY] === DAY_COLOR) {
        squares[ballX][ballY] = NIGHT_COLOR; // Turn black square to black
        ball.dx = -ball.dx; // Reverse horizontal velocity
        ball.dy = -ball.dy; // Reverse vertical velocity
    }
}

// Function to add randomness to the ball's movement
function addRandomness(ball) {
    // Add random values to dx and dy
    ball.dx += Math.random() * 0.2 - 0.1; // Adjust the range for randomness as needed
    ball.dy += Math.random() * 0.2 - 0.1;

    // Limit the speed of the ball
    ball.dx = Math.min(Math.max(ball.dx, -MAX_SPEED), MAX_SPEED);
    ball.dy = Math.min(Math.max(ball.dy, -MAX_SPEED), MAX_SPEED);
}

// Main draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawSquares(); // Draw squares

    // Draw and update balls
    balls.forEach(ball => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Check for collision with walls
        if (ball.x + ball.dx > canvas.width - SQUARE_SIZE / 2 || ball.x + ball.dx < SQUARE_SIZE / 2) {
            ball.dx = -ball.dx; // Reverse horizontal velocity
        }
        if (ball.y + ball.dy > canvas.height - SQUARE_SIZE / 2 || ball.y + ball.dy < SQUARE_SIZE / 2) {
            ball.dy = -ball.dy; // Reverse vertical velocity
        }

        // Check for collision with squares
        checkSquareCollision(ball);

        // Add randomness to the ball's movement
        addRandomness(ball);

        drawBall(ball); // Draw the ball
    });

    // Request animation frame to continuously update the canvas
    requestAnimationFrame(draw);
}

// Start the drawing loop
draw();
