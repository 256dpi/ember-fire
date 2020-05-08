import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default class extends Route.extend(ApplicationRouteMixin) {
  activate() {
    // subscribe to items
    this.watch.subscribe('items', { state: true });
    this.watch.subscribe('values');
    this.watch.subscribe('files');
    this.watch.subscribe('jobs');
  }
}
