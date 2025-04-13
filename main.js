const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const size = canvas.width;

const keys = {};

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

class Box {
    constructor() {
        this.pos = [size / 2, size / 2];
        this.speed = 5;
    }

    move() {
        if (keys["w"]) this.pos[1] -= this.speed;
        if (keys["s"]) this.pos[1] += this.speed;
        if (keys["a"]) this.pos[0] -= this.speed;
        if (keys["d"]) this.pos[0] += this.speed;
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.pos[0] - 10, this.pos[1] - 10, 20, 20);
    }
}

const box = new Box();

function gameLoop() {
    box.move();

    ctx.clearRect(0, 0, size, size);
    box.draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
