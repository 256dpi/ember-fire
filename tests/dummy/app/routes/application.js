import Route from '@ember/routing/route';

export default class extends Route {
  activate() {
    // subscribe to items
    this.watch.subscribe('items', { state: true });
    this.watch.subscribe('values');
    this.watch.subscribe('files');
    this.watch.subscribe('jobs');
  }
}
