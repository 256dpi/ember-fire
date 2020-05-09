import Transform from '@ember-data/serializer/transform';
import { tracked } from '@glimmer/tracking';

import { stringAsBlobURL } from '@256dpi/ember-fire/blob';

class Blob {
  @tracked type = '';
  @tracked bytes = '';

  constructor(type, bytes) {
    this.type = type;
    this.bytes = bytes;
  }

  get url() {
    if (this.bytes) {
      return stringAsBlobURL(this.bytes, this.type);
    }

    return '';
  }
}

export { Blob };

export default class BlobTransform extends Transform {
  serialize(link) {
    // check null
    if (link == null) {
      return null;
    }

    return {
      type: link.type,
      bytes: link.bytes
    };
  }

  deserialize(value) {
    // check null
    if (value == null) {
      return null;
    }

    return new Blob(value.type, value.bytes);
  }
}
