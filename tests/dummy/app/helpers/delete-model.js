import { helper } from '@ember/component/helper';

import { getError } from '@256dpi/ember-fire/utils';

function deleteModel([model]) {
  return async () => {
    try {
      // destroy record
      await model.destroyRecord();

      // unload record
      model.unloadRecord();

      return true;
    } catch (err) {
      // handle error
      alert(getError(err));

      return false;
    }
  };
}

export default helper(deleteModel);
