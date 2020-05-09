import Controller from '@ember/controller';
import BasicOperations from '@256dpi/ember-fire/mixins/basic-operations';
import DetectUnload from '@256dpi/ember-fire/mixins/detect-unload';
import { action } from '@ember/object';

import { Blob } from '../transforms/blob';
import { Link } from '../transforms/link';

export default class extends Controller.extend(BasicOperations, DetectUnload) {
  afterUpdateRoute = 'index';
  afterDeleteRoute = 'index';
  afterUnloadRoute = 'index';

  @action storeBlob(file) {
    file.readAsBinaryString().then(bytes => {
      this.model.blob = new Blob(file.blob.type, btoa(bytes));
    });
  }

  @action unsetBlob() {
    this.model.blob = null;
  }

  @action uploadFile(file) {
    // get access token
    let { access_token } = this.session.data.authenticated;

    // upload file
    file
      .uploadBinary('http://0.0.0.0:8000/api/upload', {
        contentType: file.blob.type,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(res => {
        // get key
        let {
          keys: [key]
        } = JSON.parse(res.body);

        // read as url for preview
        file.readAsDataURL().then(url => {
          this.model.file = new Link(file.blob.type, 0, key, '');
          this.model.file.preview = url;
        });
      });
  }

  @action unsetFile() {
    this.model.file = null;
  }
}
