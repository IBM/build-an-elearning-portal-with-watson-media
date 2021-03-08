const ApiResource = require('./api_resource')
const PageableApiResource = require('./pageable_api_resource')
const Ftp = require('ftp')
const qs = require('qs')

/**
 * Class Video
 *
 * Implementation of Ustream's video API.
 *
 * @class
 * @link http://developers.Ustream.tv/broadcasting-api/channel.html
 */
class Video extends ApiResource {
  /**
   * Lists all videos on an account.
   *
   * @param {string} channelId - ID of a channel.
   * @param {Number} pageSize - The number of results to show per page.
   * @param {Number} page - The page to retrieve.
   *
   * @returns {Promise}
   */
  list (channelId, pageSize = 100, page = 1) {
    /** @var {{videos, paging}} res */
    return this.context.authRequest(
      'get',
      `/channels/${channelId}/videos.json?${qs.stringify({pagesize: pageSize, page})}`)
      .then((res) => {
        return Promise.resolve(new PageableApiResource(this.context, 'videos',
          res.videos, res.paging))
      })
  }

  /**
   * Get video fields, including title, description, url, etc.
   *
   * @param {Number} videoId - ID of existing video
   * @param {{}} opts
   * @param {string} opts.detail_level - Verbosity level. Possible value:
   *  "minimal". If set to "minimal", the result set is limited to id, title,
   *  picture, owner and locks data. If the channel is protected, only minimal
   *  data can be retrieved without valid access token.
   *
   */
  get (videoId, opts = {}) {
    return this.context.authRequest('get', `/videos/${videoId}.json?${qs.stringify(opts)}`)
      .then((res) => {
        return Promise.resolve(res.video)
      })
  }

  /**
   * Delete video from Ustream.
   *
   * @param {Number} videoId - ID of existing video
   */
  remove (videoId) {
    return this.context.authRequest('delete', `/videos/${videoId}.json`)
  }

  /**
   * Update a video's details.
   *
   * @param {Number} videoId - ID of existing video
   * @param {{}} opts
   * @param {string} opts.title - Video title
   * @param {string} opts.description - Video description
   * @param {string} opts.protect - Video protection level. Possible values: public, private
   */
  editVideoDetails (videoId, opts = {}) {
    return this.context.authRequest('put', `/videos/${videoId}.json`, qs.stringify(opts))
  }

  /**
   * Adds a list of labels to a specified video.
   *
   * @param {number} videoId - ID of an existing video.
   * @param {number[]} labelIds - List of label IDs.
   * @returns {Promise}
   */
  addLabels (videoId, labelIds) {
    return this.context.authRequest(
      'put',
      `/videos/${videoId}/labels.json`,
      qs.stringify({label_ids: labelIds}))
  }

  /**
   * Lists the labels associated with a video.
   *
   * @param {number} videoId - ID of an existing video.
   * @returns {Promise}
   */
  listLabels (videoId) {
    return this.context.authRequest('get', `/videos/${videoId}/labels.json`)
  }

  /**
   * Check the status of an uploaded video.
   *
   * Possible returned statuses are:
   *    - initiated
   *    - transferred
   *    - queued
   *    - pending
   *    - transcoding
   *    - complete
   *    - error
   *
   * @param {Number} channelId
   * @param {Number} videoId
   */
  getStatus (channelId, videoId) {
    return this.context.authRequest('get',
      `/channels/${channelId}/uploads/${videoId}.json`)
  }

  /**
   * List the details for all of a video's captions.
   *
   * @param {number} videoId - ID of an existing video.
   * @returns {Promise}
   */
  listCaptions (videoId) {
    return this.context.authRequest('get', `/videos/${videoId}/captions.json`)
  }

  /**
   * Show a video's caption details for the given language.
   *
   * @param {number} videoId - ID of an existing video.
   * @param {string} langCode - A valid language code (e.g. "en-US").
   * @returns {Promise}
   */
  showCaptionDetails (videoId, langCode) {
    return this.context.authRequest(
      'get', `/videos/${videoId}/captions/${langCode}.json`)
  }

  /**
   * Modify caption details for a given language.
   *
   * @param {number} videoId - ID of an existing video.
   * @param {string} langCode - A valid language code (e.g. "en-US").
   * @param opts
   * @param opts.is_visible - (0 or 1) Whether the video player should show this
   *  caption.
   * @param opts.is_default - (0 or 1) Whether the video player should
   *  automatically show this caption. A video can only have one default
   *  caption.
   * @returns {Promise}
   */
  modifyCaptionDetails (videoId, langCode, opts) {
    return this.context.authRequest(
      'put', `/videos/${videoId}/captions/${langCode}.json`, qs.stringify(opts))
  }

  /**
   * Download a video's captions for a given language.
   *
   * @param {number} videoId - ID of an existing video.
   * @param {string} langCode - A valid language code (e.g. "en-US").
   * @returns {Promise}
   */
  downloadCaptions (videoId, langCode) {
    return this.context.authRequest(
      'get', `videos/${videoId}/captions/${langCode}/vtt`)
  }

  /**
   * Upload a video's captions for a given language.
   *
   * @param {number} videoId - ID of an existing video.
   * @param {string} langCode - A valid language code (e.g. "en-US").
   * @param {ReadableStream} stream - A stream containing the contents of a
   *  caption (.vtt) file.
   * @returns {Promise}
   */
  uploadCaptions (videoId, langCode, stream) {
    return this.context.authRequest(
      'put', `videos/${videoId}/captions/${langCode}/vtt`, stream, {
        'Content-Type': 'text/vtt'
      })
  }

