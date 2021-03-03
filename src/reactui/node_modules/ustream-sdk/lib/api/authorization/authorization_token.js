/**
 * @class
 */
class AuthorizationToken {
  /**
   * @constructor
   *
   * @param {string} opts.accessToken
   * @param {Number} opts.expiresIn
   * @param {string} opts.tokenType
   */
  constructor (opts) {
    this.access_token = opts.accessToken
    this.type = opts.tokenType
    this.life = opts.expiresIn
    this._expiration = Date.now() + this.life
  }

  /**
   * Returns true if token is expired.
   *
   * @returns {boolean}
   */
  isExpired () {
    return (Date.now() >= this._expiration)
  }
}

module.exports = AuthorizationToken
