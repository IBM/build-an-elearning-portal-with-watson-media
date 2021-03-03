const {it, describe} = require('mocha')
const {assert} = require('chai')
const sinon = require('sinon')

const AuthorizationProvider = require('../../../lib/api/authorization/authorization_provider')
const PasswordStrategy = require('../../../lib/api/authorization/password_strategy')
const OauthTokenStrategy = require('../../../lib/api/authorization/oauth_token_strategy')
const OauthCodeStrategy = require('../../../lib/api/authorization/oauth_code_strategy')

describe('api.authorization.authorization_provider', () => {
  describe('#getProvider', () => {
    it('should return PasswordStrategy', () => {
      let authorizationProvider = new AuthorizationProvider(null)
      assert.instanceOf(authorizationProvider.getProvider({type: 'password'}), PasswordStrategy)
    })

    it('should return OauthTokenStrategy', () => {
      let authorizationProvider = new AuthorizationProvider(null)
      assert.instanceOf(authorizationProvider.getProvider({type: 'oauth_token'}), OauthTokenStrategy)
    })

    it('should return OauthCodeStrategy', () => {
      let authorizationProvider = new AuthorizationProvider(null)
      assert.instanceOf(authorizationProvider.getProvider({type: 'oauth_code'}), OauthCodeStrategy)
    })

    it('should throw exception if auth provider does not exist', () => {
      let authorizationProvider = new AuthorizationProvider(null)
      assert.throws(authorizationProvider.getProvider, Error)
    })
  })

  describe('#authorize', () => {
    it('should fetch provider before authorizing', () => {
      let authorizationProvider = new AuthorizationProvider(null)
      let authIsExecuted = false
      let stub = sinon.stub(authorizationProvider, 'getProvider').callsFake(() => {
        return {
          authorize: () => {
            authIsExecuted = true
          }
        }
      })

      authorizationProvider.authorize()
      assert.isTrue(stub.called)
      assert.isTrue(authIsExecuted)
    })
  })
})
