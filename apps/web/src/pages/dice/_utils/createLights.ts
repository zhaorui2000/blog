import * as THREE from "three"
export default function createLights(){
  const ambientLight = new THREE.HemisphereLight("white","grey",5)
  const mainLight = new THREE.DirectionalLight("white",0)
  mainLight.position.set(10,10,10)
  return {ambientLight,mainLight}
}