import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  state: attr('string'),
  updatedAt: attr('date'),
  type: attr('string'),
  length: attr('number'),
  Data: attr(),

  prettyData: computed('Data', function() {
    return JSON.stringify(this.get('Data'), null, '  ');
  })
});
