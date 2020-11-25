import Controller from '@ember/controller';
import BasicOperations from '@256dpi/ember-fire/mixins/basic-operations';
import { inject as service } from '@ember/service';

export default class extends Controller.extend(BasicOperations) {
  @service files;

  afterCreateRoute = 'index';
}
