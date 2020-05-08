import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { stringAsBlobURL } from '@256dpi/ember-fire/blob';

export default Model.extend({
  name: attr('string'),
  state: attr('boolean'),
  count: attr('number'),
  blob: attr(),
  file: attr(),
  createToken: attr('string'),
  updateToken: attr('string'),

  blobURL: computed('blob.{bytes,type}', function() {
    if (this.get('blob.bytes')) {
      return stringAsBlobURL(this.get('blob.bytes'), this.get('blob.type'));
    }

    return '';
  }),

  fileURL: computed('file.view-key', function() {
    if (this.get('file.view-key')) {
      return `http://0.0.0.0:8000/api/download?key=${this.get('file.view-key')}`;
    }

    return '';
  })
});
