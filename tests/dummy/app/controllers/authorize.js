import Controller from '@ember/controller';
import { redirectPost } from '../utils';

export default Controller.extend({
  queryParams: ['client_id', 'response_type', 'scope', 'state', 'redirect_uri'],

  actions: {
    approve() {
      // get access token
      let { access_token } = this.get('session.data.authenticated');

      // perform POST redirection
      redirectPost('http://0.0.0.0:8000/auth/authorize', {
        access_token: access_token,
        client_id: this.client_id,
        response_type: this.response_type,
        scope: this.scope,
        state: this.state,
        redirect_uri: this.redirect_uri
      });
    }
  }
});
