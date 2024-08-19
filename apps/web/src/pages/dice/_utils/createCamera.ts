import * as THREE from "three";

export default function createCamera({fov=50,aspect=1,near=0.1,far=2000}={} ){
    const camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
    camera.position.set(10,10,10)
    camera.lookAt(0,0,0)
    return camera;
}