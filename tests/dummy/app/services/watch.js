import Watch from '@256dpi/ember-fire/services/watch';
import { inject } from '@ember/service';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';

export default Watch.extend({
  session: inject(),
  store: inject(),

  watchURL: 'ws://0.0.0.0:8000/v1/api/watch',

  initializer: on('init', observer('session.isAuthenticated', function() {
    console.log('init');

    if(!this.get('session.isAuthenticated')) {
      return;
    }

    this.store.callCollectionAction('GET', 'items', 'watch').then(res => {
      console.log(res);
      this.subscribe('items', res.token);
    }, err => {
      console.log(err);
    });
  }))
});
