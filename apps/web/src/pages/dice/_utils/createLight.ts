import * as THREE from "three";

export default function createLight() {
    // 点光源
    const pointLight = new THREE.PointLight(0xffffff, 10000);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    pointLight.position.set(100, 100, 100)
    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-100, -100, 100);
    return {pointLight, pointLightHelper, ambientLight,directionalLight}
}