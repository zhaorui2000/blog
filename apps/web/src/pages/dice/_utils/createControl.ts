import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

export default function createControl({camera, renderer,scene }){
    const controls = new OrbitControls(camera,renderer.domElement)
    controls.addEventListener("change",function(){
        renderer.render(scene,camera)
    })
    return controls;
}