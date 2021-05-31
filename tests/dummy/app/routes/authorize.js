import Route from '@ember/routing/route';

export default class extends Route {
  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'sign-in');
  }
}
