const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const size = canvas.width;

const keys = {};
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

class Controller {
    constructor(model) {
        this.model = model;
    }

    handleInput() {
        if (keys["w"]) {
            this.model.player_move(true);
        }
        if (keys["s"]) {
            this.model.player_move(false);
        }
        if (keys["a"]) {
            this.model.player_move(false, true);
        }
        if (keys["d"]) {
            this.model.player_move(true, true);
        }
        if (keys["q"]) {
            this.model.player.rotate(false);
        }
        if (keys["e"]) {
            this.model.player.rotate(true);
        }
    }
}

class Model {
    constructor() {
        this.player = new Player([100, 100])
    }

    player_move(forward=true, side=false){
        console.log('this.player.rot:', this.player.rot);
        const direction = this.player.rot + Math.PI / 2 * side;
        console.log('direction:', direction);
        console.log('this.player.speed:', this.player.speed);
        console.log('forward:', forward);
        const delta = [
            Math.cos(direction) * this.player.speed * (forward ? 1 : -1),
            Math.sin(direction) * this.player.speed * (forward ? 1 : -1)
        ];
        console.log(delta);

        const new_pos = [
            this.player.pos[0] + delta[0],
            this.player.pos[1] + delta[1]
        ];

        this.player.change_pos(new_pos);
        
    }
}
    
class Player {
    constructor(pos, rot=0) {
        this.pos = pos
        this.speed = 1
        this.rot = rot
        this.rot_speed = Math.PI / 70
    }

    change_pos(new_pos) {
        this.pos = new_pos
    }

    rotate(right=true) {    
        console.log(this.rot, this.rot_speed, Math.PI);
        this.rot = this.rot + this.rot_speed * (right ? 1 : -1);
        console.log(this.rot);
    }

}

class View {
    constructor(model) {
        this.model = model;
    }

    draw() {
        ctx.clearRect(0, 0, size, size);

        const p2 = [model.player.pos[0] + Math.cos(model.player.rot) * 10, model.player.pos[1] + Math.sin(model.player.rot) * 10]
        this.draw_line(model.player.pos, p2, "red", 10);

        this.draw_circle(model.player.pos, 10, "blue");
    }

    draw_line(p1, p2, color="black", width=1) {
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // Set line cap to round for rounded corners
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
    }
    draw_circle(p, r, color="black") {
        ctx.lineWidth = 1;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
        ctx.fill();
    }
}

const model = new Model();
const controller = new Controller(model);
const view = new View(model);

function gameLoop() {   
    controller.handleInput();
    
    view.draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
