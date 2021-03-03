const ClientCredentialsStrategy = require('./client_credentials_strategy')
const PasswordStrategy = require('./password_strategy')
const OAuthTokenStrategy = require('./oauth_token_strategy')
const OAuthCodeStrategy = require('./oauth_code_strategy')

/**
 * @class
 */
class AuthorizationProvider {
  /**
   * @constructor
   *
   * @param {Ustream}  context
   * @param {*} opts - Authorization flow configuration.
   */
  constructor (context, opts = {}) {
    this.context = context
    this.config = opts
    this.provider = null
  }

  /**
   * Obtain API token.
   *
   * @returns {Promise}
   */
  authorize () {
    if (this.provider === null) {
      this.provider = this.getProvider(this.config)
    }

    return this.provider.authorize()
  }

  /**
   * Gets authorization provider.
   *
   * @param {Object} opts - Credentials for a type of authorization.
   *                 opts.type - The type of authorization flow.
   */
  getProvider (opts) {
    switch (opts.type) {
      case 'client_credentials':
        return new ClientCredentialsStrategy(
          this.context, opts.client_id, opts.client_secret, opts.device_name, opts.scope, opts.token_type)
      case 'password':
        return new PasswordStrategy(this.context, opts.username, opts.password, opts.client_id, opts.client_secret, opts.token_type)
      case 'oauth_token':
        return new OAuthTokenStrategy(opts.access_token, opts.token_type, opts.expires_in)
      case 'oauth_code':
        return new OAuthCodeStrategy(this.context, opts.client_id, opts.client_secret, opts.code, opts.redirect_uri)
    }

    throw new Error('Invalid authorization type. Supported types include: ' +
      '"client_credentials, password, oauth_token, oauth_code".')
  }
}

module.exports = AuthorizationProvider
