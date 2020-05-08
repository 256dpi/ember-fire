import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default class extends OAuth2PasswordGrant {
  clientId = 'main-key';
  serverTokenEndpoint = 'http://0.0.0.0:8000/auth/token';
  serverTokenRevocationEndpoint = 'http://0.0.0.0:8000/auth/revoke';
}
