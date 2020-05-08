import Model, { attr } from '@ember-data/model';
import { stringAsBlobURL } from '@256dpi/ember-fire/blob';

export default class extends Model {
  @attr('string') name;
  @attr('boolean') state;
  @attr('number') count;
  @attr blob;
  @attr file;
  @attr('string') createToken;
  @attr('string') updateToken;

  get blobURL() {
    if (this.blob.bytes) {
      return stringAsBlobURL(this.blob.bytes, this.blob.type);
    }

    return '';
  }

  get fileURL() {
    if (this.file['view-key']) {
      return `http://0.0.0.0:8000/api/download?key=${this.file['view-key']}`;
    }

    return '';
  }
}
