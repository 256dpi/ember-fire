import Service from '@ember/service';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { singularize } from 'ember-inflector';
import { inject } from '@ember/service';

import ReconnectingWebsocket from 'reconnecting-websocket';

export default Service.extend({
  session: inject(),
  store: inject(),

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
   * Connection Status is set with the websocket connection status.
   */
  connectionStatus: false,

  websocket: null,

  init() {
    // call super
    this._super(...arguments);

    // initialize subscriptions
    this.set('subscriptions', {});
  },

  ___initializer: on('init', observer('session.isAuthenticated', function() {
    // asses whether a connection should be made
    let connect = !this.get('requireAccessToken') || this.get('session.isAuthenticated');

    // get current websocket
    let ws = this.get('websocket');

    // handle case where we should not be connected (no authenticated)
    if (!connect) {
      // close current websocket if existing
      if (ws) {
        ws.close();
      }

      // reset websocket
      this.set('websocket', null);

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
    ws = new ReconnectingWebsocket(url);

    // add connect listener
    ws.addEventListener('open', () => {
      this.openHandler();
    });

    // add close listener
    ws.addEventListener('close',() => {
      this.closeHandler();
    });

    // add message listener
    ws.addEventListener('message',e => {
      this.messageHandler(JSON.parse(e.data));
    });

    // save websocket
    this.set('websocket', ws);
  })),

  /**
   * Subscribe will cache and issue the provided subscription.
   *
   * @param key The custom key.
   * @param watchToken The obtained watch token.
   */
  subscribe(key, watchToken) {
    // get subscriptions
    let subscriptions = this.get('subscriptions');

    // store subscription
    subscriptions[key] = watchToken;

    // get websocket
    let ws = this.websocket;

    // return if not available
    if (!ws) {
      return;
    }

    // prepare subscription
    let sub = {
      subscribe: {
        key: watchToken,
      }
    };

    // send subscription
    ws.send(JSON.stringify(sub));
  },

  /**
   * Unsubscribe will unsubscribe the subscription associated with the provided key.
   *
   * @param key THe custom key.
   */
  unsubscribe(key) {
    // get subscriptions
    let subscriptions = this.get('subscriptions');

    // delete subscription
    delete subscriptions[key];

    // get websocket
    let ws = this.websocket;

    // return if not available
    if (!ws) {
      return;
    }

    // prepare unsubscription
    let unsub = {
      unsubscribe: [key],
    };

    // send subscription
    ws.send(JSON.stringify(unsub));
  },

  openHandler() {
    // set flag
    this.set('connectionStatus', true);
  },

  closeHandler() {
    // set flag
    this.set('connectionStatus', false);
  },

  messageHandler(data) {
    console.log(data);

    //let model = singularize(msg['name']);

    // TODO: Ignore notifications from this instance and remove delay.

    // delay processing for one second to ensure the originator has caught up
    // setTimeout(() => {
    //   switch (msg['action']) {
    //     case 'create':
    //       this.handleCreate(model, msg['id']);
    //       break;
    //     case 'update':
    //       this.handleUpdate(model, msg['id']);
    //       break;
    //     case 'delete':
    //       this.handleDelete(model, msg['id']);
    //       break;
    //   }
    // }, 500);
  },

  // handleCreate(model, id) {
  //   // TODO: We should only receive ids we have access to. Otherwise the app
  //   // will raise errors all the time.
  //
  //   // set last update
  //   this.set('lastUpdate', Date.now());
  //
  //   // load record
  //   this.get('store').findRecord(model, id);
  // },
  //
  // handleUpdate(model, id) {
  //   // get saved record
  //   let record = this.get('store').peekRecord(model, id);
  //
  //   // ignore not loaded records
  //   if (!record) {
  //     return;
  //   }
  //
  //   // set last update
  //   this.set('lastUpdate', Date.now());
  //
  //   // do not play with records that are currently saving
  //   if (record.get('currentState.isSaving')) {
  //     return;
  //   }
  //
  //   // reload immediately if not dirty
  //   if (!record.get('hasDirtyAttributes')) {
  //     record.reload();
  //     return;
  //   }
  //
  //   // ask to continue
  //   alert('This record has been UPDATED by someone else.\nWe will now update it to reflect the latest changes.');
  //
  //   // rollback and reload
  //   record.rollbackAttributes();
  //   record.reload();
  // },
  //
  // handleDelete(model, id) {
  //   // get saved record
  //   let record = this.get('store').peekRecord(model, id);
  //
  //   // ignore not loaded records
  //   if (!record) {
  //     return;
  //   }
  //
  //   // set last update
  //   this.set('lastUpdate', Date.now());
  //
  //   // unload immediately if not dirty
  //   if (!record.get('hasDirtyAttributes')) {
  //     record.unloadRecord();
  //     return;
  //   }
  //
  //   // inform
  //   alert('This record has been DELETED by someone else.\nWe will remove it to reflect the latest changes.');
  //
  //   // rollback and unload
  //   record.rollbackAttributes();
  //   record.unloadRecord();
  //
  //   // transition to root
  //   this.get('routing').transitionTo('application');
  // }
});
