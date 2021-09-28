import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class extends Route {
  @service store;
  @service session;

  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'sign-in');
  }

  model(params) {
    return hash({
      items: this.store.query('item', {
        'page[size]': 5,
        'page[number]': params.page,
      }),
      values: this.store.findAll('value'),
      files: this.store.findAll('file'),
      jobs: this.store.findAll('job'),
    });
  }
}