  /**
   * List the caption language supported by Ustream.
   *
   * @returns {Promise}
   */
  listSupportedCaptionLanguages () {
    return this.context.authRequest('get', 'caption-languages.json')
  }

  /**
   * List all video metadata values.
   *
   * @param {string} videoId
   */
  listMetadataValues (videoId) {
    return this.context.authRequest('get', `/videos/${videoId}/custom-metadata.json`)
  }

  /**
   * Set video metadata value.
   *
   * @param {string} videoId
   * @param {string} metadataId
   * @param {*} value
   */
  setMetadataValue (videoId, metadataId, value) {
    return this.context.authRequest('put', `/videos/${videoId}/custom-metadata/${metadataId}.json`, qs.stringify({value}))
  }

  /**
   * Remove video metadata value.
   *
   * @param {{string}} videoId
   * @param {{string}} metadataId
   */
  removeMetadataValue (videoId, metadataId) {
    return this.context.authRequest('delete', `/videos/${videoId}/custom-metadata/${metadataId}.json`)
  }

  /**
   * Uploads a video to Ustream.
   *
   * @param {Number} channelId
   * @param {{}} opts
   * @param {string} opts.title - (optional) Video title.
   * @param {string} opts.description - (optional) Video description.
   * @param {string} opts.protect - (optional) Protection level. Acceptable
   *  values are "public" or "private". Default value is "private".
   * @param {{originalname, stream}} file
   *
   * @return {Promise}
   */
  upload (channelId, file, opts) {
    const self = this
    let ext = file.originalname.substr(
      file.originalname.lastIndexOf('.') + 1)

    return this._initiateUpload(channelId, opts)
      .then((res) => {
        return self._ftpUpload(res.host, res.user, res.password, res.port,
          `${res.path}.${ext}`, file.stream)
          .then(() => {
            return self._completeUpload(channelId, res['videoId'], 'ready')
          })
      })
  }

  /**
   * Initiates a video upload.
   *
   * @param {Number} channelId - ID of a Ustream channel.
   * @param {{}} opts
   * @param {string} opts.title - (optional) Video title.
   * @param {string} opts.description - (optional) Video description.
   * @param {string} opts.protect - (optional) Protection level. Acceptable
   *  values are "public" or "private". Default value is "public".
   *
   * @return {Promise}
   *
   * @private
   */
  _initiateUpload (channelId, opts) {
    const params = qs.stringify({type: 'videoupload-ftp', ...opts})
    return this.context.authRequest('post',
      `/channels/${channelId}/uploads.json?type=videoupload-ftp`, params)
  }

  /**
   * Uploads video binary stream.
   *
   * The method _initiate upload must be executed immediately before this
   * method.
   *
   * @param {string} ftpHost - Remote host server.
   * @param {string} ftpUser - FTP username.
   * @param {string} ftpPass - FTP password.
   * @param {Number} ftpPort - FTP port.
   * @param {string} ftpDest - Destination on remote server.
   * @param {Stream} stream
   *
   * @return {Promise}
   *
   * @private
   */
  _ftpUpload (ftpHost, ftpUser, ftpPass, ftpPort, ftpDest, stream) {
    let ftp = new Ftp()

    return new Promise((resolve, reject) => {
      ftp.binary((err) => {
        if (err) {
          return reject(new Error('Failed to set FTP transfer type to' +
            'binary.'))
        }
      })

      ftp.on('ready', () => {
        ftp.put(stream, ftpDest, (err) => {
          ftp.end()

          if (err) {
            return reject(err)
          }

          return resolve()
        })
      })

      ftp.on('error', (err) => {
        return reject(err)
      })

      ftp.connect({
        host: `${ftpHost}`,
        port: ftpPort,
        user: ftpUser,
        password: ftpPass
      })
    })
  }

  /**
   * Signals that FTP file transfer is complete.
   *
   * Must be executed after _ftpUpload().
   *
   * @param {Number} channelId - ID of Ustream channel.
   * @param {Number} videoId - ID of Ustream video.
   * @param {string} status - Status of video. Default is "ready".
   *
   * @return {Promise}
   *
   * @private
   */
  _completeUpload (channelId, videoId, status) {
    status = (status !== null) ? status : 'ready'
    let payload = qs.stringify({status: status})

    return this.context.authRequest('put',
      `/channels/${channelId}/uploads/${videoId}.json`, payload)
      .then(() => {
        return Promise.resolve({channelId: channelId, videoId: videoId})
      })
  }

  /**
   * Select a frame as video's thumbnail.
   *
   * @param {Number} videoId - ID of existing video
   * @param {{}} opts
   * @param {string} opts.position - Video position in seconds
   */
  setFrameAsThumbnail (videoId, opts = {}) {
    return this.context.authRequest('post', `/videos/${videoId}/thumbnail/frame.json`, qs.stringify(opts))
  }

  /**
   * Get the video's download details: download URL, expiration time and status.
   *
   * @param {Number} videoId - ID of existing video
   * @param {string} format - The downloadable format: mp4 or flv.
   */
  getDownloadDetails (videoId, format) {
    return this.context.authRequest('get', `/videos/${videoId}/downloadable/${format}.json`)
  }

  /**
   * Set up viewer authentication
   * 
   * @link https://ibm.github.io/video-streaming-developer-docs/viewer-authentication-api-implementing-viewer-authentication#set-up-viewer-authentication-for-a-video
   * 
   * @param {Number} videoId - ID of existing video
   * @param {string} url - The login url
   * @param {string} secret - The secret key
   *
   * @returns {Promise}
   */
  setViewerAuth (videoId, url, secret) {
    return this.context.authRequest('put',
      `/videos/${videoId}/locks/hash.json`, qs.stringify({ url, secret }))
  }

}

module.exports = Video
