import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AutomaticRollback from '@256dpi/ember-fire/mixins/automatic-rollback';

import { randomString } from '../utils';

export default class extends Route.extend(AuthenticatedRouteMixin, AutomaticRollback) {
  authenticationRoute = 'sign-in';

  model() {
    return this.store.createRecord('item', {
      createToken: randomString()
    });
  }
}
