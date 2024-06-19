import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export default async function loadDice() {
  const loader = new GLTFLoader();
  const diceData = await loader.loadAsync(new URL('@public/dice/scene.gltf', import.meta.url).href);
  const diceMesh = diceData.scene.children[0];
  const material = new CANNON.Material();
  const box3 = new THREE.Box3();
  box3.expandByObject(diceMesh);
  const size = new THREE.Vector3();
  box3.getSize(size);
  diceMesh.rotation.set(0, -0.5, -0.5);
  const diceBody = new CANNON.Body({
    mass: 0.3,
    material,
    shape: new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)),
  });
  diceBody.position.z = 10;
  diceBody.quaternion.setFromEuler(Math.PI / 3, Math.PI / 3, Math.PI / 3);
  return {
    diceMaterial: material,
    diceMesh,
    diceBody,
  };
}
