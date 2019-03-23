import Service from '@ember/service';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { singularize } from 'ember-inflector';
import { inject } from '@ember/service';

import ReconnectingWebsocket from 'reconnecting-websocket';

/**
 * The Watch service manages resource watching.
 */
export default Service.extend({
  /**
   * The main watch URL for the websocket to connect to.
   *
   * @example 'wss://example.org/v1/api/watch'
   */
  watchURL: undefined,

  /**
   * This setting controls whether the watch endpoint requires authentication using an access token.
   */
  requireAccessToken: true,

  /**
   * Is set to true if the websocket is successfully.
   */
  connected: false,

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

    // return if subscription exists and should not be replaced
    if (!replace && subscriptions[name]) {
      return;
    }

    // store subscription
    subscriptions[name] = data;

    // get websocket
    let ws = this.websocket;

    // return if not available
    if (!ws || !this.get('connected')) {
      return;
    }

    // prepare command
    let cmd = {
      subscribe: {}
    };

    // add subscription
    cmd.subscribe[name] = data;

    // send command
    ws.send(JSON.stringify(cmd));
  },

  /**
   * Unsubscribe will unsubscribe the subscription associated with the provided key.
   *
   * @param name The subscription name.
   */
  unsubscribe(name) {
    // get subscriptions
    let subscriptions = this.get('subscriptions');

    // delete subscription
    delete subscriptions[name];

    // get websocket
    let ws = this.websocket;

    // return if not available
    if (!ws || !this.get('connected')) {
      return;
    }

    // prepare command
    let cmd = {
      unsubscribe: [name]
    };

    // send command
    ws.send(JSON.stringify(cmd));
  },

  /* private */

  session: inject(),
  store: inject(),

  websocket: null,

  init() {
    // call super
    this._super(...arguments);

    // initialize subscriptions
    this.set('subscriptions', {});
  },

  _initializer: on(
    'init',
    observer('session.isAuthenticated', function() {
      // asses whether a connection should be made
      let connect = !this.get('requireAccessToken') || this.get('session.isAuthenticated');

      // get current websocket
      let ws = this.get('websocket');

      // handle case where we should not be connected (no authenticated)
      if (!connect) {
        // close current websocket if existing
        if (ws) {
          ws.close();
          this.set('websocket', null);
        }

        return;
      }

      // return if we are already connected
      if (ws) {
        return;
      }

      // prepare url
      let url = this.get('watchURL');

      // add access token if required
      if (this.get('requireAccessToken')) {
        // get access token
        let at = this.get('session.data.authenticated.access_token');

        // add to url
        url += `?access_token=${at}`;
      }

      // create new websocket
      ws = new ReconnectingWebsocket(url, [], {
        maxReconnectionDelay: 5000,
        minReconnectionDelay: 50,
        minUptime: 5000,
        reconnectionDelayGrowFactor: 2,
        connectionTimeout: 4000,
        maxRetries: Infinity,
        debug: false
      });

      // add connect listener
      ws.addEventListener('open', () => {
        this.openHandler();
      });

      // add close listener
      ws.addEventListener('close', () => {
        this.closeHandler();
      });

      // add message listener
      ws.addEventListener('message', e => {
        this.messageHandler(JSON.parse(e.data));
      });

      // save websocket
      this.set('websocket', ws);
    })
  ),

  openHandler() {
    // set flag
    this.set('connected', true);

    // resubscribe cached subscriptions

    // get subscriptions
    let subscriptions = this.get('subscriptions');

    // get websocket
    let ws = this.websocket;

    // prepare subscription
    let cmd = {
      subscribe: {}
    };

    // add sub
    Object.keys(subscriptions).forEach(name => {
      cmd.subscribe[name] = subscriptions[name];
    });

    // send subscription
    ws.send(JSON.stringify(cmd));
  },

  closeHandler() {
    // set flag
    this.set('connected', false);
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
      case 'created':
        this.handleCreate(model, id);
        break;
      case 'updated':
        this.handleUpdate(model, id);
        break;
      case 'deleted':
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
