import * as THREE from "three"
export default function createSence({ aspect = 1 } = {}) {
    const camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 100)
    camera.position.set(0, 0, 10)
    return camera;
}