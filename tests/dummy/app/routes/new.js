import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import { makeRef } from '@256dpi/ember-fire/utils';

export default class extends Route.extend(AuthenticatedRouteMixin) {
  authenticationRoute = 'sign-in';

  model() {
    return this.store.createRecord('item', {
      createToken: makeRef(),
      updateToken: makeRef()
    });
  }
}
