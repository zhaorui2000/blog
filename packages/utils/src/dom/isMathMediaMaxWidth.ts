export default function isMathMediaMaxWidth(width: number) {
    return window.matchMedia(`(max-width: ${width}px)`).matches;
}