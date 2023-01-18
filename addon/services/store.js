import Store from '@ember-data/store';

export default class extends Store {
  /**
   * Will find multiple models using the provided filters.
   *
   * @param model {string}
   * @param filters {Object}
   * @param query {Object}
   * @return {Promise<[Model]>}
   */
  filterAll(model, filters = {}, query = {}) {
    // add filters
    Object.keys(filters).forEach(function (key) {
      query['filter[' + key + ']'] = filters[key];
    });

    return this.query(model, query);
  }

  /**
   * Will find a single model using the provided filters.
   *
   * @param model {string}
   * @param filters {Object}
   * @param query {Object}
   * @return {Promise<Model>}
   */
  filterRecord(model, filters = {}, query = {}) {
    return new Promise((resolve, reject) => {
      // query endpoint
      this.filterAll(model, filters, query).then(
        (result) => {
          // return first object on success
          resolve(result.objectAt(0));
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Call the specified group action.
   *
   * @param method {string}
   * @param action {string}
   * @param data {Object}
   * @return {Promise<Object>}
   */
  callGroupAction(method, action, data = {}) {
    // get adapter
    let adapter = this.adapterFor('application', action);

    // build url
    let url = `${adapter.buildURL()}/${action}`;

    // make request
    return adapter.ajax(url, method, {
      data,
    });
  }

  /**
   * Calls the specified collection action.
   *
   * @param method {string}
   * @param name {string}
   * @param action {string}
   * @param data {Object}
   * @return {Promise<Object>}
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
  }

  /**
   * Calls the specified resource action.
   *
   * @param method {string}
   * @param name {string}
   * @param id {string}
   * @param action {string}
   * @param data {Object}
   * @return {Promise<Object>}
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
}
