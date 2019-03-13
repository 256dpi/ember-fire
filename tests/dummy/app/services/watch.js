import Watch from '@256dpi/ember-fire/services/watch';
import { inject } from '@ember/service';
import { on } from '@ember/object/evented';

export default Watch.extend({
  session: inject(),
  watchURL: 'ws://0.0.0.0:8000/v1/api/watch',

  initializer: on('init', function(){
    console.log('init');
  })
});
