import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { getError } from '@256dpi/ember-fire/utils';

export default class extends Controller {
  @service session;

  @tracked email = '';
  @tracked password = '';

  @action
  signIn(e) {
    e.preventDefault();
    this.session
      .authenticate('authenticator:oauth2', this.email, this.password)
      .catch((err) => {
        alert(getError(err));
      });
  }
}
