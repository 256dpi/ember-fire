import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  queryParams = ['error', 'error_description', 'state', 'code', 'access_token'];

  @tracked error;
  @tracked error_description;
  @tracked state;
  @tracked code;
  @tracked access_token;

  prepare() {
    // set parameters from fragment
    let params = new URLSearchParams(window.location.hash.substr(1));
    for (let pair of params.entries()) {
      this[pair[0]] = pair[1];
    }
  }
}
