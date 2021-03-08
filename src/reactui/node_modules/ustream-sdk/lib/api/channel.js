const ApiResource = require('./api_resource')
const PageableApiResource = require('./pageable_api_resource')
const qs = require('qs')

/**
 * @class Channel
 */
class Channel extends ApiResource {
  /**
   * Retrieves channel details.
   *
   * @param {Number} channelId
   * @param {{}} opts
   * @param {string} opts.detail_level - Verbosity level. Possible value:
   *  "minimal". If set to "minimal", the result set is limited to id, title,
   *  picture, owner and locks data. If the channel is protected, only minimal
   *  data can be retrieved without valid access token.
   *
   * @returns {*}
   */
  get (channelId, opts = {}) {
    return this.context.authRequest(
      'get', `/channels/${channelId}.json?${qs.stringify(opts)}`)
      .then((res) => {
        return Promise.resolve(res.channel)
      })
  }

  /**
   * Creates a new channel.
   *
   * @param {string}    title - Channel title
   * @param {{}}        opts
   * @param {string}    opts.description - Channel description
   *
   * @returns {*}
   */
  create (title, opts = {}) {
    opts.title = title
    return this.context.authRequest('post', '/users/self/channels.json', qs.stringify(opts))
      .then((res) => {
        return Promise.resolve(res.channel)
      })
  }

  /**
   * Edits an existing channel.
   *
   * @param {Number}    channelId
   * @param {string}    title - Channel title
   * @param {{}}        opts
   * @param {string}    opts.description - Channel description.
   * @param {string}    opts.tags - Comma separated list of channel tags.
   *
   * @returns {Promise}
   */
  edit (channelId, title, opts = {}) {
    opts.title = title
    return this.context.authRequest('put', `/channels/${channelId}.json`,
      qs.stringify(opts))
  }

  /**
   * Deletes an existing channel.
   *
   * @param {Number} channelId
   *
   * @returns {Promise}
   */
  remove (channelId) {
    return this.context.authRequest('delete', `/channels/${channelId}.json`)
  }

  /**
   * Lists all channels on an account.
   *
   * @param {Number} pagesize - The number of results to show per page.
   * @param {Number} page     - The page to retrieve.
   * @returns {Promise}
   */
  list (pagesize = 100, page = 1) {
    /** @var {{channels, paging}} res */
    return this.context.authRequest(
      'get',
      `/users/self/channels.json?${qs.stringify({pagesize, page})}`)
      .then((res) => {
        return Promise.resolve(new PageableApiResource(this.context, 'channels',
          res.channels, res.paging))
      })
  }

  /**
   * Returns the password protection status.
   *
   * @param {Number} channelId
   *
   * @returns {Promise}
   */
  getPasswordProtectionStatus (channelId) {
    return this.context.authRequest('get',
      `/channels/${channelId}/locks/password.json`)
  }

  /**
   * Sets the channel password and enables password protection as well.
   *
   * @param {Number} channelId
   * @param {string} password
   *
   * @returns {Promise}
   */
  enablePasswordProtection (channelId, password) {
    return this.context.authRequest('put',
      `/channels/${channelId}/locks/password.json`, qs.stringify(
        {password: password}))
  }

  /**
   * Removes the channel password, disables password protection status.
   *
   * @param {Number} channelId
   *
   * @returns {Promise}
   */
  disablePasswordProtection (channelId) {
    return this.context.authRequest('delete',
      `/channels/${channelId}/locks/password.json`)
  }

  /**
   * Check if channel content may be embedded on public applications.
   *
   * By default all Ustream channels can be embedded anywhere across the
   * internet. By restricting the embed URLs, you can control the viewing
   * experience and limit distribution to your own preferred partners. To enable
   * restricted embeds, see setEmbedLock().
   *
   * After enabling the embed restrictions, see addUrlToWhiteList() to allow
   * specific domains to access your content.
   *
   * @link http://developers.Ustream.tv/broadcasting-api/channel.html#embed-restriction_9
   * @see addUrlToWhitelist
   * @see setEmbedLock
   *
   * @param {Number} channelId
   *
   * @returns {Promise}
   */
  getEmbedLockStatus (channelId) {
    return this.context.authRequest('get',
      `/channels/${channelId}/locks/embed.json`)
  }

