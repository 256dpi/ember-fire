import Watch from '@256dpi/ember-fire/services/watch';

export default class extends Watch {
  get watchURL() {
    return 'ws://localhost:8000/api/watch';
  }
}
