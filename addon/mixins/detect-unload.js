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

  /* private */

  announcedID: null,

  unloadObserver: observer('model.isDeleted', function() {
    if (this.get('model.isDeleted') && this.get('model.id') !== this.get('announcedID')) {
      next(() => {
        alert('This record has been deleted.\nWe will go back now.');

        if (this.get('afterUnloadRoute')) {
          this.transitionToRoute(this.get('afterUnloadRoute'));
        }
      });
    }
  })
});
