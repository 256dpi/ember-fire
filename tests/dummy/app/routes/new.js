import Route from '@ember/routing/route';

import { makeRef } from '@256dpi/ember-fire/utils';

export default class extends Route {
  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'sign-in');
  }

  model() {
    return this.store.createRecord('item', {
      createToken: makeRef(),
      updateToken: makeRef()
    });
  }
}
