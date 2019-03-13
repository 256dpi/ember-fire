import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    signOut() {
      // invalidate session
      this.get('session').invalidate();
    }
  }
});
