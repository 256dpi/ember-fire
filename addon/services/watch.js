import Service from '@ember/service';
import { singularize } from 'ember-inflector';
import { inject } from '@ember/service';

export default Service.extend({
  /**
   * The main watch URL for the websocket to connect to.
   *
   * @example 'wss://example.org/v1/api/watch'
   */
  watchURL: undefined,

  /**
   * Define whether the users access token should be submitted to the endpoint.
   */
  addAccessToken: true,

  /**
   * The callback that is called to handle updates of dirty models.
   *
   * @param model The model.
   */
  handleDirtyUpdate(model) {
    // ask to continue
    alert('This model has been updated.\nWe will now reset it to reflect the latest changes.');

    // rollback and reload
    model.rollbackAttributes();
    model.reload();
  },

  /**
   * The callback that is called to handle deletion of of dirty models.
   *
   * @param model The model.
   */
  handleDirtyDelete(model) {
    // inform
    alert('This model has been deleted.\nWe will remove it to reflect the latest changes.');

    // rollback and unload
    model.rollbackAttributes();
    model.deleteRecord();
    model.unloadRecord();

    // transition to root
    this.get('routing').transitionTo('application');
  },

  /**
   * Subscribe will cache and issue the provided subscription.
   *
   * @param name The subscription name.
   * @param data The custom data object.
   * @param replace Whether a cached subscription should be replace.
   */
  subscribe(name, data, replace = true) {
    // get subscriptions
    let subscriptions = this.get('subscriptions');

    // get existing event source
    let es = subscriptions[name];

    // return if subscription exists and should not be replaced
    if (!replace && es) {
      return;
    }

    // close existing event source
    if (es) {
      es.close();
    }

    // prepare url
    let url = this.get('watchURL');

    // add stream name
    url += `?s=${name}`;

    // add data
    url += `&d=${btoa(JSON.stringify(data))}`;

    // add access token ig required
    if (this.get('addAccessToken')) {
      // get access token
      let at = this.get('session.data.authenticated.access_token');

      // add to url
      url += `&access_token=${at}`;
    }

    // create event source
    es = new EventSource(url);

    // register handler
    es.onmessage = e => {
      this.messageHandler(JSON.parse(e.data));
    };

    // store event stream
    subscriptions[name] = es;
  },

  /**
   * Unsubscribe will unsubscribe the subscription associated with the provided key.
   *
   * @param name The subscription name.
   */
  unsubscribe(name) {
    // get subscriptions
    let subscriptions = this.get('subscriptions');

    // get event source
    let es = subscriptions[name];

    // return if missing
    if (!es) {
      return;
    }

    // close event source
    es.close();

    // delete event source
    delete subscriptions[name];
  },

  /* private */

  session: inject(),
  store: inject(),

  init() {
    // call super
    this._super(...arguments);

    // initialize subscriptions
    this.set('subscriptions', {});
  },

  messageHandler(data) {
    // go through all models
    Object.keys(data).forEach(name => {
      // go through all ids
      Object.keys(data[name]).forEach(id => {
        // get singular model name
        let model = singularize(name);

        // handle event
        this.handleEvent(model, id, data[name][id]);
      });
    });
  },

  handleEvent(model, id, operation) {
    // check event operation
    switch (operation) {
      case 'create':
        this.handleCreate(model, id);
        break;
      case 'update':
        this.handleUpdate(model, id);
        break;
      case 'delete':
        this.handleDelete(model, id);
        break;
    }
  },

  handleCreate(model, id) {
    // load record
    this.get('store').findRecord(model, id);
  },

  handleUpdate(model, id) {
    // get saved record
    let record = this.get('store').peekRecord(model, id);

    // ignore not loaded records
    if (!record) {
      return;
    }

    // do not interfere with records that are currently saving
    if (record.get('currentState.isSaving')) {
      return;
    }

    // reload immediately if not dirty
    if (!record.get('hasDirtyAttributes')) {
      record.reload();
      return;
    }

    // offload dirty update handling
    this.handleDirtyUpdate(record);
  },

  handleDelete(model, id) {
    // get saved record
    let record = this.get('store').peekRecord(model, id);

    // ignore not loaded records
    if (!record) {
      return;
    }

    // unload immediately if not dirty
    if (!record.get('hasDirtyAttributes')) {
      record.deleteRecord();
      record.unloadRecord();
      return;
    }

    // offload dirty delete handling
    this.handleDirtyDelete(record);
  }
});
