/**
 * Will generate a reference.
 *
 * @param length The reference length.
 * @return {string} The reference.
 */
export function makeRef(length = 12) {
  // prepare characters
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // assemble utils
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

/**
 * Perform a POST redirect.
 *
 * @param url The target URL.
 * @param data The body data.
 */
export function redirectPost(url, data) {
  // create gadget form
  let form = document.createElement('form');

  // add form
  document.body.appendChild(form);

  // set target
  form.method = 'post';
  form.action = url;

  // add inputs with data
  for (let name of Object.keys(data)) {
    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = data[name];
    form.appendChild(input);
  }

  // submit form
  form.submit();
}

/**
 * Get a formatted string from the provided error.
 *
 * @param err {Error} The error.
 * @return {string|undefined} The string.
 */
export function getError(err) {
  // check err
  if (!err) {
    return undefined;
  }

  // oauth2 errors
  if (err['error_description']) {
    return err['error_description'];
  } else if (err['error']) {
    return err['error'];
  }

  // json-api errors
  if (err['errors'] && err['errors'].length > 0) {
    return err['errors'][0].detail || err['errors'][0].title;
  }

  return err.toString();
}
