import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class extends Route.extend(AuthenticatedRouteMixin) {
  authenticationRoute = 'sign-in';

  model(params) {
    return this.store.findRecord('item', params['item_id']);
  }
}
