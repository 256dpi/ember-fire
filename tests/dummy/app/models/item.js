import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  state: DS.attr('boolean'),
  count: DS.attr('number'),
  createToken: DS.attr('string'),
  updateToken: DS.attr('string')
});
