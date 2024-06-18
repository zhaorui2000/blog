import createRenderer from "./createRenderer";
import createCamera from "./createCamera";
import createScene from "./createScene";
import createMeshGroup from "./createMeshGroup";
import Resizer from "./Resizer";
import Loop from "./Loop"
import createLights from "./createLights";
import createControls from "./createControl";
export default class World {
  private camera;
  private scene;
  private renderer;
  private meshGroup;
  private light;
  private loop;
  private controls;
  constructor(container: Element) {
    this.camera = createCamera({ aspect: container.clientWidth / container.clientHeight });
    this.scene = createScene();
    this.renderer = createRenderer();
    this.meshGroup = createMeshGroup()
    const {ambientLight,mainLight} = createLights()
    this.controls = createControls(this.camera,this.renderer.domElement)
    this.loop = new Loop(this.camera, this.scene, this.renderer)
    this.loop.updatables.push(this.controls,this.meshGroup)
    this.scene.add(this.meshGroup, ambientLight,mainLight)
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