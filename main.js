import { Model } from "./model/model.js";
import { Controller } from "./controller/controller.js";
import { View } from "./view/view.js";

const model = new Model();
const controller = new Controller(model);

const images = {
    start: createImage("assets/lamp.png"),
    key: createImage("assets/key.png"),
    goal: createImage("assets/door.png"),
    troll: createImage("assets/us.png"),
    player: createImage("assets/player.png"),
};

function createImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

const view = new View(model, images);

function gameLoop() {
    const fps = 60;
    const interval = 1000 / fps;

    let lastTime = 0;

    function loop(currentTime) {
        const deltaTime = currentTime - lastTime;

        if (deltaTime >= interval) {
            lastTime = currentTime;

            controller.handleInput();
            view.draw();
        }

        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}

gameLoop();

gameLoop();
