import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  name: attr('string'),
  label: attr('string'),
  Data: attr(),
  status: attr('string'),
  createdAt: attr('date'),
  availableAt: attr('date'),
  startedAt: attr('date'),
  endedAt: attr('date'),
  finishedAt: attr('date'),
  attempts: attr('number'),
  events: attr(),

  prettyData: computed('Data', function() {
    return JSON.stringify(this.get('Data'), null, '  ');
  })
});
