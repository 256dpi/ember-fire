import { Promise } from 'rsvp';
import Mixin from '@ember/object/mixin';

// TODO: Create a store mixin.

/**
 * FindByQuery is a Route mixin that allows specifying a query when searching for models.
 */
export default Mixin.create({
  /**
   * Will find a single model using a query.
   *
   * @param model The name of the model.
   * @param query The filter attributes.
   * @returns {Promise}
   */
  findByQuery(model, query) {
    // compute query
    let newQuery = {};
    Object.keys(query).forEach(function(key) {
      newQuery['filter[' + key + ']'] = query[key];
    });

    return new Promise((resolve, reject) => {
      // query endpoint
      this.store.query(model, newQuery).then(
        result => {
          // return first object on success
          resolve(result.objectAt(0));
        },
        err => {
          reject(err);
        }
      );
    });
  }
});
