import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export default async function loadDice() {
  const loader = new GLTFLoader();
  const parrotData = await loader.loadAsync(new URL('./../_assets/dice/scene.gltf', import.meta.url).href);
  return parrotData.scene.children[0];
}