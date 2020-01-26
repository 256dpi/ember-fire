import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  state: DS.attr('string'),
  updatedAt: DS.attr('date'),
  type: DS.attr('string'),
  length: DS.attr('number'),
  Data: DS.attr(),

  prettyData: computed('Data', function() {
    return JSON.stringify(this.get('Data'), null, '  ');
  })
});
