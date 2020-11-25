import Model, { attr } from '@ember-data/model';

export default class extends Model {
  @attr('string') name;
  @attr('boolean') state;
  @attr('number') count;
  @attr('file-link') file;
  @attr('string') createToken;
  @attr('string') updateToken;
}
