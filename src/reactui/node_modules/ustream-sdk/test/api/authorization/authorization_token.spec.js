const {it, describe} = require('mocha')
const {assert} = require('chai')

const AuthorizationToken = require('../../../lib/api/authorization/authorization_token')

describe('api.authorization.authorization_token', () => {
  describe('#isExpired', () => {
    it('should be expired', () => {
      let token = new AuthorizationToken({
        accessToken: '',
        tokenType: '',
        expiresIn: -86400 // -24 hours
      })

      assert.strictEqual(true, token.isExpired())
    })

    it('should not be expired', () => {
      let token = new AuthorizationToken({
        accessToken: '',
        tokenType: '',
        expiresIn: 86400 // 24 hours
      })

      assert.strictEqual(false, token.isExpired())
    })
  })
})
