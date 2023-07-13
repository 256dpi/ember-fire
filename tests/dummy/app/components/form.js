import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  get dirty() {
    // determine if dirty
    if (this.args.changeset) {
      return this.args.changeset.isDirty;
    } else {
      return this.args.model.hasDirtyAttributes;
    }
  }

  @action submit(e) {
    e.preventDefault();

    // call callback
    this.args.onSubmit();
  }

  @action reset() {
    // rollback attributes
    if (this.args.changeset) {
      this.args.changeset.rollback();
    } else {
      this.args.model.rollbackAttributes();
    }
  }

  @action cancel() {
    // handle unsaved new models
    if (this.args.model.isNew) {
      this.args.model.unloadRecord();
    } else if (this.dirty) {
      this.reset();
    }

    // call callback
    this.args.onCancel();
  }
}
