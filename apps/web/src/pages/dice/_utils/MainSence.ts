import createRenderer from './createRenderer';
import createCamera from './createCamera';
import createScene from './createScene';
import Resizer from './Resizer';
import createLights from './createLights';
import createControls from './createControl';
import loadDice from './loadDice';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import createGroup from './CreateGroup';
import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import createGround from './createGround';
export default class MainSence {
  private camera;
  private scene;
  private renderer;
  private group;
  private world: CANNON.World;
  private dice;
  private diceBody;
  // private controls: OrbitControls;
  constructor(container: Element) {
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, 0, -9.8) });
    this.camera = createCamera({ aspect: container.clientWidth / container.clientHeight });
    this.scene = createScene();
    this.group = createGroup();
    this.renderer = createRenderer();
    const { ambientLight, mainLight } = createLights();
    // this.controls = createControls(this.camera, mainLight, this.renderer.domElement);
    this.scene.add(ambientLight, mainLight);
    container.append(this.renderer.domElement);
    const resizer = new Resizer(container, this.camera, this.renderer);
  }
  async init() {
    const { diceMesh, diceBody, diceMaterial } = await loadDice();
    const { groundBody, groundMaterial } = createGround();
    this.dice = diceMesh;
    this.diceBody = diceBody;
    const contacMaterial = new CANNON.ContactMaterial(groundMaterial, diceMaterial, {
      restitution: 0.3,
    });
    // this.controls.target.copy(diceMesh.position);
    this.scene.add(diceMesh);
    this.world.addContactMaterial(contacMaterial);
    this.world.addBody(this.diceBody);
    this.world.addBody(groundBody);
  }
  _render() {
    this.world.step(1 / 60);
    this.dice.position.copy(this.diceBody.position);
    this.dice.quaternion.copy(this.diceBody.quaternion);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._render.bind(this));
  }
  start() {
    this._render();
  }
}