  /**
   * Enables/disables embed restrictions.
   *
   * @param {Number}   channelId
   * @param {boolean}  isEmbedLocked - True to enable restricted embed access.
   * False to disable restricted access.
   *
   * @returns {Promise}
   */
  setEmbedLock (channelId, isEmbedLocked) {
    return this.context.authRequest('put',
      `/channels/${channelId}/locks/embed.json`, qs.stringify(
        {locked: isEmbedLocked}))
  }

  /**
   * Retrieves a list of domains white listed to embed a channel's content.
   *
   * @param {Number} channelId
   *
   * @returns {Promise}
   */
  getUrlWhitelist (channelId) {
    return this.context.authRequest('get',
      `/channels/${channelId}/locks/embed/allowed-urls.json`)
  }

  /**
   * Add a URL to a set of white listed so a channel's content may be embedded
   * on that domain.
   *
   * Embed locking must be enabled on the channel for the whitelist to take
   * affect.
   *
   * @see SetEmbedLock
   *
   * @param channelId
   * @param url
   *
   * @returns {Promise}
   */
  addUrlToWhitelist (channelId, url) {
    return this.context.authRequest('post',
      `/channels/${channelId}/locks/embed/allowed-urls.json`,
      qs.stringify({url}))
  }

  /**
   * Removes all white listed domains.
   *
   * @param channelId
   *
   * @returns {Promise}
   */
  emptyUrlWhiteList (channelId) {
    return this.context.authRequest('delete',
      `/channels/${channelId}/locks/embed/allowed-urls.json`)
  }

  /**
   * Enable/disable users' ability to share a channel's video content.
   *
   * @param {Number}   channelId
   * @param {boolean}  canShare
   *
   * @returns {Promise}
   */
  setSharingControl (channelId, canShare) {
    return this.context.authRequest('put',
      `/channels/${channelId}/settings/viewer.json`,
      qs.stringify({sharing: canShare}))
  }

  /**
   * Sets the channel's branding type.
   *
   * @param {string} channelId
   * @param {string} type
   *
   * @returns {Promise}
   */
  setBrandingType (channelId, type) {
    return this.context.authRequest('put',
      `/channels/${channelId}/branding.json`,
      qs.stringify({type: type}))
  }

  /**
   * List channel all metadata values
   *
   * @param {string} channelId
   */
  listMetadataValues (channelId) {
    return this.context.authRequest('get', `/channels/${channelId}/custom-metadata.json`)
  }

  /**
   * Set a channel metadata value.
   *
   * @param {string} channelId
   * @param {string} metadataId
   * @param {*} value
   */
  setMetadataValue (channelId, metadataId, value) {
    return this.context.authRequest('put',
      `/channels/${channelId}/custom-metadata/${metadataId}.json`, qs.stringify({ value }))
  }

  /**
   * Remove metadata value from channel.
   *
   * @param {string} channelId
   * @param {string} metadataId
   */
  removeMetadataValue (channelId, metadataId) {
    return this.context.authRequest('delete',
      `/channels/${channelId}/custom-metadata/${metadataId}.json`)
  }

  /**
   * List the display settings of a channel's custom metadata fields..
   *
   * @param {string} channelId
   */
  listMetadataDisplaySettings (channelId) {
    return this.context.authRequest('get',
      `/channels/${channelId}/custom-metadata-display.json`)
  }

  /**
   * Set the display setting of a channel's custom metadata field.
   *
   * @param {string} channelId
   * @param {string} metadataId
   * @param {boolean} isLink
   */
  setMetadataDisplaySetting (channelId, metadataId, isLink) {
    return this.context.authRequest('put',
      `/channels/${channelId}/custom-metadata-display/${metadataId}.json`, qs.stringify({ is_link: isLink }))
  }

