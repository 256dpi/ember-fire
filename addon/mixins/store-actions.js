import Mixin from '@ember/object/mixin';

/**
 * StoreActions provides methods to call group, collection and resource actions.
 */
export default Mixin.create({
  callGroupAction() {
    // TODO: Implement.
  },

  /**
   * Calls the specified collection action.
   *
   * @param method The HTTP method.
   * @param name The model name.
   * @param action The action name.
   * @param data The data for POST, PUT and PATCH requests.
   * @returns {EmberPromise}
   */
  callCollectionAction(method, name, action, data = {}) {
    // get adapter
    let adapter = this.adapterFor(name, action);

    // build url
    let url = `${adapter.buildURL(name)}/${action}`;

    // make request
    return adapter.ajax(url, method, {
      data,
    });
  },

  /**
   * Calls the specified resource action.
   *
   * @param method THe HTTP method.
   * @param name The model name.
   * @param id The model id.
   * @param action The action name.
   * @param data The data for POST, PUT and PATCH requests.
   * @returns {EmberPromise}
   */
  callResourceAction(method, name, id, action, data = {}) {
    // get adapter
    let adapter = this.adapterFor(name, action);

    // build url
    let url = `${adapter.buildURL(name, id)}/${action}`;

    // make request
    return adapter.ajax(url, method, {
      data,
    });
  }
});
