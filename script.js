const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size dynamically based on window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust star size based on canvas size
const starSize = Math.min(canvas.width, canvas.height) / 30; // Example: stars will be 1/30th of the smaller dimension

// Star
class Star {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = (Math.random() - 0.5) * 8; // Random horizontal velocity
        this.dy = (Math.random() - 0.5) * 8; // Random vertical velocity
    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.PI / 2);

        // Draw a 5-pointed star
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(0, -this.radius);
            ctx.rotate(Math.PI * 2 / 5);
            ctx.lineTo(0, -this.radius / 2);
            ctx.rotate(Math.PI * 2 / 5);
        }

        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        // Bounce off walls
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // Update position
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

// Create stars with dynamic size
const stars = [
    new Star(100, 100, starSize, 'green'),
    new Star(200, 200, starSize, 'yellow'),
    new Star(300, 300, starSize, 'red'),
    new Star(400, 400, starSize, 'blue'),
    new Star(500, 300, starSize, 'purple'),
    new Star(150, 450, starSize, 'pink')
];

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
    });

    // Check for collisions between stars
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            if (isColliding(stars[i], stars[j])) {
                resolveCollision(stars[i], stars[j]);
            }
        }
    }

    requestAnimationFrame(animate);
}

// Start animation
animate();

// Function to check if two stars are colliding
function isColliding(star1, star2) {
    const dx = star1.x - star2.x;
    const dy = star1.y - star2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (star1.radius + star2.radius);
}

// Function to resolve the collision between two stars
function resolveCollision(star1, star2) {
    const dx = star1.x - star2.x;
    const dy = star1.y - star2.y;
    const angle = Math.atan2(dy, dx);
    
    const speed1 = Math.sqrt(star1.dx * star1.dx + star1.dy * star1.dy);
    const speed2 = Math.sqrt(star2.dx * star2.dx + star2.dy * star2.dy);
    
    const direction1 = Math.atan2(star1.dy, star1.dx);
    const direction2 = Math.atan2(star2.dy, star2.dx);
    
    const newVx1 = speed1 * Math.cos(direction1 - angle);
    const newVy1 = speed1 * Math.sin(direction1 - angle);
    const newVx2 = speed2 * Math.cos(direction2 - angle);
    const newVy2 = speed2 * Math.sin(direction2 - angle);
    
    // Swap velocities
    star1.dx = newVx2 * Math.cos(angle) - newVy1 * Math.sin(angle);
    star1.dy = newVy2 * Math.cos(angle) + newVx1 * Math.sin(angle);
    star2.dx = newVx1 * Math.cos(angle) - newVy2 * Math.sin(angle);
    star2.dy = newVy1 * Math.cos(angle) + newVx2 * Math.sin(angle);
}

// Update canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}); 
