export default {
  name: 'user',
  initialize(app) {
    app.inject('route', 'user', 'service:user');
    app.inject('controller', 'user', 'service:user');
    app.inject('component', 'user', 'service:user');
  }
};
