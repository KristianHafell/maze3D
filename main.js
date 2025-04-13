import { Model } from "./model/model.js";
import { Controller } from "./controller/controller.js";
import { View } from "./view/view.js";

const model = new Model();
const controller = new Controller(model);
const view = new View(model);

function gameLoop() {   
    controller.handleInput();
    
    view.draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
