import * as THREE from "three"
export default function createCube() {
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({ color: "purple" })
  const cube = new THREE.Mesh(geometry, material)
  const radiansPerSecond = THREE.MathUtils.degToRad(30)
  cube.rotation.set(-0.5, -0.1, 0.8)
  Reflect.set(cube, 'tick',
    (delta) => {
      cube.rotation.z += radiansPerSecond * delta;
      cube.rotation.x += radiansPerSecond * delta;
      cube.rotation.y += radiansPerSecond * delta;
    })
  return cube;
}