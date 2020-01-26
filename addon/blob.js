/**
 * Creates a blog from a string and returns the URL to it.
 *
 * @param string The base64 encoded string.
 * @param type The content type.
 * @return {string} The URL.
 */
export function stringAsBlobURL(string, type = 'application/octet-stream') {
  // convert to buffer
  let b = atob(string);
  let ab = new ArrayBuffer(b.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < b.length; i++) {
    ia[i] = b.charCodeAt(i);
  }

  // create blob
  let blob = new Blob([ia.buffer], { type: type });

  return URL.createObjectURL(blob);
}
