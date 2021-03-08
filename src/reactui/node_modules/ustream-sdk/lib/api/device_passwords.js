const ApiResource = require('./api_resource')
const qs = require('qs')

/**
 * @class DevicePasswords
 */
class DevicePasswords extends ApiResource {

  /**
   * Creates a device password
   *
   * @param {string}    device_name       - Device name
   * @param {{}}        opts
   * @param {string}    opts.valid_from   - The timestamp after which the device password is valid
   * @param {string}    opts.valid_until  - The timestamp until the device password is valid
   *
   * @returns {*}
   */
  create (deviceName, opts = {}) {
    opts.device_name = deviceName
    return this.context.authRequest('post', '/users/self/device-passwords.json', qs.stringify(opts))
  }

  /**
   * Lists device passwords with pagination
   *
   * @param {Number} pagesize  - The number of results to show per page.
   * @param {Number} page      - The page to retrieve.
   * @returns {Promise}
   */
  list (pagesize = 100, page = 1) {
    /** @var {{device_passwords, paging}} res */
    return this.context.authRequest(
      'get',
      `/users/self/device-passwords.json${qs.stringify({pagesize, page})}`)
      .then((res) => {
        return Promise.resolve(new PageableApiResource(this.context, 'device_passwords',
          res.device_passwords, res.paging))
      })
  }

  /**
   * Deletes an existing device password by its username.
   *
   * @param {String} userName
   *
   * @returns {Promise}
   */
  remove (userName) {
    return this.context.authRequest('delete', `/users/self/device-passwords/${userName}.json`)
  }
}

module.exports = DevicePasswords
