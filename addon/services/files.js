import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

import { makeRef } from '../utils';

/**
 * The common link model.
 */
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

export default class extends Service {
  @service store;
  @service session;

  /**
   * The factory used to create a new link object.
   *
   * @return {Link}
   */
  factory() {
    return new Link(...arguments);
  }

  /**
   * Returns the URL used for uploads.
   *
   * @return {string}
   */
  get uploadURL() {
    return '';
  }

  /**
   * Returns the URL used for downloads.
   *
   * @return {string}
   */
  get downloadURL() {
    return '';
  }

  /**
   * Upload will upload the specified file and return a constructed link.
   *
   * @param file {File}
   * @return {Promise<*>}
   */
  @action
  async upload(file) {
    // get access token
    let { access_token } = this.session.data.authenticated;

    try {
      // upload file
      const res = await file.uploadBinary(this.uploadURL, {
        contentType: file.type,
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Disposition': `attachment; filename="${file.name}"`,
        },
      });

      // get key
      const {
        keys: [key],
      } = await res.json();

      // get size
      const size = file.file?.size || file.size; // the latter seems incorrect

      // create link
      let link = this.factory(makeRef(), file.name, file.type, size, key, '');

      // set preview
      const buf = await file.readAsArrayBuffer();
      link.preview = URL.createObjectURL(new Blob([buf], { type: file.type }));

      return link;
    } catch (err) {
      // remove from queue
      file.queue?.remove(file);

      // rethrow
      throw err;
    }
  }

  /**
   * Return a URL for the specified link.
   *
   * @param link {Link}
   * @return {string}
   */
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
