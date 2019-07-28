import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import AutomaticRollback from '@256dpi/ember-fire/mixins/automatic-rollback';

function randomString() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export default Route.extend(AuthenticatedRouteMixin, AutomaticRollback, {
  model() {
    return this.store.createRecord('item', {
      createToken: randomString()
    });
  }
});
