export class ViewObject {
    constructor(objType, position, size, dist, position2 = null, color = null, image = null) {
        this.objType = objType;
        this.position = position;
        this.position2 = position2;
        this.size = size;
        this.image = image;
        this.color = color;
        this.dist = dist;
    }

    draw(ctx) {
        if (this.objType === "surface" && this.image) {
            this.draw_image(ctx, this.position, this.size, this.image);
        } else if (this.objType === "rect" && this.color) {
            this.draw_rectangle(ctx, this.position, this.size, this.color);
        } else if (this.objType === "circle" && this.color) {
            this.draw_circle(ctx, this.position, this.size, this.color);
        } else if (this.objType === "line" && this.color) {
            this.draw_line(ctx, this.position, this.position2, this.color, this.size);
        }
    }

    draw_line(ctx, pos1, pos2, color="black", width=1) {
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // Set line cap to round for rounded corners
        ctx.beginPath();
        ctx.moveTo(pos1[0], pos1[1]);
        ctx.lineTo(pos2[0], pos2[1]);
        ctx.stroke();
    }
    draw_circle(ctx, pos, rot, color="black") {
        ctx.lineWidth = 1;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], rot, 0, Math.PI * 2);
        ctx.fill();
    }
    draw_rectangle(ctx, pos, size, color="black") {
        ctx.fillStyle = color;
        ctx.fillRect(pos[0], pos[1], size[0], size[1]);
    }
    draw_image(ctx, pos, size, img) {
        ctx.drawImage(img, pos[0], pos[1], size[0], size[1]);
    }

    toString() {
        return `Type: ${this.objType}, Distance: ${this.dist}`;
    }

    toJSON() {
        return this.toString();
    }
}
