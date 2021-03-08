const ApiResource = require('./api_resource')

class PageableApiResource extends ApiResource {
  /**
   * @param {Ustream} context
   * @param {[]}       data     - A list of data, such as videos or channels.
   * @param {string}   dataProp - Endpoints which return paginated data will contain two properties. The first is
   *                             'paging'. The second property is holds the list of content (videos, channels, etc.).
   *                             This is the name of that second property.
   * @param {{href: {next},next}} paging
   * @param {string} pagingProp - Sometimes paginated metadata comes in a different field like for the Analytics API
   */
  constructor (context, dataProp, data, paging, pagingProp = 'paging') {
    super(context)

    this.data = data
    this.dataProp = dataProp
    this.pagingProp = pagingProp

    if (paging.next) {
      this.nextPageUrl = paging.next.href ? paging.next.href : paging.next

      // Fixing paginated urls not coming with the initial API endpoint
      if (this.nextPageUrl && !this.nextPageUrl.startsWith('http')) {
        this.nextPageUrl = this.context.getResourceUrl() + this.nextPageUrl.replace('/' + this.context.version, '');
      }
    } else {
      this.nextPageUrl = null
    }
  }

  /**
   * Checks another page of data exists.
   *
   * @return {boolean}
   */
  hasNextPage () {
    return this.nextPageUrl !== null
  }

  /**
   * Retrieves next page of data.
   *
   * @return {Promise<PageableApiResource>}
   */
  next () {
    return new Promise((resolve, reject) => {
      if (this.nextPageUrl === null) {
        resolve(null)
        return
      }

      /**
       * @var {{channels, paging}} res
       */
      this.context.authRequest('get', this.nextPageUrl)
        .then((res) => {
          resolve(new PageableApiResource(this.context, this.dataProp, res[this.dataProp], res[this.pagingProp], this.pagingProp))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * Returns page data.
   *
   * @return {*}
   */
  data () {
    return this.data
  }
}

module.exports = PageableApiResource
