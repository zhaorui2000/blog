<script setup>
import {onMounted, ref} from "vue"
import createCamera from "./../_utils/createCamera";
import createRender from "./../_utils/createRender";
import createScene from "./../_utils/createScene";
import createLight from "./../_utils/createLight";
import createCube from "./../_utils/createCube";
import createControl from "./../_utils/createControl";
import Dice from "@/pages/dice/_utils/Dice";

onMounted(async() => {
  const aspect = container.value.clientWidth / container.value.clientHeight;
  const camera = createCamera({aspect})
  const mash = await (new Dice()).load()
  const scene = createScene()
  const {pointLight,pointLightHelper,ambientLight} = createLight()
  scene.add(pointLight)
  scene.add(ambientLight)
  scene.add(pointLightHelper)
  scene.add(mash)
  const renderer = createRender({
    width: container.value.clientWidth,
    height: container.value.clientHeight,
    scene,
    camera,
    container: container.value
  })
  const controls = createControl({camera, scene, renderer})

})
const container = ref()
</script>
<template>
  <div id="container" ref="container" class="w-full h-full"></div>
</template>
<style></style>