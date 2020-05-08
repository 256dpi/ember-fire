# ember-fire

[![Build Status](https://travis-ci.org/256dpi/ember-fire.svg?branch=master)](https://travis-ci.org/256dpi/ember-fire)

This add-on provides a set of tools to integrate ember with the [fire](https://github.com/256dpi/fire) framework.

## Installation

```
ember install @256dpi/ember-fire
```

## Mixins

- The [`AutomaticRollback`](https://github.com/256dpi/ember-fire/blob/master/addon/mixins/automatic-rollback.js) mixin
  is a `Route` mixin that on every transition tries to automatically rollback eventual changes to the model. If the model
  has dirty attributes it will consult the `abandonCallback` method and abort the transition or revert changes. Unsaved
  models are unloaded from the store.

- The [`BasicOperations`](https://github.com/256dpi/ember-fire/blob/master/addon/mixins/basic-operations.js) mixin is a
  `Controller` mixin that takes care of the common model actions: create, update and delete.

- The [`CustomActions`](https://github.com/256dpi/ember-fire/blob/master/addon/mixins/custom-actions.js) mixin is a
  `Store` mixin that provides methods to call group, collection and resource actions.

- The [`DetectUnload`](https://github.com/256dpi/ember-fire/blob/master/addon/mixins/detect-unload.js) mixin is a
  `Controller` mixin that detects if a model gets unloaded and will perform a transition to the `afterUnloadRoute`.
  The `announceDelete` method must be called before destroying, deleting or unloading a record to prevent duplicate
  transitions.

- The [`ErrorHandling`](https://github.com/256dpi/ember-fire/blob/master/addon/mixins/error-handling.js) mixin is a
  `Controller` mixin that takes care of error handling.

- The [`FilterRecords`](https://github.com/256dpi/ember-fire/blob/master/addon/mixins/filter-records.js) mixin is a
  `Store` mixin that allows filtering of records.

## Services

- The [`User`](https://github.com/256dpi/ember-fire/blob/master/addon/services/user.js) service loads the model of the
  currently authenticated user.

- The [`Watch`](https://github.com/256dpi/ember-fire/blob/master/addon/services/watch.js) service manages resource
  watching.

## License

This project is licensed under the [MIT License](LICENSE.md).
