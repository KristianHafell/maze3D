import { Player } from './obstacle/player.js';
import { Maze } from './obstacle/maze.js';
import { Obstacle } from './obstacle/obstacle.js';


export class Model {
    constructor() {
        this.player = new Player([1.6, 1.5])
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
        this.obstacles = this._initialize_obstacles();

        this.hasKey = false;
        this.isGoal = false;
        self.hint = false;
    }

    _find_position(value) {
        // Find position of a value in the maze and return its center as an array.
        const positions = [];
        this.maze.layout.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === value) {
                    positions.push([x + 0.5, y + 0.5]);
                }
            });
        });
        return positions.length > 0 ? positions[0] : null;
    }
    _initialize_obstacles() {
        // Load obstacle sprites and set their positions.
        const positions = {
            start: this._find_position(2),
            key: this._find_position(3),
            goal: this._find_position(4),
            troll: this._find_position(5)
        };

        return Object.fromEntries(
            Object.entries(positions).map(([key, pos]) => [key, new Obstacle(key, pos)])
        );
    }

    isVal(target) {
        // Check if player's current tile matches a target using direct indexing.
        const x = Math.trunc(this.player.pos[0]);
        const y = Math.trunc(this.player.pos[1]);
        return this.maze.layout[y]?.[x] === target;
    }

    player_move(forward=true){
        const direction = this.player.rot;
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

        // Interact with key
        if (this.isVal(3)) {
            this.hasKey = true;
            this.obstacles["key"].pos = [-1, -1];
            const x = Math.floor(this.player.pos[0]);
            const y = Math.floor(this.player.pos[1]);
            this.maze.layout[y][x] = 0;
        }

        // Interact with goal
        if (this.isVal(4) && this.hasKey) {
            this.isGoal = true;
        }
    }
}