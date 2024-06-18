import * as CANNON from 'cannon-es';
export default function createGround() {
  const material = new CANNON.Material();
  const groundBody = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane(),
    material,
  });
  return { groundBody, groundMaterial: material };
}
