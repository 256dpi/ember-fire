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
   * @returns {boolean}
   */
  deleteCallback(model) { // eslint-disable-line no-unused-vars
    return confirm('Do you really want to delete this record?');
  },

  actions: {
    /**
     * Trigger the creation of the model.
     *
     * @returns {Promise}
     */
    create() {
      // get model
      let model = this.get('model');

      // save model
      return model
        .save()
        .then(() => {
          // transition if requested
          if (this.get('afterCreateRoute')) {
            if (this.get('transitionWithModel')) {
              this.transitionToRoute(this.get('afterCreateRoute'), model);
            } else {
              this.transitionToRoute(this.get('afterCreateRoute'));
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
     * @returns {Promise}
     */
    update() {
      // get model
      let model = this.get('model');

      // update model
      return model
        .save()
        .then(() => {
          // transition if requested
          if (this.get('afterUpdateRoute')) {
            if (this.get('transitionWithModel')) {
              this.transitionToRoute(this.get('afterUpdateRoute'), model);
            } else {
              this.transitionToRoute(this.get('afterUpdateRoute'));
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
     * @returns {Promise}
     */
    delete() {
      // get model
      let model = this.get('model');

      // return immediately if delete is not confirmed
      if (!this.deleteCallback(model)) {
        return;
      }

      // announce delete if supported
      if (this.announceDelete) {
        this.announceDelete(model.get('id'));
      }

      // delete record
      return model
        .destroyRecord()
        .then(model => {
          // remove record from store
          model.unloadRecord();

          // transition if requested
          if (this.get('afterDeleteRoute')) {
            this.transitionToRoute(this.get('afterDeleteRoute'));
          }
        })
        .catch(failure => {
          // show error
          this.setError(failure);
        });
    }
  }
});
