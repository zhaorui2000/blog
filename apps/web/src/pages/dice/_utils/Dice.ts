import {GLTFLoader} from "three/examples/jsm/Addons.js";

export default class Dice {
    diceData;
    constructor() {

    }
    public async load(){
        const loader = new GLTFLoader();
        this.diceData = await loader.loadAsync(new URL('@public/dice/scene.gltf', import.meta.url).href);
    }
}