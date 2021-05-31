import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class extends Route {
  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'sign-in');
  }

  model() {
    return hash({
      items: this.store.findAll('item'),
      values: this.store.findAll('value'),
      files: this.store.findAll('file'),
      jobs: this.store.findAll('job')
    });
  }
}
