import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Pagination from '@256dpi/ember-fire/pagination';

export default class extends Controller {
  @service store;

  queryParams = ['page'];
  @tracked page = 1;

  get pages() {
    return (new Pagination(this.model.items)).allPages;
  }

  @action add(item) {
    this.store.callResourceAction('POST', 'items', item.id, 'add', {});
  }

  @action generate(item) {
    this.store.callResourceAction('POST', 'items', item.id, 'gen', {});
  }
}
