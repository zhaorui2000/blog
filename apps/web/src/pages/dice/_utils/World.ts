import createRenderer from './createRenderer';
import createCamera from './createCamera';
import createScene from './createScene';
import Resizer from './Resizer';
import Loop from './Loop';
import createLights from './createLights';
import createControls from './createControl';
import loadDice from './loadDice';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import createGroup from './CreateGroup';
export default class World {
  private camera;
  private scene;
  private renderer;
  private loop;
  private group;
  private controls: OrbitControls;
  constructor(container: Element) {
    this.camera = createCamera({ aspect: container.clientWidth / container.clientHeight });
    this.scene = createScene();
    this.group = createGroup();
    this.renderer = createRenderer();
    const { ambientLight, mainLight } = createLights();
    this.controls = createControls(this.camera, mainLight, this.renderer.domElement);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.loop.updatables.push(this.controls);
    this.scene.add(ambientLight, mainLight);
    container.append(this.renderer.domElement);
    const resizer = new Resizer(container, this.camera, this.renderer);
  }
  async init() {
    const parrot = await loadDice();
    this.controls.target.copy(parrot.position);
    this.scene.add(parrot);
  }
  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}
