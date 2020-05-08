import Watch from '@256dpi/ember-fire/services/watch';

export default class extends Watch {
  watchURL = 'ws://0.0.0.0:8000/api/watch';
}
