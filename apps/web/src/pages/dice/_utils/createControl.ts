import type { Camera, DirectionalLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function createControls(camera: Camera, light: DirectionalLight, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.addEventListener('change', function () {
    light.position.copy(camera.position);
    light.position.x += 2;
    light.position.y += 2;
  });
  Reflect.set(controls, 'tick', controls.update);
  return controls;
}
