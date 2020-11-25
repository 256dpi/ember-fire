import Store from '@ember-data/store';
import DS from 'ember-data'; // eslint-disable-line

// TODO: Support non JSON action responses?

export default class extends Store {
  /**
   * Will find multiple models using the provided filters.
   *
   * @param model The name of the model.
   * @param filters The filter attributes.
   * @returns {DS.PromiseArray}
   */
  filterAll(model, filters) {
    // compute query
    let query = {};
    Object.keys(filters).forEach(function(key) {
      query['filter[' + key + ']'] = filters[key];
    });

    return DS.PromiseArray.create({
      promise: this.query(model, query)
    });
  }

  /**
   * Will find a single model using the provided filters.
   *
   * @param model The name of the model.
   * @param filters The filter attributes.
   * @returns {DS.PromiseObject}
   */
  filterRecord(model, filters) {
    return DS.PromiseObject.create({
      promise: new Promise((resolve, reject) => {
        // query endpoint
        this.filterAll(model, filters).then(
          result => {
            // return first object on success
            resolve(result.objectAt(0));
          },
          err => {
            reject(err);
          }
        );
      })
    });
  }

  /**
   * Call the specified group action.
   *
   * @param method The HTTP method.
   * @param action The action name.
   * @param data The data for POST, PUT and PATCH requests.
   * @returns {Promise}
   */
  callGroupAction(method, action, data = {}) {
    // get adapter
    let adapter = this.adapterFor('application', action);

    // build url
    let url = `${adapter.buildURL()}/${action}`;

    // make request
    return adapter.ajax(url, method, {
      data
    });
  }

  /**
   * Calls the specified collection action.
   *
   * @param method The HTTP method.
   * @param name The model name.
   * @param action The action name.
   * @param data The data for POST, PUT and PATCH requests.
   * @returns {Promise}
   */
  callCollectionAction(method, name, action, data = {}) {
    // get adapter
    let adapter = this.adapterFor(name, action);

    // build url
    let url = `${adapter.buildURL(name)}/${action}`;

    // make request
    return adapter.ajax(url, method, {
      data
    });
  }

  /**
   * Calls the specified resource action.
   *
   * @param method THe HTTP method.
   * @param name The model name.
   * @param id The model id.
   * @param action The action name.
   * @param data The data for POST, PUT and PATCH requests.
   * @returns {Promise}
   */
  callResourceAction(method, name, id, action, data = {}) {
    // get adapter
    let adapter = this.adapterFor(name, action);

    // build url
    let url = `${adapter.buildURL(name, id)}/${action}`;

    // make request
    return adapter.ajax(url, method, {
      data
    });
  }
}
