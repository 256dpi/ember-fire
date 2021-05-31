import Watch from '@256dpi/ember-fire/services/watch';

export default class extends Watch {
  get watchURL() {
    return 'ws://0.0.0.0:8000/api/watch';
  }
}
