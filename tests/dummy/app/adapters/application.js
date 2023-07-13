import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object'; // eslint-disable-line

export default class extends JSONAPIAdapter {
  @service session;

  host = 'http://0.0.0.0:8000';
  namespace = 'api';

  @computed('session.{isAuthenticated,data.authenticated.access_token}') // eslint-disable-line
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers[
        'Authorization'
      ] = `Bearer ${this.session.data.authenticated.access_token}`;
    }
    return headers;
  }
}
