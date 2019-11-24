import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['error', 'error_description', 'state', 'code', 'access_token'],

  prepare() {
    // set parameters from fragment
    let params = new URLSearchParams(window.location.hash.substr(1));
    for (let pair of params.entries()) {
      this.set(pair[0], pair[1]);
    }
  }
});
