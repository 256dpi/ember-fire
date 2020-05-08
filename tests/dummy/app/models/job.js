import Model, { attr } from '@ember-data/model';

export default class extends Model {
  @attr('string') name;
  @attr('string') label;
  @attr Data;
  @attr('string') status;
  @attr('date') createdAt;
  @attr('date') availableAt;
  @attr('date') startedAt;
  @attr('date') endedAt;
  @attr('date') finishedAt;
  @attr('number') attempts;
  @attr events;

  get prettyData() {
    return JSON.stringify(this.Data, null, '  ');
  }
}
