import * as THREE from 'three';
export default function createLights() {
  const ambientLight = new THREE.AmbientLight('white', 1);
  const mainLight = new THREE.DirectionalLight('white', 2);
  mainLight.position.set(2, 2, 10);
  return { ambientLight, mainLight };
}
