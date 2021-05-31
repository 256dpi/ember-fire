import Service, { inject as service } from '@ember/service';
import EmberObject, { computed } from '@ember/object'; // eslint-disable-line

import jwtDecode from 'jwt-decode';

/**
 * The User service loads the model of the currently authenticated user.
 */
export default class extends Service {
  @service store;
  @service session;

  /**
   * The key used in the data object of the token claim to store the user id.
   *
   * @return {string}
   */
  get dataKey() {
    return 'extra.user';
  }

  /**
   * The name of the model that should be loaded.
   *
   * @return {string}
   */
  get userModel() {
    return 'user';
  }

  /**
   * The data read from the access token.
   *
   * @return {Object}
   */
  @computed('session.{isAuthenticated,data.authenticated.access_token}') // eslint-disable-line
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
   *
   * @return {Promise<Model>}
   */
  @computed('data', 'userModel', 'dataKey')
  get model() {
    // check existence
    if (!this.data) {
      return Promise.reject();
    }

    // find user
    return this.store.findRecord(this.userModel, this.data.get(this.dataKey));
  }
}
