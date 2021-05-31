import Transform from '@ember-data/serializer/transform';
import { A } from '@ember/array';

import { Link } from '../services/files';

export default class FileLinksTransform extends Transform {
  factory() {
    return new Link(...arguments);
  }

  serialize(files) {
    // check null
    if (!files) {
      return [];
    }

    return files.map((files) => {
      return {
        ref: files.ref,
        name: files.name,
        type: files.type,
        size: files.size,
        'claim-key': files.claimKey,
        'view-key': files.viewKey,
      };
    });
  }

  deserialize(values) {
    // check null
    if (!values) {
      return A([]);
    }

    return A(
      values.map((value) => {
        return this.factory(value.ref, value.name, value.type, value.size, value['claim-key'], value['view-key']);
      })
    );
  }
}
