import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrant.extend({
  clientId: 'main-key',
  serverTokenEndpoint: 'http://0.0.0.0:8000/v1/auth/token',
  serverTokenRevocationEndpoint: 'http://0.0.0.0:8000/v1/auth/revoke'
});