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
};

function createImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

const view = new View(model, images);

function gameLoop() {   
    controller.handleInput();
    
    view.draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
