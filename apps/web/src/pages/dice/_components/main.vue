<script setup>
import * as THREE from 'three';
import { ref, onMounted } from 'vue';
const container = ref(null);
onMounted(() => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('skyblue');

  // Create a camera
  const fov = 35; // AKA Field of View
  const aspect = container.value.clientWidth / container.value.clientHeight;
  const near = 0.1; // the near clipping plane
  const far = 100; // the far clipping plane
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial();
  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.value.appendChild(renderer.domElement);

  renderer.render(scene, camera);
});
</script>
<template>
  <div ref="container" class="h-full w-full"></div>
</template>
<style></style>
