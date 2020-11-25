import Controller from '@ember/controller';
import BasicOperations from '@256dpi/ember-fire/mixins/basic-operations';
import DetectUnload from '@256dpi/ember-fire/mixins/detect-unload';
import { inject as service } from '@ember/service';

export default class extends Controller.extend(BasicOperations, DetectUnload) {
  @service files;

  afterUpdateRoute = 'index';
  afterDeleteRoute = 'index';
  afterUnloadRoute = 'index';
}
