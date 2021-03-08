const qs = require('qs')

/**
 * Implementation of password authentication.
 *
 * @class
 * @See "Resource Owner Password Credentials flow" section of documentation.
 */
class PasswordStrategy {
  /**
   * @constructor
   *
   * @param {Ustream} context
   * @param {string} username      - Ustream account username.
   * @param {string} password      - Ustream account password.
   * @param {string} clientId      - API client ID.
   * @param {string} clientSecret  - API client secret.
   * @param {string} tokenType     - API token type.
   */
  constructor (context, username, password, clientId, clientSecret, tokenType = 'bearer') {
    this.username = username
    this.password = password
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.tokenType = tokenType
    this.context = context
  }

  /**
   * Authorizes request using Ustream account credentials.
   *
   * @returns {Promise}
   */
  authorize () {
    return this.context.httpClient.requestRaw('post', `${this.context.getAuthUrl()}/oauth2/token`, qs.stringify({
      grant_type: 'password',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      username: this.username,
      password: this.password,
      token_type: this.tokenType
    }))
  }
}

module.exports = PasswordStrategy
