import Mixin from '@ember/object/mixin';

// TODO: Add support for promises in callback:
//  https://stackoverflow.com/questions/45547575/ember-wait-for-promise-in-router-willtransition-hook.

/**
 * AutomaticRollback is a Route mixin that on every transition tries to automatically rollback eventual changes to the
 * model. If the model has dirty attributes it will consult the abandonCallback method and abort the transition or
 * revert changes. Unsaved models are unloaded from the store.
 */
export default Mixin.create({
  /**
   * The callback that is run to determine if changes should be abandoned.
   *
   * @param model The model.
   * @returns boolean
   */
  abandonCallback(model) {
    return confirm('Are you sure you want to abandon your changes?');
  },

  /* private */

  actions: {
    willTransition(transition) {
      // get model
      let model = this.controller.model;

      // ignore deleted models
      if (model.isDeleted) {
        return;
      }

      // abort transition if model has dirty attributes and changes should not be abandoned
      if (model.hasDirtyAttributes && !this.abandonCallback(model)) {
        transition.abort();
        return;
      }

      // changes can be abandoned, if any

      // unload model if new
      if (model.isNew) {
        model.unloadRecord();
        return;
      }

      // rollback dirty attributes if changed
      if (model.hasDirtyAttributes) {
        model.rollbackAttributes();
      }
    }
  }
});
