import Service, { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';
import { observer } from '@ember/object';

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
  model: undefined,

  /* private */

  store: service('store'),
  session: service('session'),

  observer: on(
    'init',
    observer('session.isAuthenticated', function() {
      if (this.get('session.isAuthenticated')) {
        // get access token
        let data = jwtDecode(this.get('session.data.authenticated.access_token'));

        // find user
        this.get('store')
          .findRecord(this.get('userModel'), data['dat'][this.get('dataKey')])
          .then(user => {
            // resolve promise
            this.set('model', user);
          });
      } else {
        this.set('model', undefined);
      }
    })
  )
});
