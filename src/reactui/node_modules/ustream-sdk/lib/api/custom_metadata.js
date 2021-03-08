const ApiResource = require('./api_resource')
const qs = require('qs')

/**
 * @class CustomMetadata
 */
class CustomMetadata extends ApiResource {
  /**
   * List metadata fields
   *
   * @param {{string}} type - "video" if you need custom metadata for a video or
   *    "channel" if you need custom metadata for a channel
   */
  list (type) {
    const queryParams = qs.stringify({filter: {type}})
    return this.context.authRequest(
      'get', `/custom-metadata-fields.json?${queryParams}`)
  }

  /**
   * Create new metadata field
   *
   * @param {{string}} fields.name - Name of the field
   * @param {{string}} fields.display_name - Display name
   * @param {{string}} fields.content_type - It can be channel or video
   * @param {{string}} fields.type - The type of the field. Possible values are:
   *    "string",
   *    "float",
   *    "tag_list",
   *    "bool",
   *    "enum",
   *    "group",
   *    "datetime",
   *    "link"
   * @param {{string}} fields.description - The description of the field
   * @param {{boolean}} fields.is_required - True if the field is required
   * @param {{Array}} fields.enum_items - Array of enum items
   */
  create (fields) {
    return this.context.authRequest(
      'post', `/custom-metadata-fields.json`, qs.stringify(fields))
  }

  /**
   * Delete metadata field
   *
   * @param {{string}} fieldId - ID of an existing custom metadata field
   */
  delete (fieldId) {
    return this.context.authRequest(
      'delete', `/custom-metadata-fields/${fieldId}.json`)
  }
}

module.exports = CustomMetadata
