export class Player {
    constructor(pos, rot=0) {
        this.pos = pos
        this.speed = 0.013
        this.rot = rot
        this.rot_speed = Math.PI / 100
        this.FOV = Math.PI * 0.3
        this.res = 100
        this.max_FOV = 10
        this.min_FOV = 1
    }

    change_pos(new_pos) {
        this.pos = new_pos
    }

    rotate(right=true) {    
        this.rot = this.rot + this.rot_speed * (right ? 1 : -1);
    }

    ray(map) {
        const split = this.FOV / this.res;
        const dir_start = this.rot - this.FOV / 2;

        // Create array of angles for each ray
        const angles = Array.from({ length: this.res }, (_, i) => dir_start + i * split);
        const cos_vals = angles.map(angle => Math.cos(angle));
        const sin_vals = angles.map(angle => Math.sin(angle));

        // Precompute distances
        const le_vals = Array.from({ length: (this.max_FOV - this.min_FOV) * this.res }, (_, i) => this.min_FOV * this.res + i);
        const l_vals = le_vals.map(le => le / this.res);

        // Broadcast l_vals across all rays
        const dx = l_vals.map(l => cos_vals.map(cos => l * cos));
        const dy = l_vals.map(l => sin_vals.map(sin => l * sin));

        const x_vals = dx.map(row => row.map((val, i) => this.pos[0] + val));
        const y_vals = dy.map(row => row.map((val, i) => this.pos[1] + val));

        // Clamp map size
        const map_h = map.length;
        const map_w = map[0].length;
        const x_int = x_vals.map(row => row.map(val => Math.min(Math.max(Math.floor(val), 0), map_w - 1)));
        const y_int = y_vals.map(row => row.map(val => Math.min(Math.max(Math.floor(val), 0), map_h - 1)));

        // Look up map values
        const hits = x_int.map((row, i) => row.map((x, j) => map[y_int[i][j]][x] === 1));

        const ret = [];
        for (let i = 0; i < this.res; i++) {
            const hit_indices = hits.map((row, j) => row[i] ? j : -1).filter(index => index !== -1);
            if (hit_indices.length > 0) {
                const first_hit = hit_indices[0];
                const l = l_vals[first_hit];
                const x = x_vals[first_hit][i];
                const y = y_vals[first_hit][i];
                ret.push([l, x, y]);
            } else {
                ret.push([this.max_FOV * 2, -1, -1]);
            }
        }

        return ret;
    }

}