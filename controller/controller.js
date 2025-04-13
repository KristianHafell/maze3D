
const keys = {};
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

export class Controller {
    constructor(model) {
        this.model = model;
    }

    handleInput() {
        if (this.model.isGoal) {
            return;
        }
        if (keys["w"]) {
            this.model.player_move(true);
            if (!this.model.play_ambient[1]) {
                this.model.play_ambient = [true, true];
            }
        }
        if (keys["s"]) {
            this.model.player_move(false);
        }
        if (keys["a"]) {
            this.model.player.rotate(false);
        }
        if (keys["d"]) {
            this.model.player.rotate(true);
        }
        this.model.hint = keys["h"];
    }
}