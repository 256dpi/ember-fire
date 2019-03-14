import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import AutomaticRollback from '@256dpi/ember-fire/mixins/automatic-rollback';

export default Route.extend(AuthenticatedRouteMixin, AutomaticRollback, {
  model(params) {
    return this.store.findAndWatchRecord('item', params['item_id']);
  }
});
