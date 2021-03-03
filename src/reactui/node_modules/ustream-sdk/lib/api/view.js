const ApiResource = require('./api_resource')
const PageableApiResource = require('./pageable_api_resource')
const qs = require('qs')

/**
 * Class View
 *
 * Implementation of Ustream's analytic API for views.
 *
 * @class
 * @link https://developers.video.ibm.com/analytics-api/views/
 */
class View extends ApiResource {

  /**
   * Lists all raw views segments in a time period.
   *
   * @param {Number} pageSize                        - The number of results to show per page.
   * @param {Number} page                            - The page to retrieve.
   * 
   * @param {string} opts.date_time_from             - Start date for the query period in ISO8601.
   * @param {string} opts.date_time_to               - End date for the query period in ISO8601.
   * @param {boolean} opts.list_unfinished_segments  - Listing or not the unfinished segments, default is true.
   * @param {boolean} opts.inclusive_range           - Including or not the period delimiters (from & to dates), default is true.
   * @returns {Promise}
   */
  list (opts = {}, pageSize = 100, page = 1) {
    opts._page = page;
    opts._limit = pageSize;
    
    /** @var {{data, pagination}} res */
    return this.context.authRequest(
      'get',
      `/views?${qs.stringify(opts)}`)
      .then((res) => {
        return Promise.resolve(new PageableApiResource(this.context, 'data',
          res.data, res.pagination, 'pagination'))
      })
  }

  /**
   * Lists all raw views segments in a time period for a specific content type.
   *
   * @param {Number} contentType                     - Should be either live or recorded.
   * 
   * @param {Number} pageSize                        - The number of results to show per page.
   * @param {Number} page                            - The page to retrieve.
   * 
   * @param {string} opts.content_id                 - Targetting specific contents (live or recorded videos) by providing some comma-separated IDs.
   * @param {string} opts.date_time_from             - Start date for the query period in ISO8601.
   * @param {string} opts.date_time_to               - End date for the query period in ISO8601.
   * @param {boolean} opts.list_unfinished_segments  - Listing or not the unfinished segments, default is true.
   * @param {boolean} opts.inclusive_range           - Including or not the period delimiters (from & to dates), default is true.
   * @returns {Promise}
   */
  listByContentType (contentType, opts = {}, pageSize = 100, page = 1) {
    opts._page = page;
    opts._limit = pageSize;
    
    /** @var {{data, pagination}} res */
    return this.context.authRequest(
      'get',
      `/views/${contentType}?${qs.stringify(opts)}`)
      .then((res) => {
        return Promise.resolve(new PageableApiResource(this.context, 'data',
          res.data, res.pagination, 'pagination'))
      })
  }

}

module.exports = View
