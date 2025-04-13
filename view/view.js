import { ViewObject } from "./view_object.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const size = canvas.width;
ctx.imageSmoothingEnabled = false;

const eu = Math.exp(Math.log(700) / 10);

export class View {
    constructor(model, images) {
        this.model = model;
        this.images = images;
    }

    draw() {
        let view_objects = []
        ctx.clearRect(0, 0, size, size);

        this.add_rays(view_objects);
        this.add_obstacles(view_objects);

        
        const p2 = [this.model.player.pos[0]*10 + Math.cos(this.model.player.rot) * 4, this.model.player.pos[1]*10 + Math.sin(this.model.player.rot) * 4]
        view_objects.push(new ViewObject("line", this.model.player.pos.map(n => n * 10), 3, 0, p2, "red", null));
        view_objects.push(new ViewObject("circle", this.model.player.pos.map(n => n * 10), 3, 0, null, "white", null));
        
        for (let i = 0; i < this.model.maze.layout.length; i++) {
            for (let j = 0; j < this.model.maze.layout[i].length; j++) {
                if (this.model.maze.layout[i][j] === 1) {
                    view_objects.push(new ViewObject("rect", [j * 10, i * 10], [10, 10], 0, null, "green", null));
                }
            }
        }

        view_objects.sort((a, b) => b.dist - a.dist);
        for (let vo of view_objects) {
            vo.draw(ctx);
        }
    }

    get_height(dist) {
        return Math.pow(eu, 10 - (dist - 1));
    }

    angle_and_dist(pos1, pos2) {
        const delta = [pos2[0] - pos1[0], pos2[1] - pos1[1]];
        const dist = Math.sqrt(delta[0] ** 2 + delta[1] ** 2);
        let angle = Math.atan2(delta[1], delta[0]);
        if (angle < 0) {
            angle += 2 * Math.PI
        }
        return [ angle, dist ]
    }

    add_rays(view_objects) {
        // Draw rays cast by the player.
        const res = this.model.player.res;
        this.model.player.ray(this.model.maze.layout).forEach((wall, i) => {
            const height = this.get_height(wall[0]);
            view_objects.push(new ViewObject("rect", [i * (size / res + 1), Math.floor((size - height) / 2)], [size / res + 1, height], wall[0], null, `rgb(0, 0, ${Math.floor(255 * (height / size))})`, null));
        });
    }

    add_obstacles(view_objects) {
        const player_pos = this.model.player.pos;
        const player_rot = this.model.player.rot;
        const fov = this.model.player.FOV;
        const pd_min = player_rot - fov / 2;

        for (const ob of Object.values(this.model.obstacles)) {
            const [ angle, dist ] = this.angle_and_dist(player_pos, ob.pos);

            for (const t of [0, 2 * Math.PI, -2 * Math.PI]) {
                const x_pos = (angle - pd_min + t) / fov * size;
                if (0 <= x_pos && x_pos <= size) {
                    const { x, y, w, h } = this.get_w(this.images[ob.name], x_pos, this.get_height(dist));
                    view_objects.push(new ViewObject("surface", [x, y], [w, h], dist, null, null, this.images[ob.name]));
                    break;
                }
            }
        }
    }
    get_w(image, x_pos, height) {
        // Compute width and height based on size and height
        const w = image.width * 0.05 * height;
        const h = image.height * 0.05 * height;

        // Compute x and y positions
        const x = x_pos - image.width * 0.05 * w / 2;
        const y = (size + height) / 2 - image.height * 0.05 * height;
        return { x, y, w, h };
    }
}