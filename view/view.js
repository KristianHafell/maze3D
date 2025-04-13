const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const size = canvas.width;

export class View {
    constructor(model) {
        this.model = model;
    }

    draw() {
        ctx.clearRect(0, 0, size, size);

        const p2 = [this.model.player.pos[0] + Math.cos(this.model.player.rot) * 10, this.model.player.pos[1] + Math.sin(this.model.player.rot) * 10]
        this.draw_line(this.model.player.pos, p2, "red", 10);

        this.draw_circle(this.model.player.pos, 10, "blue");
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