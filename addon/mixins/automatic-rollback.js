import Mixin from '@ember/object/mixin';

/**
 * AutomaticRollback is a Route mixin that on every transition tries to to automatically rollback eventual changes to
 * the model. If the model has dirty attributes it will consult the abandonCallback() and abort the transition or revert
 * changes. Unsaved models are unloaded from the store.
 */
export default Mixin.create({
  /**
   * The callback that is run to determine if changes should be abandoned.
   *
   * @param model The model.
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
      if(model.get('hasDirtyAttributes') && !this.abandonCallback(model)) {
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
