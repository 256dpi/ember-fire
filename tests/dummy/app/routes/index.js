import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    // ensure subscription
    this.watch.subscribe('items', { state: true });

    // get all items
    return this.store.findAll('item');
  }
});
