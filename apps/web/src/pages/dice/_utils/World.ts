import createRenderer from "./createRenderer";
import createCamera from "./createCamera";
import createScene from "./createScene";
import createCube from "./createCube";
import Resizer from "./Resizer";
import Loop from "./Loop"
import createDirectionalLight from "./createDirectionalLight";
export default class World {
  private camera;
  private scene;
  private renderer;
  private cube;
  private light;
  private loop;
  constructor(container: Element) {
    this.camera = createCamera({ aspect: container.clientWidth / container.clientHeight });
    this.scene = createScene();
    this.renderer = createRenderer();
    this.cube = createCube()
    this.light = createDirectionalLight()
    this.loop = new Loop(this.camera, this.scene, this.renderer)
    this.loop.updatables.push(this.cube)
    this.scene.add(this.cube, this.light)
    container.append(this.renderer.domElement);
    const resizer = new Resizer(container, this.camera, this.renderer)
  }
  start() {
    this.loop.start()
  }
  stop() {
    this.loop.stop()
  }

}