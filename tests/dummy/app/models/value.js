import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  key: attr('string'),
  Data: attr(),
  deadline: attr('date'),
  locked: attr('date'),

  prettyData: computed('Data', function() {
    return JSON.stringify(this.get('Data'), null, '  ');
  })
});
