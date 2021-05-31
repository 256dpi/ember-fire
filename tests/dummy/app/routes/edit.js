import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service store;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'sign-in');
  }

  model(params) {
    return this.store.findRecord('item', params['item_id']);
  }
}
