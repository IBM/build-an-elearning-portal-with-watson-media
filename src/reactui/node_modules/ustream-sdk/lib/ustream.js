const AuthorizationToken = require('./api/authorization/authorization_token')
const RequestClient = require('./http/request_client')
const AuthorizationProvider = require('./api/authorization/authorization_provider')
const VideoApi = require('./api/video')
const ViewApi = require('./api/view')
const ViewerApi = require('./api/viewer')
const ChannelApi = require('./api/channel')
const Playlist = require('./api/playlist')
const User = require('./api/user')
const CustomMetadata = require('./api/custom_metadata')
const DevicePasswords = require('./api/device_passwords')

const API_AUTH_ENDPOINT = 'https://www.ustream.tv'
const API_RESOURCE_ENDPOINT = 'https://api.Ustream.tv'

/**
 * @class
 */
class Ustream {
  /**
   * @constructor
   *
   * @param {*} opts - Authorization credentials.
   *
   * @see authenticate for additional information about opts.
   */
  constructor (opts) {
    this.endpoint = opts.endpoint || API_RESOURCE_ENDPOINT;

    this.tokenType = opts.token_type
    this.version = opts.version

    this.authToken = null
    this.httpClient = new RequestClient(this.getResourceUrl())
    this._authProvider = new AuthorizationProvider(this, opts)

    // Initialize APIs.
    this.channel = new ChannelApi(this)
    this.customMetadata = new CustomMetadata(this)
    this.playlist = new Playlist(this)
    this.user = new User(this)
    this.video = new VideoApi(this)
    this.view = new ViewApi(this)
    this.viewer = new ViewerApi(this)
    this.devicePasswords = new DevicePasswords(this)
  }

  /**
   * Sets authorization credentials.
   *
   * @param {Object} opts - A map of credentials.
   *
   * #### Examples
   *
   * Ustream.setAuthCredentials({
   *     type: "password",
   *     username: "<username>",
   *     password: "<password>",
   *     clientId: "<client ID>",
   *     clientSecret: "<client secret>"
   * })
   */
  setAuthCredentials (opts) {
    this._authProvider = new AuthorizationProvider(this, opts)
  }

  /**
   * @param {boolean} force - If true, the access credentials will be
   *  re-authorized even if a valid authorization token exists for those
   *  credentials.
   */
  authorize (force = false) {
    if (!this._isAuthorized() || force) {
      return this._authProvider.authorize()
        .then((res, err) => {
          if (err) {
            return Promise.reject(new Error('Ustream authentication failed.'))
          }

          this.authToken = new AuthorizationToken({
            accessToken: res.access_token,
            tokenType: res.token_type,
            expiresIn: res.expires_in
          })

          return Promise.resolve()
        })
    } else {
      return Promise.resolve()
    }
  }

  /**
   * Send an API request.
   *
   * @param {string}   verb
   * @param {string}   route
   * @param {{}}       data
   * @param {{}}       headers
   */
  request (verb, route, data, headers) {
    return this.httpClient.request(verb, route, data, headers)
  }

  /**
   * Send an API request which requires authorization credentials.
   *
   * @param verb
   * @param route
   * @param data
   * @param headers
   */
  authRequest (verb, route, data, headers) {
    return this.authorize(false).then(() => {
      return this.request(verb, route, data, this._buildAuthHeaders(headers))
    })
  }

  /**
   * Send an API request which requires authorization credentials. Includes
   * request headers in result set.
   *
   * @param verb
   * @param route
   * @param data
   * @param headers
   */
  authRequestWithHeaders (verb, route, data, headers) {
    return this.authorize(false).then(() =>
      this.httpClient.requestWithHeaders(
        verb, route, data, this._buildAuthHeaders(headers)))
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Returns authorization endpoint.
   *
   * @returns {string}
   *
   */
  getAuthUrl () {
    return this.endpoint.indexOf('video.ibm.com') !== -1 ? 'https://video.ibm.com' : API_AUTH_ENDPOINT
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Returns resource endpoint.
   *
   * @returns {string}
   */
  getResourceUrl () {
    return this.version ? `${this.endpoint}/${this.version}` : this.endpoint;
  }

  /**
   * Adds authorization header to headers object.
   *
   * @param {{}} headers
   * @returns {{}}
   * @private
   */
  _buildAuthHeaders (headers = {}) {
    headers['Authorization'] = this.tokenType === 'jwt'
        ? `${this.authToken.access_token}`
        : `Bearer ${this.authToken.access_token}`
    return headers
  }

  /**
   * Returns true if client is authorized to send requests to protected routes.
   *
   * The result is determined by the presence and validity of an authentication
   * token.
   *
   * @returns {boolean}
   * @private
   */
  _isAuthorized () {
    return (this.authToken !== null && !this.authToken.isExpired())
  }
}

module.exports = Ustream
