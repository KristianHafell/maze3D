export class Player {
    constructor(pos, rot=0) {
        this.pos = pos
        this.speed = 0.02
        this.rot = rot
        this.rot_speed = Math.PI / 70
    }

    change_pos(new_pos) {
        this.pos = new_pos
    }

    rotate(right=true) {    
        this.rot = this.rot + this.rot_speed * (right ? 1 : -1);
    }

}