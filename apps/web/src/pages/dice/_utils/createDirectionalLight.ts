import * as THREE from "three"
export default function createDirectionalLight() {
  const light = new THREE.DirectionalLight("white", 10)
  light.position.set(5, 5, 5)
  return light;
}