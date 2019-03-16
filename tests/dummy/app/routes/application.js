import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  activate() {
    this.watch.subscribe('items', {
      state: true,
    });
  },

  deactivate() {
    this.watch.unsubscribe('items');
  }
});
