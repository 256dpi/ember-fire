import Mixin from '@ember/object/mixin';

// ErrorHandling is a controller mixin that takes care of error handling.
export default Mixin.create({
  setError(failure) {
    // oauth2 errors
    if (failure['error_description']) {
      this.set('error', failure['error_description']);
    } else if (failure['error']) {
      this.set('error', failure['error']);
    }

    // json api errors
    else if (failure['errors'] && failure['errors'].length > 0) {
      this.set('error', failure['errors'][0].detail || failure['errors'][0].title);
    }

    // fallback
    else {
      this.set('error', failure.toString());
    }

    // remove error after 5 seconds
    setTimeout(() => {
      this.set('error', undefined);
    }, 5000);
  }
});
