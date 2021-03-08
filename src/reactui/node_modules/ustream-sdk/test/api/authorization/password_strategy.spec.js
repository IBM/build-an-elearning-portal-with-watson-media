const {it, describe} = require('mocha')
const {assert} = require('chai')
const Ustream = require('./../../../lib/ustream')
const qs = require('qs')

const PasswordStrategy = require('../../../lib/api/authorization/password_strategy')

describe('api.authorization.password_strategy', () => {
  describe('#authorize', () => {
    it('should send password auth fields with request', () => {
      let context = new Ustream()
      context.httpClient = {
        requestRaw: (type, route, fields) => {
          return new Promise((resolve) => {
            resolve(fields)
          })
        }
      }
      let strategy = new PasswordStrategy(context, 'username', 'password', 'client id', 'client secret')
      strategy.authorize().then((fields) => {
        assert.deepEqual(qs.parse(fields), {
          grant_type: 'password',
          client_id: 'client id',
          client_secret: 'client secret',
          username: 'username',
          password: 'password',
          token_type: 'bearer'
        })
      }).catch((err) => {
        throw err
      })
    })
  })
})
