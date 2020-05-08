import Controller from '@ember/controller';
import BasicOperations from '@256dpi/ember-fire/mixins/basic-operations';
import DetectUnload from '@256dpi/ember-fire/mixins/detect-unload';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Controller.extend(BasicOperations, DetectUnload) {
  afterUpdateRoute = 'index';
  afterDeleteRoute = 'index';
  afterUnloadRoute = 'index';

  @tracked previews = {};

  reset() {
    // reset previews
    this.previews = {};
  }

  @action storeBlob(file) {
    file.readAsBinaryString().then(bytes => {
      this.model.blob = {
        type: file.blob.type,
        bytes: btoa(bytes)
      };
    });
  }

  @action unsetBlob() {
    this.model.blob = { type: '', bytes: '' };
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
        let { keys } = JSON.parse(res.body);

        // read as url for preview
        file.readAsDataURL().then(url => {
          // add preview
          this.previews['file'] = url;
          this.previews = this.previews;

          // set file
          this.model.file = {
            'claim-key': keys[0]
          };
        });
      });
  }

  @action unsetFile() {
    // remove preview
    delete this.previews['file'];
    this.previews = this.previews;

    // unset file
    this.model.file = null;
  }
}
