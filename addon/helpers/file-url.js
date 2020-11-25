import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class Transition extends Helper {
  @service files;

  compute([link]) {
    return this.files.url(link);
  }
}
