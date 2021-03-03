const ApiResource = require('./api_resource')
const PageableApiResource = require('./pageable_api_resource')
const qs = require('qs')

/**
 * @class User
 */
class User extends ApiResource {
  /**
   * Creates a new label.
   *
   * @param {string} labelName - The name of the label.
   * @returns {Promise}
   */
  createLabel (labelName) {
    return this.context.authRequest(
      'post', `/users/self/labels.json`, qs.stringify({label_name: labelName}))
  }

  /**
   * Lists all labels.
   *
   * @returns {Promise}
   */
  listLabels () {
    return this.context.authRequest('get', '/users/self/labels.json')
  }

  /**
   * Modify an existing label's fields.
   *
   * @param {number} labelId - The ID of an existing label.
   * @param {string} labelName - The value to replace the label's current name.
   * @returns {Promise}
   */
  modifyLabel (labelId, labelName) {
    return this.context.authRequest(
      'put', `/users/self/label/${labelId}.json`, qs.stringify({label_name: labelName}))
  }

  /**
   * Delete an existing label.
   *
   * @param {number} labelId - The ID of an existing label.
   * @returns {Promise}
   */
  deleteLabel (labelId) {
    return this.context.authRequest('delete', `/users/self/label/${labelId}.json`)
  }

  /**
   * Lists all videos on the account.
   *
   * @param {Number} pageSize - The number of results to show per page.
   * @param {Number} page - The page to retrieve.
   *
   * @returns {Promise}
   */
  listVideos (pageSize = 100, page = 1) {
    /** @var {{videos, paging}} res */
    return this.context.authRequest(
      'get',
      `/users/self/videos.json?${qs.stringify({pagesize: pageSize, page})}`)
      .then((res) => {
        return Promise.resolve(new PageableApiResource(this.context, 'videos',
          res.videos, res.paging))
      })
  }
}

module.exports = User
