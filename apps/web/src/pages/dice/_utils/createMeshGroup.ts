import * as THREE from "three"


export default function createMeshGroup() {
  const group = new THREE.Group()
  const geometry = new THREE.SphereGeometry(0.2,16,16)
  const material = new THREE.MeshStandardMaterial({color:"yellow"})
  const protoSphere = new THREE.Mesh(geometry,material)
  for(let i = 0;i<1;i+=0.05){
    const sphere = protoSphere.clone()
    sphere.position.x = Math.cos(2*Math.PI*i)
    sphere.position.y = Math.sin(2*Math.PI*i)
    sphere.scale.multiplyScalar(0.01+i)
    group.add(sphere)
  }

  const radiansPerSecond = THREE.MathUtils.degToRad(30)
  Reflect.set(group,"tick",(detail)=>{
    group.rotation.z -= detail*radiansPerSecond
  })
  return group;
}