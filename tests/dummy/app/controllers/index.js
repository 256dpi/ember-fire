import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class extends Controller {
  @service store;

  @action add(item) {
    this.store.callResourceAction('POST', 'items', item.id, 'add', {});
  }

  @action generate(item) {
    this.store.callResourceAction('POST', 'items', item.id, 'gen', {});
  }
}
