import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import AutomaticRollback from '@256dpi/ember-fire/mixins/automatic-rollback';

export default Route.extend(AuthenticatedRouteMixin, AutomaticRollback, {
  model(params) {
    return this.store.findRecord('item', params['item_id']);
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.reset();
  }
});
