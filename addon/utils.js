/**
 * Will generate a reference id.
 *
 * @param length The reference length.
 * @return {string} The reference.
 */
export function ref(length = 12) {
  // prepare characters
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // assemble utils
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
