export default function isNil(value: any): boolean {
  return [undefined, null].includes(value);
}
