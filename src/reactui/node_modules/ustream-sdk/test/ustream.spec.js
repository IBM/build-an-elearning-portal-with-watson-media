const {it, describe} = require('mocha')
const {assert} = require('chai')
const sinon = require('sinon')
const Ustream = require('./../lib/ustream')
const AuthProvider = require('./../lib/api/authorization/authorization_provider')

describe('ustream', function () {
  describe('#getAuthUrl', () => {
    it('should return auth endpoint without trailing slash', () => {
      let ustream = new Ustream()
      assert.isTrue(ustream.getAuthUrl().substr(-1) !== '/')
    })
  })

  describe('#getResourceUrl', () => {
    it('should return resource endpoint without trailing slash', () => {
      let ustream = new Ustream()
      assert.isTrue(ustream.getResourceUrl().substr(-1) !== '/')
    })
  })

  describe('#authorize', () => {
    it('should obtain authorization token before executing request', () => {
      let ustream = new Ustream()
      let authProvider = new AuthProvider(ustream, {})
      let mock = sinon.mock(authProvider)
      mock.expects('authorize').twice().returns(
        new Promise((resolve) => {
          resolve({
            access_token: '',
            token_type: '',
            expires_in: ''
          })
        })
      )

      ustream._authProvider = authProvider
      ustream.authorize()

      // When _isAuthorized() returns true, the authorization should only take place if forced flag is active
      let isAuthorizedStub = sinon.stub(ustream, '_isAuthorized').callsFake(() => {
        return true
      })

      ustream.authorize(false)
      ustream.authorize(true)
      assert.isTrue(isAuthorizedStub.called)
      assert.isTrue(mock.verify())
    })
  })

  describe('#authRequest', () => {
    it('should include authorization headers in protected requests', () => {
      let ustream = new Ustream()
      ustream.authToken = {access_token: 'fake-token'}

      let authorizeStub = sinon.stub(ustream, 'authorize').callsFake(() => {
        return new Promise((resolve) => {
          resolve()
        })
      })

      let requestStub = sinon.stub(ustream, 'request').callsFake(() => {
        return new Promise((resolve) => { resolve({}) })
      })

      ustream.authRequest('get', '/route', {}, {}).then(() => {
        assert.isTrue(authorizeStub.called)
        assert.isTrue(requestStub.called)
        assert.deepEqual({Authorization: 'Bearer fake-token'}, requestStub.args[0][3])
      })
    })
  })
})
