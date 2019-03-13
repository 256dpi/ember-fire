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

  actions: {
    /**
     * Trigger the creation of the model.
     */
    create() {
      // save model
      this.get('model')
        .save()
        .then(() => {
          // transition if requested
          if (this.get('afterCreateRoute')) {
            if (this.get('transitionWithModel')) {
              this.transitionToRoute(this.get('afterCreateRoute'), this.get('model'));
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
     */
    update() {
      // update model
      this.get('model')
        .save()
        .then(() => {
          // transition if requested
          if (this.get('afterUpdateRoute')) {
            if (this.get('transitionWithModel')) {
              this.transitionToRoute(this.get('afterUpdateRoute'), this.get('model'));
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
     */
    delete() {
      if (confirm('Do you really want to delete it?')) {
        this.get('model')
          .destroyRecord()
          .then(model => {
            // remove record from store
            model.unloadRecord();

            // transition if requested
            if(this.get('afterDeleteRoute')) {
              this.transitionToRoute(this.get('afterDeleteRoute'));
            }
          })
          .catch(failure => {
            // show error
            this.setError(failure);
          });
      }
    }
  }
});
