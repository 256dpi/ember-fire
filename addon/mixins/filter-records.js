import { Promise } from 'rsvp';
import Mixin from '@ember/object/mixin';

/**
 * FilterRecords is a Store mixin that allows filtering of records.
 */
export default Mixin.create({
  /**
   * Will find multiple models using the provided filters.
   *
   * @param model The name of the model.
   * @param filters The filter attributes.
   * @returns {Promise}
   */
  filterAll(model, filters) {
    // compute query
    let query = {};
    Object.keys(filters).forEach(function(key) {
      query['filter[' + key + ']'] = filters[key];
    });

    return this.query(model, query);
  },

  /**
   * Will find a single model using the provided filters.
   *
   * @param model The name of the model.
   * @param filters The filter attributes.
   * @returns {Promise}
   */
  filterRecord(model, filters) {
    return new Promise((resolve, reject) => {
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
    });
  }
});
