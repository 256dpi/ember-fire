import Mixin from '@ember/object/mixin';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';

/**
 * DetectUnload is a Controller mixin that detects if a model gets unloaded and will perform a transition to the
 * afterDeleteRoute. The announceDelete method must be called before destroying, deleting or unloading a record to
 * ensure not duplicate transitions.
 */
export default Mixin.create({
  /**
   * The route to transition to after an unload.
   */
  afterUnloadRoute: false,

  /**
   * This method should be called to announce a record deletion.
   *
   * @param id The model id.
   */
  announceDelete(id) {
    this.set('announcedID', id);
  },

  /**
   * The callback that is called when an unload has been detected.
   *
   * @param model The model.
   */
  unloadCallback() {
    alert('This record has been deleted.\nWe will go back now.');
  },

  /* private */

  announcedID: null,

  unloadObserver: observer('model.isDeleted', function() {
    // get model
    let model = this.get('model');

    // return if not deleted or model has been announced
    if (!model.get('isDeleted') || model.get('id') === this.get('announcedID')) {
      return;
    }

    // queue alert and deletion
    next(() => {
      // call callback
      this.unloadCallback(model);

      // transition if a route has been set
      if (this.get('afterUnloadRoute')) {
        this.transitionToRoute(this.get('afterUnloadRoute'));
      }
    });
  })
});
