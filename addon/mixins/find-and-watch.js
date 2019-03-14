import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';

import CustomActions from '@256dpi/ember-fire/mixins/custom-actions';

// TODO: Should these be properly ordered? Subscribe first and then load records?

/**
 * FindAndWatch is a store mixin that provides additional store methods to find records and watch them at the same time.
 */
export default Mixin.create(CustomActions, {
  /**
   * Will call findAll() and fetch and subscribe the collection watch token.
   *
   * @param model The model.
   * @param options The options to pass on.
   * @returns {Promise}
   */
  findAndWatchAll(model, options = {}) {
    // get watch token and subscribe it
    this.callCollectionAction('GET', model, 'watch').then(res => {
      this.watch.subscribe(`fwa-${model}-all`, res.token, false);
    });

    // find records
    return this.findAll(model, options);
  },

  /**
   * Will call findRecord() and fetch and subscribe the resource watch token.
   *
   * @param model The model.
   * @param id The model id.
   * @param options The options to pass on.
   * @returns {Promise}
   */
  findAndWatchRecord(model, id, options = {}) {
    // get watch token and subscribe it
    this.callResourceAction('GET', model, id, 'watch').then(res => {
      this.watch.subscribe(`fwr-${model}-${id}`, res.token, false);
    });

    // find record
    return this.findRecord(model, id, options);
  },

  /* private */

  watch: inject()
});
