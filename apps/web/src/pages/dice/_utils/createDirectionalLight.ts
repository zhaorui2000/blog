import * as THREE from "three"
export default function createDirectionalLight() {
  const light = new THREE.DirectionalLight("white", 8)
  light.position.set(10, 10, 10)
  return light;
}