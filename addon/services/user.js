import Service, { inject as service } from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import DS from 'ember-data'; // eslint-disable-line

import jwtDecode from 'jwt-decode';

/**
 * The User service loads the model of the currently authenticated user.
 */
export default class extends Service {
  @service store;
  @service session;

  /**
   * The key used in the data object of the token claim to store the user id.
   */
  dataKey = 'extra.user';

  /**
   * The name of the model that should be loaded.
   */
  userModel = 'user';

  /**
   * The data read from the access token.
   */
  @computed('session.{isAuthenticated,data.authenticated.access_token}')
  get data() {
    // check authentication
    if (!this.session.isAuthenticated) {
      return null;
    }

    // get access token
    let data = jwtDecode(this.session.data.authenticated.access_token);

    return EmberObject.create(data['dat']);
  }

  /**
   * The user model retrieved from the access token.
   */
  @computed('data', 'userModel', 'dataKey')
  get model() {
    // get data
    let data = this.data;

    // check existence
    if (!data) {
      return null;
    }

    // find user
    return DS.PromiseObject.create({
      promise: this.store.findRecord(this.userModel, data.get(this.dataKey)),
    });
  }
}
