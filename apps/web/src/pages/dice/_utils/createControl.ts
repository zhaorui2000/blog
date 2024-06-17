import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function createControls(camera,canvas) {
  const controls = new OrbitControls(camera,canvas)
  controls.enableDamping = true;
  Reflect.set(controls,'tick',controls.update)
  return controls;
}