  /**
   * Delete the display setting of a channel's custom metadata field.
   *
   * @param {string} channelId
   * @param {string} metadataId
   */
  removeMetadataDisplaySetting (channelId, metadataId) {
    return this.context.authRequest('delete',
      `/channels/${channelId}/custom-metadata-display/${metadataId}.json`)
  }

  /**
   * Enable/disable channel's multi quality streaming
   *
   * @param {Number}   channelId
   * @param {boolean}  isMulti
   *
   * @returns {Promise}
   */
  setMultiQualityStreaming (channelId, isMulti) {
    return this.context.authRequest('put',
      `/channels/${channelId}/settings/multi-quality.json`,
      qs.stringify({value: isMulti}))
  }

  /**
   * Getting the channel's ingest settings: url and keys
   *
   * @param {Number}   channelId
   *
   * @returns {Promise}
   */
  getIngestSettings (channelId) {
    return this.context.authRequest('get', `/channels/${channelId}/ingest.json`)
  }

  /**
   * Lists channel's featured videos
   *
   * @param {Number} pagesize  - The number of results to show per page.
   * @param {Number} page      - The page to retrieve.
   * @returns {Promise}
   */
  getFeaturedVideos (pagesize = 100, page = 1) {
    /** @var {{videos, paging}} res */
    return this.context.authRequest(
      'get',
      `/channels/${channelId}/featured-videos.json${qs.stringify({pagesize, page})}`)
      .then((res) => {
        return Promise.resolve(new PageableApiResource(this.context, 'videos',
          res.videos, res.paging))
      })
  }

  /**
   * Update channel featured videos
   *
   * @param {Number}   channelId
   * @param {number[]}  video_ids   - List of existing video IDs
   *
   * @returns {Promise}
   */
  updateFeaturedVideos (channelId, videoIds) {
    return this.context.authRequest('put',
      `/channels/${channelId}/featured-videos.json`,
      qs.stringify({video_ids: videoIds}))
  }

  /**
   * Get the channel's recording status.
   * During a broadcast, this call provides information on where the video is saved to.
   *
   * @param {Number}   channelId
   *
   * @returns {Promise}
   */
  getRecordingStatus (channelId) {
    return this.context.authRequest('get', `/channels/${channelId}/recorder.json`);
  }

  /**
   * Set (start or stop) recording status for broadcasts.
   *
   * @param {Number}   channelId
   * @param {string}   command
   *
   * @returns {Promise}
   */
  setRecordingStatus (channelId, command) {
    return this.context.authRequest('post', `/channels/${channelId}/recorder.json`,
      qs.stringify({ command }));
  }

  /**
   * Set autorecord for broadcasts.
   *
   * @param {Number}   channelId
   * @param {string}   value - Possible values: disabled, private, public.
   *  If the value is disabled, no auto-recorded video gets created for the channel
   *  when broadcasting. If the value is private, then the new auto-record will be private
   *  by default. In case of public the created auto-records will be public by default.
   *
   * @returns {Promise}
   */
  setAutoRecord (channelId, value) {
    return this.context.authRequest(
      'put', `/channels/${channelId}/settings/autorecord.json`, qs.stringify({ value }));
  }

  /**
   * Get record time limit.
   * Gets the maximum allowed length of recorded videos for the channel.
   * 
   * @param {Number}   channelId
   *
   * @returns {Promise}
   */
  getRecordTimeLimit (channelId) {
    return this.context.authRequest('get', `/channels/${channelId}/limits/recording.json`);
  }

  /**
   * Set up viewer authentication
   * 
   * @link https://ibm.github.io/video-streaming-developer-docs/viewer-authentication-api-implementing-viewer-authentication#channel-level
   * 
   * @param {Number} channelId - ID of existing channel
   * @param {string} url - The login url
   * @param {string} secret - The secret key
   *
   * @returns {Promise}
   */
  setViewerAuth (channelId, url, secret) {
    return this.context.authRequest('put',
      `/channels/${channelId}/locks/hash/advanced.json`, qs.stringify({ url, secret }))
  }

}

module.exports = Channel
