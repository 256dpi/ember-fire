import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { computed } from '@ember/object';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: 'http://0.0.0.0:8000',
  namespace: 'api',

  headers: computed('session.data.authenticated.access_token', function() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  })
});
