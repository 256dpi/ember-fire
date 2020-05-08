import Service, { inject as service } from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import DS from 'ember-data';

import jwtDecode from 'jwt-decode';

/**
 * The User service loads the model of the currently authenticated user.
 */
export default Service.extend({
  /**
   * The key used in the data object of the token claim to store the user id.
   */
  dataKey: 'extra.user',

  /**
   * The name of the model that should be loaded.
   */
  userModel: 'user',

  /**
   * The data read from the access token.
   */
  data: computed('session.{isAuthenticated,data.authenticated.access_token}', function() {
    // check authentication
    if (!this.session.isAuthenticated) {
      return null;
    }

    // get access token
    let data = jwtDecode(this.session.data.authenticated.access_token);

    return EmberObject.create(data['dat']);
  }),

  /**
   * The user model retrieved from the access token.
   */
  model: computed('data', 'userModel', 'dataKey', function() {
    // get data
    let data = this.data;

    // check existence
    if (!data) {
      return null;
    }

    // find user
    return DS.PromiseObject.create({
      promise: this.store.findRecord(this.userModel, data.get(this.dataKey))
    });
  }),

  /* private */

  store: service('store'),
  session: service('session')
});
