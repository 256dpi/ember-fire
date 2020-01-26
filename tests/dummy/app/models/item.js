import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr('string'),
  state: DS.attr('boolean'),
  count: DS.attr('number'),
  blob: DS.attr(),
  file: DS.attr(),
  createToken: DS.attr('string'),
  updateToken: DS.attr('string'),

  blobURL: computed('blob.bytes', function() {
    if (!this.get('blob.bytes')) {
      return undefined;
    }

    let b = atob(this.get('blob.bytes'));
    let ab = new ArrayBuffer(b.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < b.length; i++) {
      ia[i] = b.charCodeAt(i);
    }

    let blob = new Blob([ia.buffer], { type: this.get('blob.type') });

    return URL.createObjectURL(blob);
  }),

  fileURL: computed('file.view-key', function() {
    if (!this.get('file.view-key')) {
      return undefined;
    }

    return `http://0.0.0.0:8000/api/download?key=${this.get('file.view-key')}`;
  })
});
