import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service user;
  @service watch;

  activate() {
    // subscribe to items
    this.watch.subscribe('items', { state: true });
    this.watch.subscribe('values');
    this.watch.subscribe('files');
    this.watch.subscribe('jobs');
  }
}
