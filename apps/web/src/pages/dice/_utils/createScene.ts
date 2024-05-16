import * as THREE from "three"
export default function createSence() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color("skyblue")
  return scene
}