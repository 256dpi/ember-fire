import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';

import CustomActions from '@256dpi/ember-fire/mixins/custom-actions';

export default Mixin.create(CustomActions, {
  watch: inject(),

  findAndWatchAll(model, options = {}) {
    // get watch token and subscribe it
    this.callCollectionAction('GET', model, 'watch').then(res => {
      this.watch.subscribe(`fwa-${model}`, res.token, false);
    });

    // find records
    return this.findAll(model, options);
  },

  findAndWatchRecord(model, id, options = {}) {
    // get watch token and subscribe it
    this.callResourceAction('GET', model, id, 'watch').then(res => {
      this.watch.subscribe(`fwr-${model}-${id}`, res.token, false);
    });

    // find record
    return this.findRecord(model, id, options);
  }
});
