import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action add(item) {
    this.store.callResourceAction('POST', 'items', item.id, 'add', {});
  }

  @action generate(item) {
    this.store.callResourceAction('POST', 'items', item.id, 'gen', {});
  }
}
