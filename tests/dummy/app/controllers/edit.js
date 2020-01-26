import Controller from '@ember/controller';

import BasicOperations from '@256dpi/ember-fire/mixins/basic-operations';
import DetectUnload from '@256dpi/ember-fire/mixins/detect-unload';

export default Controller.extend(BasicOperations, DetectUnload, {
  afterUpdateRoute: 'index',
  afterDeleteRoute: 'index',
  afterUnloadRoute: 'index',

  previews: null,

  reset() {
    this.set('previews', {});
  },

  actions: {
    store(field, file) {
      file.readAsBinaryString().then(bytes => {
        this.get('model').set(field, {
          type: file.blob.type,
          bytes: btoa(bytes)
        });
      });
    },

    upload(field, file) {
      // get access token
      let { access_token } = this.get('session.data.authenticated');

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
            this.set(`previews.${field}`, url);
            this.get('model').set(field, {
              'claim-key': keys[0]
            });
          });
        });
    },

    unset(field, type) {
      if (type === 'blob') {
        this.get('model').set(field, { type: '', bytes: '' });
      } else if (type === 'file') {
        this.set(`previews.${field}`, null);
        this.get('model').set(field, null);
      }
    }
  }
});
