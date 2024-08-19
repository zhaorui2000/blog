import {GLTFLoader} from "three/examples/jsm/Addons.js";
import {Inject,Injector} from "@wendellhu/redi";
import {Loader} from "three";


export default class Dice {

    constructor(@Inject(GLTFLoader) private readonly loader: Loader) {
    }

    public async load() {
        return  (await this.loader.loadAsync(new URL('@public/dice/scene.gltf', import.meta.url).href)).scene;
    }
}
