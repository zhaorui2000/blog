import * as THREE from "three";

export default function createScene(){
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("skyblue")
    const axesHelper = new THREE.AxesHelper(200);
    scene.add(axesHelper);
    return scene;
}