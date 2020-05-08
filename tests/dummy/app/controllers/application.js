import Controller from '@ember/controller';
import { action } from '@ember/object';

import { randomString } from '../utils';

export default class extends Controller {
  @action authorize(type) {
    // redirect to authorize endpoint
    let client = 'sub-key';
    let scope = 'foo';
    let state = randomString();
    let uri = 'http://0.0.0.0:4200/return';
    window.location = `http://0.0.0.0:8000/auth/authorize?response_type=${type}&client_id=${client}&scope=${scope}&state=${state}&redirect_uri=${uri}`;
  }

  @action signOut() {
    // invalidate session
    this.session.invalidate();
  }
}
