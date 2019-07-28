import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';

import jwtDecode from 'jwt-decode';

/**
 * The User service loads the model of the currently authenticated user.
 */
export default Service.extend({
  /**
   * The key used in the data object of the token claim to store the user id.
   */
  dataKey: 'user',

  /**
   * The name of the model that should be loaded.
   */
  userModel: 'user',

  /**
   * The user model retrieved from the access token.
   */
  model: computed('session.isAuthenticated', function() {
    // check authentication
    if (!this.get('session.isAuthenticated')) {
      return null;
    }

    // get access token
    let data = jwtDecode(this.get('session.data.authenticated.access_token'));

    // find user
    return this.get('store').findRecord(this.get('userModel'), data['dat'][this.get('dataKey')]);
  }),

  /* private */

  store: service('store'),
  session: service('session')
});
