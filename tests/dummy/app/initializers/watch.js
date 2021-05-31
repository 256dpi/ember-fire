export default {
  name: 'watch',
  initialize(app) {
    app.inject('route', 'watch', 'service:watch');
    app.inject('controller', 'watch', 'service:watch');
    app.inject('component', 'watch', 'service:watch');
  },
};
