import Model, { attr } from '@ember-data/model';

export default class extends Model {
  @attr('string') state;
  @attr('date') updatedAt;
  @attr('string') type;
  @attr('number') length;
  @attr handle;

  get prettyHandle() {
    return JSON.stringify(this.handle, null, '  ');
  }
}
