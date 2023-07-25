import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default class extends OAuth2PasswordGrant {
  clientId = 'main-key';
  serverTokenEndpoint = 'http://localhost:8000/auth/token';
  serverTokenRevocationEndpoint = 'http://localhost:8000/auth/revoke';
}
