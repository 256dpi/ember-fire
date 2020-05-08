import Model, { attr } from '@ember-data/model';

export default class extends Model {
  @attr('string') key;
  @attr Data;
  @attr('date') deadline;
  @attr('date') locked;

  get prettyData() {
    return JSON.stringify(this.Data, null, '  ');
  }
}
