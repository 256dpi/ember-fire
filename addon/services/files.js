import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';

import { makeRef } from '../utils';

export class Link {
  @tracked ref = '';
  @tracked name = '';
  @tracked type = '';
  @tracked size = 0;
  @tracked claimKey = '';
  @tracked viewKey = '';
  @tracked preview = '';

  constructor(ref, name, type, size, claimKey, viewKey) {
    this.ref = ref;
    this.name = name;
    this.type = type;
    this.size = size;
    this.claimKey = claimKey;
    this.viewKey = viewKey;
  }
}

export default class UploadService extends Service {
  @service store;
  @service session;

  factory() {
    return new Link(...arguments);
  }

  uploadURL = '';
  downloadURL = '';

  @action
  async upload(model, field, multiple, file) {
    // get access token
    let { access_token } = this.session.data.authenticated;

    try {
      // upload file
      const res = await file.uploadBinary(this.uploadURL, {
        contentType: file.blob.type,
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Disposition': `attachment; filename="${file.blob.name}"`
        }
      });

      // get key
      let {
        keys: [key]
      } = JSON.parse(res.body);

      // read as url for preview
      const buf = await file.readAsArrayBuffer();

      // create blob url
      let url = URL.createObjectURL(new Blob([buf], { type: file.blob.type }));

      // create link
      let link = this.factory(makeRef(), file.blob.name, file.blob.type, file.blob.size, key, '');
      link.preview = url;

      // set link
      if (multiple) {
        // get list
        let list = [];
        if (model.get(field)) {
          list = model.get(field).toArray();
        }

        // add link
        model.set(field, A(list.concat([link])));
      } else {
        // set link
        model.set(field, link);
      }
    } catch (err) {
      // remove from queue
      file.queue.remove(file);

      // rethrow
      throw err;
    }
  }

  @action
  unset(model, field) {
    // unset link
    model.set(field, null);
  }

  @action
  remove(model, field, link) {
    // remove link
    model.set(field, model.get(field).without(link));
  }

  url(link) {
    // check link
    if (!link) {
      return '';
    }

    // check preview
    if (link.preview) {
      return link.preview;
    }

    // check view key
    if (link.viewKey) {
      return this.downloadURL + `?key=${link.viewKey}`;
    }

    return '';
  }
}
