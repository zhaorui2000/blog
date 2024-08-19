import {GLTFLoader} from "three/examples/jsm/Addons.js";
import {Inject} from "@wendellhu/redi";
import {Loader} from "three";


export default class Dice {
    diceData;

    constructor(@Inject(GLTFLoader) loader: Loader) {
    }

    public async load() {
        this.diceData = await this.loader.loadAsync(new URL('@public/dice/scene.gltf', import.meta.url).href);
        return this.diceData.scene;
    }
}