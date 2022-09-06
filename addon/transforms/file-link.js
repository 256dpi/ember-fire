import Transform from '@ember-data/serializer/transform';

import { Link } from '../services/files';

export default class extends Transform {
  /**
   * The factory used to create a new link object.
   *
   * @return {Link}
   */
  factory() {
    return new Link(...arguments);
  }

  /* private */

  serialize(file) {
    // check null
    if (!file) {
      return null;
    }

    return {
      ref: file.ref,
      name: file.name,
      type: file.type,
      size: file.size,
      'claim-key': file.claimKey,
      'view-key': file.viewKey,
    };
  }

  deserialize(value) {
    // check null
    if (!value) {
      return null;
    }

    return this.factory(value.ref, value.name, value.type, value.size, value['claim-key'], value['view-key']);
  }
}
