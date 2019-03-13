import Mixin from '@ember/object/mixin';

// AutomaticRollback is a Route mixin that on every transition checks if the
// model has dirty attributes. It will ask the users to abandon the changes and
// rollback the model.
export default Mixin.create({
  actions: {
    willTransition(transition) {
      if (
        this.controller.get('model.hasDirtyAttributes') &&
        !confirm('Are you sure you want to abandon your changes?')
      ) {
        transition.abort();
      } else {
        if (this.controller.get('model.isNew')) {
          this.controller.get('model').unloadRecord();
        } else {
          this.controller.get('model').rollbackAttributes();
        }
      }
    }
  }
});
