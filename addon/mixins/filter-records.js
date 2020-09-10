import { Promise } from 'rsvp';
import Mixin from '@ember/object/mixin';
import DS from 'ember-data'; // eslint-disable-line

/**
 * FilterRecords is a Store mixin that allows filtering of records.
 */
export default Mixin.create({
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
  },

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
});
