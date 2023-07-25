export function initialize() {
  // check host and replace if necessary
  if (location.host.includes('0.0.0.0')) {
    location.replace(location.href.replace('0.0.0.0', 'localhost'));
  }
}

export default {
  initialize,
};
