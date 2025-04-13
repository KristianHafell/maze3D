const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const size = canvas.width;

const eu = Math.exp(Math.log(700) / 10);

export class View {
    constructor(model) {
        this.model = model;
    }

    draw() {
        ctx.clearRect(0, 0, size, size);

        this.draw_rays();

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

    get_height(dist) {
        return Math.pow(eu, 10 - (dist - 1));
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
    draw_rays() {
        // Draw rays cast by the player.
        const res = this.model.player.res;
        const min_fov = this.model.player.min_FOV;
        const max_fov = this.model.player.max_FOV;
        this.model.player.ray(this.model.maze.layout).forEach((wall, i) => {
            const height = this.get_height(wall[0]);
            this.draw_rectangle(
                [i * (size / res + 1), Math.floor((size - height) / 2)],
                size / res + 1,
                height,
                `rgb(0, 0, ${Math.floor(255 * (height / size))})`
            );
        });
    }
}