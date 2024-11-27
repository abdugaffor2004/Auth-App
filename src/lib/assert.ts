export function assert(
  condition: boolean,
  message: string = 'Some error ocurried',
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
