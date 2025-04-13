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

const sounds = {
    key: new Audio("assets/key.wav"),
    ambient: new Audio("assets/ambient.wav"),
    victory: new Audio("assets/victory.wav")
};
sounds.ambient.loop = true;
sounds.ambient.volume = 0.05;
sounds.ambient.play();
sounds.key.volume = 1;
sounds.key.loop = false;
sounds.key.currentTime = 0;
sounds.victory.volume = 1;
sounds.victory.loop = false;
sounds.victory.currentTime = 0;

const view = new View(model, images, sounds);

function gameLoop() {
    const fps = 120;
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
