const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const size = canvas.width;

export class View {
    constructor(model) {
        this.model = model;
    }

    draw() {
        ctx.clearRect(0, 0, size, size);

        const p2 = [this.model.player.pos[0]*10 + Math.cos(this.model.player.rot) * 4, this.model.player.pos[1]*10 + Math.sin(this.model.player.rot) * 4]
        this.draw_line(this.model.player.pos.map(n => n * 10), p2, "red", 3);

        this.draw_circle(this.model.player.pos.map(n => n * 10), 3, "white");
        
        for (let i = 0; i < this.model.maze.layout.length; i++) {
            for (let j = 0; j < this.model.maze.layout[i].length; j++) {
                if (this.model.maze.layout[i][j] === 1) {
                    this.draw_rectangle([j * 10, i * 10], 10, 10, "green");
                }
            }
        }
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
    draw_rectangle(p, w, h, color="black") {
        ctx.fillStyle = color;
        ctx.fillRect(p[0], p[1], w, h);
    }
}