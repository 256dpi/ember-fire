import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  component: DS.attr('string'),
  name: DS.attr('string'),
  Data: DS.attr(),
  deadline: DS.attr('date'),
  locked: DS.attr('date'),

  prettyData: computed('Data', function() {
    return JSON.stringify(this.get('Data'), null, '  ');
  })
});
