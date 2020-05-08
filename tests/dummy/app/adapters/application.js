import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { computed } from '@ember/object';

export default class extends JSONAPIAdapter.extend(DataAdapterMixin) {
  host = 'http://0.0.0.0:8000';
  namespace = 'api';

  @computed('session.{isAuthenticated,data.authenticated.access_token}')
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }
}
