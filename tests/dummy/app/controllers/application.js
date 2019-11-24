import Controller from '@ember/controller';

import { randomString } from '../utils';

export default Controller.extend({
  actions: {
    authorize(type) {
      // redirect to authorize endpoint
      let client = 'sub-key';
      let scope = 'foo';
      let state = randomString();
      let uri = 'http://0.0.0.0:4200/return';
      window.location = `http://0.0.0.0:8000/auth/authorize?response_type=${type}&client_id=${client}&scope=${scope}&state=${state}&redirect_uri=${uri}`;
    },
    signOut() {
      // invalidate session
      this.get('session').invalidate();
    }
  }
});
