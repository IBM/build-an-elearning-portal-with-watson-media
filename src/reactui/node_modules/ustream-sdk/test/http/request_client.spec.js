const {it, describe} = require('mocha')
const {assert} = require('chai')
const sinon = require('sinon')
const RequestClient = require('./../../lib/http/request_client')

describe('http.request_client', () => {
  describe('#request', () => {
    it('should not prefix API endpoint to URL', () => {
      let client = new RequestClient('https://ustream.tv', null)
      let spy = sinon.spy()
      let stub = sinon.stub(client, 'requestRaw').callsFake(spy)

      client.request('get', 'http://otherdomain.tv')

      assert.isTrue(stub.called)
      assert.equal('http://otherdomain.tv', spy.args[0][1])
    })

    it('should prefix API domain to route', () => {
      let client = new RequestClient('https://ustream.tv', null)
      let stub = sinon.stub(client, 'requestRaw')

      client.request('get', '/route')

      assert.isTrue(stub.called)
      assert.equal('https://ustream.tv/route', stub.args[0][1])
    })

    it('should prefix API domain with slash to route', () => {
      let client = new RequestClient('https://ustream.tv', null)
      let stub = sinon.stub(client, 'requestRaw')

      // Missing '/' should be prepended to beginning of route
      client.request('get', 'route')

      assert.isTrue(stub.called)
      assert.equal('https://ustream.tv/route', stub.args[0][1])
    })

    it('should send GET request', () => {
      let stub = sinon.stub()
      stub.returns(new Promise((resolve) => {
        resolve({ data: null })
      }))

      let client = new RequestClient('https://ustream.tv', null)
      client.verbs.get.func = stub
      client.request('get', '/route')

      assert.isTrue(stub.called)
      assert.equal(2, stub.args[0].length)
    })

    it('should send POST request', () => {
      let stub = sinon.stub()
      stub.returns(new Promise((resolve) => {
        resolve({ data: null })
      }))

      let client = new RequestClient('https://ustream.tv', null)
      client.verbs.post.func = stub
      client.request('post', '/route')

      assert.isTrue(stub.called)
      assert.equal(3, stub.args[0].length)
    })

    it('should send PUT request', () => {
      let stub = sinon.stub()
      stub.returns(new Promise((resolve) => {
        resolve({ data: null })
      }))

      let client = new RequestClient('https://ustream.tv', null)
      client.verbs.put.func = stub
      client.request('put', '/route')

      assert.isTrue(stub.called)
      assert.equal(3, stub.args[0].length)
    })

    it('should send DELETE request', () => {
      let stub = sinon.stub()
      stub.returns(new Promise((resolve) => {
        resolve({ data: null })
      }))

      let client = new RequestClient('https://ustream.tv', null)
      client.verbs.delete.func = stub
      client.request('delete', '/route')

      assert.isTrue(stub.called)
      assert.equal(2, stub.args[0].length)
    })
  })
})
