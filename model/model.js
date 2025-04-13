import { Player } from './obstacle/player.js';

export class Model {
    constructor() {
        this.player = new Player([100, 100])
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

        this.player.change_pos(new_pos);
        
    }
}