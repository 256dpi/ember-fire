import Files from '@256dpi/ember-fire/services/files';

export default class extends Files {
  get uploadURL() {
    return 'http://localhost:8000/api/upload';
  }
  get downloadURL() {
    return 'http://localhost:8000/api/download';
  }
}
