import Controller from '@ember/controller';

import BasicOperations from '@256dpi/ember-fire/mixins/basic-operations';
import DetectUnload from '@256dpi/ember-fire/mixins/detect-unload';

export default Controller.extend(BasicOperations, DetectUnload, {
  afterUpdateRoute: 'index',
  afterDeleteRoute: 'index',
  afterUnloadRoute: 'index'
});
