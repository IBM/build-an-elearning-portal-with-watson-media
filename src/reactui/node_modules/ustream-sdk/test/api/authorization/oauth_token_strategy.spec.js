const {it, describe} = require('mocha')
const {assert} = require('chai')
const qs = require('qs')
const OauthTokenStrategy = require('../../../lib/api/authorization/oauth_token_strategy')

describe('api.authorization.oauth_token_strategy', () => {
  describe('#authorize', () => {
    it('should return correct auth credentials', () => {
      const accessToken = 'fake-access-token'
      const tokenType = 'bearer'
      const expiresIn = 86400 // 24 hours

      let strategy = new OauthTokenStrategy(accessToken, tokenType, expiresIn)
      strategy.authorize()
        .then((fields) => {
          assert.deepEqual(qs.parse(fields), {
            access_token: accessToken,
            token_type: tokenType,
            expires_in: expiresIn
          })
        })
    })
  })
})
