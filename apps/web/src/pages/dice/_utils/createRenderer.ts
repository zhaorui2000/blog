import * as THREE from "three"
export default function createSence() {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    return renderer
}