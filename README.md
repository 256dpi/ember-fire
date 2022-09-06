# ember-fire

[![Build Status](https://travis-ci.org/256dpi/ember-fire.svg?branch=master)](https://travis-ci.org/256dpi/ember-fire)

This add-on provides a set of tools to integrate ember with the [fire](https://github.com/256dpi/fire) framework.

## Installation

```
ember install @256dpi/ember-fire
```

## Compatibility

The current version of the addon targets the following versions:

- ember: 4.4 (LTS)
- ember-simple-auth: 4.2.2
- ember-file-upload: 7.1.0

## Services

- The [`Files`](https://github.com/256dpi/ember-fire/blob/master/addon/services/files.js) service handles uploads and
  downloads.
- The [`Store`](https://github.com/256dpi/ember-fire/blob/master/addon/services/store.js) service extends the default store.
- The [`User`](https://github.com/256dpi/ember-fire/blob/master/addon/services/user.js) service loads the model of the
  currently authenticated user.
- The [`Watch`](https://github.com/256dpi/ember-fire/blob/master/addon/services/watch.js) service manages resource
  watching.

## License

This project is licensed under the [MIT License](LICENSE.md).
