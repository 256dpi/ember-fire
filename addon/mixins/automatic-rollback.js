import Mixin from '@ember/object/mixin';

/**
 * AutomaticRollback is a Route mixin that on every transition checks if the model has dirty attributes.
 * It will ask the users to abandon the changes and rollback the model.
 */
export default Mixin.create({
  /**
   * The callback that is run to determine if a transition should be aborted.
   *
   * @returns boolean
   */
  abandonCallback() {
    return confirm('Are you sure you want to abandon your changes?');
  },

  actions: {
    willTransition(transition) {
      // get model
      let model = this.controller.get('model');

      // abort transition if model has dirty attributes and changes should not be abandoned
      if(model.get('hasDirtyAttributes') && !this.abandonCallback()) {
        // abort transition
        transition.abort();

        return;
      }

      // changes can be abandoned, if any

      // unload model if new
      if (model.get('isNew')) {
        model.unloadRecord();
        return;
      }

      // rollback dirty attributes if changed
      if(model.get('hasDirtyAttributes')) {
          model.rollbackAttributes();
      }
    }
  }
});
