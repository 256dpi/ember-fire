import { helper } from '@ember/component/helper';

function chain([...list]) {
  return async function() {
    // call functions
    for (const item of list) {
      if (!(await item())) {
        return false;
      }
    }

    return true;
  };
}

export default helper(chain);
