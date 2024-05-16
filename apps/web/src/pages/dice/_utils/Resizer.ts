export default class Resizer {
  constructor(container: Element, camera, renderer) {
    camera.aspect = container.clientWidth / container.clientHeight;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}
