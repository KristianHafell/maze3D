
export class Maze {
    constructor(layout) {
        this.layout = layout;
    }

    hit(pos) {
        return this.layout[Math.floor(pos[1])][Math.floor(pos[0])] === 1;
    }
}