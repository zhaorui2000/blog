import * as THREE from "three";
export default function createRender({width,height,scene,camera,container}){
    const renderer = new THREE.WebGLRenderer({antialias:true})
    renderer.setSize(width, height)
    renderer.render(scene,camera)
    container.appendChild(renderer.domElement)
    return renderer;
}