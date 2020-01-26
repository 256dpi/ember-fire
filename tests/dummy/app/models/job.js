import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr('string'),
  label: DS.attr('string'),
  Data: DS.attr(),
  status: DS.attr('string'),
  createdAt: DS.attr('date'),
  availableAt: DS.attr('date'),
  startedAt: DS.attr('date'),
  endedAt: DS.attr('date'),
  finishedAt: DS.attr('date'),
  attempts: DS.attr('number'),
  result: DS.attr(),
  reason: DS.attr('string'),

  prettyData: computed('Data', function() {
    return JSON.stringify(this.get('Data'), null, '  ');
  }),
  prettyResult: computed('result', function() {
    return JSON.stringify(this.get('result'), null, '  ');
  })
});
