/**
 * Implementation of oauth implicit flow.
 *
 * @class
 */
class OAuthTokenStrategy {
  /**
   * @constructor
   *
   * @param {string} accessToken
   * @param {string} tokenType
   * @param {Number} expiresIn
   */
  constructor (accessToken, tokenType, expiresIn) {
    this.accessToken = accessToken
    this.tokenType = tokenType
    this.expiresIn = expiresIn
  }

  /**
   * Returns authorization credentials.
   *
   * @returns {Promise}
   */
  authorize () {
    return Promise.resolve({
      access_token: this.accessToken,
      token_type: this.tokenType,
      expires_in: this.expiresIn
    })
  }
}

module.exports = OAuthTokenStrategy
