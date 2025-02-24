const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Rename Ball to Star
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

// Create stars instead of balls
const stars = [
    new Star(100, 100, 20, 'green'),
    new Star(200, 200, 20, 'yellow'),
    new Star(300, 300, 20, 'red'),
    new Star(400, 400, 20, 'blue'),
    new Star(500, 300, 20, 'purple'),
    new Star(150, 450, 20, 'pink')
];

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
    });

    requestAnimationFrame(animate);
}

// Start animation
animate(); 