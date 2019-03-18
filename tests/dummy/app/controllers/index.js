import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    add(item) {
      this.store.callResourceAction('POST', 'items', item.get('id'), 'add', {});
    }
  }
});
