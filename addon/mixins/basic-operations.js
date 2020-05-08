import Mixin from '@ember/object/mixin';

import ErrorHandling from '@256dpi/ember-fire/mixins/error-handling';

/**
 * BasicOperations is a Controller mixin that takes care of the common model actions: create, update and delete.
 */
export default Mixin.create(ErrorHandling, {
  /**
   * The route to transition to after a create.
   */
  afterCreateRoute: false,

  /**
   * The route to transition to after an update.
   */
  afterUpdateRoute: false,

  /**
   * The route to transition to after a delete.
   */
  afterDeleteRoute: false,

  /**
   * Whether the model should be added to the transition.
   */
  transitionWithModel: false,

  // TODO: Add support for promises in callback:
  //  https://stackoverflow.com/questions/45547575/ember-wait-for-promise-in-router-willtransition-hook.

  /**
   * The callback that is run to confirm the deletion.
   *
   * @param model The model.
   * @returns {boolean}
   */
  deleteCallback(model) {
    return confirm('Do you really want to delete this record?');
  },

  actions: {
    /**
     * Trigger the creation of the model.
     *
     * @param model The model.
     * @returns {Promise}
     */
    create(model) {
      // get model
      if (!model) {
        model = this.model;
      }

      // save model
      return model
        .save()
        .then(() => {
          // transition if requested
          if (this.afterCreateRoute) {
            if (this.transitionWithModel) {
              this.transitionToRoute(this.afterCreateRoute, model);
            } else {
              this.transitionToRoute(this.afterCreateRoute);
            }
          }
        })
        .catch(failure => {
          // show error
          this.setError(failure);
        });
    },

    /**
     * Trigger an update of the model.
     *
     * @param model The model.
     * @returns {Promise}
     */
    update(model) {
      // get model
      if (!model) {
        model = this.model;
      }

      // update model
      return model
        .save()
        .then(() => {
          // transition if requested
          if (this.afterUpdateRoute) {
            if (this.transitionWithModel) {
              this.transitionToRoute(this.afterUpdateRoute, model);
            } else {
              this.transitionToRoute(this.afterUpdateRoute);
            }
          }
        })
        .catch(failure => {
          // show error
          this.setError(failure);
        });
    },

    /**
     * Trigger the deletion of the model.
     *
     * @param model The model.
     * @returns {Promise}
     */
    delete(model) {
      // get model
      if (!model) {
        model = this.model;
      }

      // return immediately if delete is not confirmed
      if (!this.deleteCallback(model)) {
        return null;
      }

      // announce delete if supported
      if (this.announceDelete) {
        this.announceDelete(model.id);
      }

      // delete record
      return model
        .destroyRecord()
        .then(model => {
          // remove record from store
          model.unloadRecord();

          // transition if requested
          if (this.afterDeleteRoute) {
            this.transitionToRoute(this.afterDeleteRoute);
          }
        })
        .catch(failure => {
          // show error
          this.setError(failure);
        });
    }
  }
});
