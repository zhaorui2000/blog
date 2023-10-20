export default function step(fn) {
  if (fn()) {
    window.requestAnimationFrame(step(fn));
  }
}
