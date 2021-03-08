const ApiResource = require('./api_resource')
const PageableApiResource = require('./pageable_api_resource')
const qs = require('qs')

/**
 * @class Playlist
 */
class Playlist extends ApiResource {
  /**
   * Retrieves flag if playlist is available for a specific channel.
   *
   * @param {Number}    channelId
   *
   * @returns {*}
   */
  isEnabled (channelId) {
    return this.context.authRequest('get', `/channels/${channelId}/settings/playlists.json`)
      .then((res) => {
        return Promise.resolve(res.isEnabled)
      })
  }

  /**
   * Lists all Playlists on an channel.
   *
   * @param {Number} pagesize - The number of results to show per page.
   * @param {Number} page     - The page to retrieve.
   * @param {boolean} includeEmptyLists   - Should empty playlists be returned.
   * @returns {Promise}
   */
  list (channelId, pagesize = 50, page = 1, includeEmptyLists = false) {
    pagesize = Math.min(pagesize, 50)
    return this.context.authRequest('get', `/channels/${channelId}/playlists.json?${qs.stringify({
      pagesize,
      page,
      filter: {
        include_empty: includeEmptyLists
      }
    })}`)
      .then((res) => {
        return Promise.resolve(new PageableApiResource(this.context, 'playlists', res.playlists, res.paging))
      })
  }

  /**
   * Lists all videos in a Playlist
   *
   * @param {Number} playlistId
   * @param {Number} pagesize - The number of results to show per page.
   * @param {Number} page     - The page to retrieve.
   *
   * @returns {Promise}
   */
  listVideos (playlistId, pagesize = 200, page = 1) {
    pagesize = Math.min(pagesize, 200)
    return this.context.authRequest('get', `/playlists/${playlistId}/videos.json?${qs.stringify({
      pageSize: pagesize,
      page
    })}`).then((res) => {
      return Promise.resolve(new PageableApiResource(this.context, 'video', res.videos, res.paging))
    })
  }

  /**
   * Creates a new playlist.
   *
   * @param {string}    title - The title of the playlist.
   * @param {Number}    channelId
   * @param {Number}    isEnabled - Whether the playlist is enabled or not.
   *    Possible values are 1 (enabled), 0 (disabled). The default is 1
   *    (enabled).
   *
   * @returns {Promise<{headers, data: {playlistId}}>}
   */
  create (channelId, title, isEnabled = 1) {
    const params = qs.stringify({title, is_enabled: isEnabled})
    return this.context.authRequestWithHeaders(
      'post', `/channels/${channelId}/playlists.json`, params)
      .then(res => {
        let urlArray = res.headers.location.split('/')
        let playlistId = urlArray[urlArray.length - 1].split('.')[0]
        return Promise.resolve({
          headers: res.headers,
          data: {
            playlistId: playlistId
          }
        })
      })
  }

  /**
   * Retrieves the details on a specific playlist
   *
   * @param {Number}    playlistId
   *
   * @returns {*}
   */
  get (playlistId) {
    return this.context.authRequest('get', `/playlist/${playlistId}.json`)
  }

  /**
   * Put a video in a playlist.
   *
   * @param {Number}    playlistId
   * @param {Number}    videoId
   *
   * @returns {*}
   */
  addVideo (playlistId, videoId) {
    return this.context.authRequestWithHeaders(
      'put', `/playlists/${playlistId}/videos/${videoId}.json`)
      .then((res) => {
        return Promise.resolve({
          limit: res.headers['x-collection-limit'],
          remaining: res.headers['x-collection-remaining']
        })
      })
  }

  /**
   * Delete Playlist from Ustream.
   *
   * @param {Number} playlistId
   */
  remove (playlistId) {
    return this.context.authRequest('delete', `/playlists/${playlistId}.json`).then((res) => {
      return Promise.resolve(res)
    })
  }
}

module.exports = Playlist
