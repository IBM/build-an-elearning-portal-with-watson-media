/* eslint-disable quotes */
const qs = require('qs')

/**
 * Implementation of authorization code flow.
 *
 * @class
 */
class OauthCodeStrategy {
  /**
   * @constructor
   *
   * @param {Ustream} context
   * @param {string} clientId
   * @param {string} clientSecret
   * @param {string} code
   * @param {string} redurectUri
   */
  constructor (context, clientId, clientSecret, code, redurectUri) {
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.code = code
    this.redirectUri = redurectUri
    this.context = context
  }

  /**
   * Authorizes request auth code.
   *
   * @returns {Promise}
   */
  authorize () {
    return this.context.httpClient.requestRaw(
      'post',
      `${this.context.getAuthUrl()}/oauth2/token`,
      qs.stringify({
        grant_type: 'authorization_code',
        client_id: this.clientId,
        code: this.code,
        redirect_uri: this.redirectUri
      }),
      {
        'Authorization': `Basic ${this.clientSecret}`
      })
  }
}

module.exports = OauthCodeStrategy
