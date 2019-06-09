import Mixin from '@ember/object/mixin';

/**
 * ErrorHandling is a Controller mixin that takes care of error handling.
 */
export default Mixin.create({
  /**
   * The time after which an error is reset.
   */
  errorTimeout: 5000,

  /**
   * Holds the timeout id for an eventual clearTimeout() call.
   */
  currentTimeout: null,

  /**
   * Will parse the error and put a message in the "error" property.
   *
   * @param failure The error.
   */
  setError(failure) {
    // oauth2 errors
    if (failure && failure['error_description']) {
      this.set('error', failure['error_description']);
    } else if (failure && failure['error']) {
      this.set('error', failure['error']);
    }

    // json api errors
    else if (failure && failure['errors'] && failure['errors'].length > 0) {
      this.set('error', failure['errors'][0].detail || failure['errors'][0].title);
    }

    // fallback
    else if (failure) {
      this.set('error', failure.toString());
    }

    // last fallback
    else {
      this.set('error', 'unknown error');
    }

    // clear current timeout if existing
    if (this.get('currentTimeout')) {
      clearTimeout(this.get('currentTimeout'));
    }

    // remove error after a timeout
    let timeout = setTimeout(() => {
      // reset error
      this.set('error', undefined);

      // reset timeout
      this.set('currentTimeout', null);
    }, this.get('errorTimeout'));

    // store timeout
    this.set('currentTimeout', timeout);
  }
});
