const ApiResource = require('./api_resource')
const PageableApiResource = require('./pageable_api_resource')
const qs = require('qs')

/**
 * Class Viewer
 *
 * Implementation of Ustream's analytic API for viewers.
 *
 * @class
 * @link https://developers.video.ibm.com/analytics-api/viewers
 */
class Viewer extends ApiResource {

  /**
   * List of the unique viewers for all contents.
   *
   * @param {Number} pageSize                         - The number of results to show per page.
   * @param {Number} page                             - The page to retrieve.
   * 
   * @param {string} opts.viewer_identifier           - Targetting a specific viewer by specifying its identifier.
   * @param {string} opts.date_time_from              - Start date for the query period in ISO8601.
   * @param {string} opts.date_time_to                - End date for the query period in ISO8601.
   * @param {boolean} opts.list_unfinished_segments   - Listing or not the unfinished segments, default is true.
   * @returns {Promise}
   */
  list (opts = {}, pageSize = 100, page = 1) {
    opts._page = page;
    opts._limit = pageSize;
    
    /** @var {{data, pagination}} res */
    return this.context.authRequest(
      'get',
      `/viewers?${qs.stringify(opts)}`)
      .then((res) => {
        return Promise.resolve(new PageableApiResource(this.context, 'data',
          res.data, res.pagination, 'pagination'))
      })
  }

  /**
   * List of the unique viewers for a specific content type.
   *
   * @param {Number} contentType                      - Should be either live or recorded.
   * 
   * @param {Number} pageSize                         - The number of results to show per page.
   * @param {Number} page                             - The page to retrieve.
   * 
   * @param {string} opts.content_id                  - Targetting specific contents (live or recorded videos) by providing some comma-separated IDs.
   * @param {string} opts.viewer_identifier           - Targetting a specific viewer by specifying its identifier.
   * @param {string} opts.date_time_from              - Start date for the query period in ISO8601.
   * @param {string} opts.date_time_to                - End date for the query period in ISO8601.
   * @param {boolean} opts.list_unfinished_segments   - Listing or not the unfinished segments, default is true.
   * @returns {Promise}
   */
  listByContentType (contentType, opts = {}, pageSize = 100, page = 1) {
    opts._page = page;
    opts._limit = pageSize;
    
    /** @var {{data, pagination}} res */
    return this.context.authRequest(
      'get',
      `/viewers/${contentType}?${qs.stringify(opts)}`)
      .then((res) => {
        return Promise.resolve(new PageableApiResource(this.context, 'data',
          res.data, res.pagination, 'pagination'))
      })
  }

}

module.exports = Viewer
