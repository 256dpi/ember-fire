import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-in');
  this.route('authorize');
  this.route('return');
  this.route('new');
  this.route('edit', { path: ':item_id' });
});

export default Router;
