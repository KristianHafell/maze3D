import { Player } from './obstacle/player.js';
import { Maze } from './obstacle/maze.js';

export class Model {
    constructor() {
        this.player = new Player([1.5, 1.5])
        this.maze = new Maze([
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 3, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 5, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ])
    }

    player_move(forward=true, side=false){
        const direction = this.player.rot + Math.PI / 2 * side;
        const delta = [
            Math.cos(direction) * this.player.speed * (forward ? 1 : -1),
            Math.sin(direction) * this.player.speed * (forward ? 1 : -1)
        ];

        const new_pos = [
            this.player.pos[0] + delta[0],
            this.player.pos[1] + delta[1]
        ];
        if (!this.maze.hit(new_pos)) {
            this.player.change_pos(new_pos);
        }
        
    }
}