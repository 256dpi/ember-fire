import Model, { attr } from '@ember-data/model';

export default class extends Model {
  @attr('string') state;
  @attr('date') updatedAt;
  @attr('string') type;
  @attr('number') length;
  @attr handle;
  @attr('string') binding;
  @attr('string') owner;

  get prettyHandle() {
    return JSON.stringify(this.handle, null, '  ');
  }
}
