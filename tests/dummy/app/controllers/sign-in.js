import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { getError } from '@256dpi/ember-fire/utils';

export default class extends Controller {
  @tracked email = '';
  @tracked password = '';

  @action
  signIn() {
    this.session.authenticate('authenticator:oauth2', this.email, this.password).catch((err) => {
      alert(getError(err));
    });
  }
}
