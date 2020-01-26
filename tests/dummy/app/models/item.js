import DS from 'ember-data';
import { computed } from '@ember/object';
import { stringAsBlobURL } from '@256dpi/ember-fire/blob';

export default DS.Model.extend({
  name: DS.attr('string'),
  state: DS.attr('boolean'),
  count: DS.attr('number'),
  blob: DS.attr(),
  file: DS.attr(),
  createToken: DS.attr('string'),
  updateToken: DS.attr('string'),

  blobURL: computed('blob.{bytes,type}', function() {
    if (this.get('blob.bytes')) {
      return stringAsBlobURL(this.get('blob.bytes'), this.get('blob.type'));
    }
  }),

  fileURL: computed('file.view-key', function() {
    if (this.get('file.view-key')) {
      return `http://0.0.0.0:8000/api/download?key=${this.get('file.view-key')}`;
    }
  })
});
