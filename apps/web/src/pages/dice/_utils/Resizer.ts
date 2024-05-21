import { default as _ } from "@blog/utils"
export default class Resizer {
  constructor(container: Element, camera, renderer) {
    this.setSize(container, camera, renderer)
    window.addEventListener("resize",
      _.throttle({ interval: 300 },
        () => {
          this.setSize(container, camera, renderer)
          this.onResize()
        }
      )
    )
  }
  private setSize(container: Element, camera, renderer) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
  public onResize() { };
}
