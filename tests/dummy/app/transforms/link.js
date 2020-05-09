import Transform from '@ember-data/serializer/transform';
import { tracked } from '@glimmer/tracking';

class Link {
  @tracked type = '';
  @tracked length = 0;
  @tracked claimKey = '';
  @tracked viewKey = '';
  @tracked preview = '';

  constructor(type, length, claimKey, viewKey) {
    this.type = type;
    this.length = length;
    this.claimKey = claimKey;
    this.viewKey = viewKey;
  }

  get url() {
    // check preview
    if (this.preview) {
      return this.preview;
    }

    // check view key
    if (this.viewKey) {
      return `http://0.0.0.0:8000/api/download?key=${this.viewKey}`;
    }

    return '';
  }
}

export { Link };

export default class LinkTransform extends Transform {
  serialize(link) {
    // check null
    if (link == null) {
      return null;
    }

    return {
      type: link.type,
      length: link.length,
      'claim-key': link.claimKey,
      'view-key': link.viewKey
    };
  }

  deserialize(value) {
    // check null
    if (value == null) {
      return null;
    }

    return new Link(value.type, value.length, value['claim-key'], value['view-key']);
  }
}
