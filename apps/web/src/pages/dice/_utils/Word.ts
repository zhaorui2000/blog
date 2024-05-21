import * as THREE from "three"
import createRenderer from "./createRenderer";
import createCamera from "./createCamera";
import createScene from "./createScene";
import createCube from "./createCube";
import Resizer from "./Resizer";
import createDirectionalLight from "./createDirectionalLight";
export default class World {
  camera;
  scene;
  renderer;
  cube;
  light;
  constructor(container: Element) {
    this.camera = createCamera({ aspect: container.clientWidth / container.clientHeight });
    this.scene = createScene();
    this.renderer = createRenderer();
    this.cube = createCube()
    this.light = createDirectionalLight()
    this.scene.add(this.cube, this.light)
    container.append(this.renderer.domElement);
    const resizer = new Resizer(container, this.camera, this.renderer)
    resizer.onResize = () => {
      this.render()
    }
  }
  render() {
    this.renderer.render(this.scene, this.camera)
  }
}