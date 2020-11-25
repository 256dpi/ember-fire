import Files from '@256dpi/ember-fire/services/files';

export default class extends Files {
  uploadURL = 'http://0.0.0.0:8000/api/upload';
  downloadURL = 'http://0.0.0.0:8000/api/download';
}
