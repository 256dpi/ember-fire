import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { redirectPost } from '@256dpi/ember-fire/utils';

export default class extends Controller {
  queryParams = ['client_id', 'response_type', 'scope', 'state', 'redirect_uri'];

  @tracked client_id;
  @tracked response_type;
  @tracked scope;
  @tracked state;
  @tracked redirect_uri;

  @action approve() {
    // get access token
    let { access_token } = this.session.data.authenticated;

    // perform POST redirection
    redirectPost('http://0.0.0.0:8000/auth/authorize', {
      access_token: access_token,
      client_id: this.client_id,
      response_type: this.response_type,
      scope: this.scope,
      state: this.state,
      redirect_uri: this.redirect_uri,
    });
  }
}
