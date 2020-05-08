import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

export default class extends Route.extend(AuthenticatedRouteMixin) {
  authenticationRoute = 'sign-in';

  model() {
    return hash({
      items: this.store.findAll('item'),
      values: this.store.findAll('value'),
      files: this.store.findAll('file'),
      jobs: this.store.findAll('job')
    });
  }
}
