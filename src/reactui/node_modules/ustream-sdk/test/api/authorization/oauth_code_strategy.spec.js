const {it, describe, afterEach} = require('mocha')
const sinon = require('sinon')
const qs = require('qs')

const Ustream = require('./../../../lib/ustream')
const OauthCodeStrategy = require('../../../lib/api/authorization/oauth_code_strategy')

describe('api.authorization.oauth_token_strategy', () => {
  const sandbox = sinon.sandbox.create()

  afterEach(() => {
    sandbox.verifyAndRestore()
  })

  describe('#authorize', () => {
    it('should send oauth token fields with request', (done) => {
      const clientId = 'fake-client-id'
      const clientSecret = 'fake-client-secret'
      const code = 'fake-code'
      const redirectUri = 'fake-redirect-uri'
      const ustream = new Ustream()

      let httpClientMock = sandbox.mock(ustream.httpClient)

      httpClientMock.expects('requestRaw')
        .withExactArgs(
          'post',
          `${ustream.getAuthUrl()}/oauth2/token`,
          qs.stringify({
            grant_type: 'authorization_code',
            client_id: clientId,
            code,
            redirect_uri: redirectUri
          }), {
            'Authorization': `Basic ${clientSecret}`
          }
        )
        .resolves()

      let strategy = new OauthCodeStrategy(ustream, clientId, clientSecret, code, redirectUri)
      strategy.authorize()
        .then(done, done)
    })
  })
})
