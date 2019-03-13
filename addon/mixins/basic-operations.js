import Mixin from '@ember/object/mixin';

import ErrorHandling from '@256dpi/ember-fire/mixins/error-handling';

// BasicOperations is a Controller mixin that takes care of the common model
// actions: create, update and delete.
export default Mixin.create(ErrorHandling, {
  transitionWithModel: false,
  afterCreateRoute: 'application',
  afterUpdateRoute: 'application',
  afterDeleteRoute: 'application',
  setAttribute(key, value) {
    this.get('model').set(key, value);
  },
  saveModel(route) {
    this.get('model')
      .save()
      .then(() => {
        if (this.get('transitionWithModel')) {
          this.transitionToRoute(this.get(route), this.get('model'));
        } else {
          this.transitionToRoute(this.get(route));
        }
      })
      .catch(failure => {
        this.setError(failure);
      });
  },
  actions: {
    create() {
      this.saveModel('afterCreateRoute');
    },
    update() {
      this.saveModel('afterUpdateRoute');
    },
    delete() {
      if (confirm('Do you really want to delete it?')) {
        this.get('model')
          .destroyRecord()
          .then(model => {
            model.unloadRecord();
            this.transitionToRoute(this.get('afterDeleteRoute'));
          })
          .catch(failure => {
            this.setError(failure);
          });
      }
    }
  }
});
