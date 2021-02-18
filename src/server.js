const express = require('express')
const request = require('request')
const fs = require('fs')
const bodyParser = require("body-parser");
const NodeCache = require( "node-cache" );
var cors = require('cors')
const myCache = new NodeCache();
var path = require('path')
const app = express()

const host = 'http://localhost'

app.use('/', express.static('./build'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/get_token', function(request, response) {
    var token = request.query.access_token
    var obj = {access_token: token}
    var status = myCache.set( "myKey", obj, 86400);
    console.log(status)
    console.log(myCache.get('myKey'))
    const content = `const access_token ="${token}";export default access_token;`
    console.log(token)
    fs.writeFile('./access_token.js', content, err => {
        if (err) {
            console.error(err)
            return
        }
    })
    response.writeHead(301,{Location: 'http://'+request.headers.host+'/login'});
    response.end();
})

app.get('/getClientId',function(request,response){
    if(myCache.get('clientId')){
        response.json(myCache.get('clientId'))
    } else {
        response.json({clientId:"Enter Client ID"})
    }
})

app.post('/setClientId',function(request,response){
    var clientId = request.body.clientId;
    console.log(clientId)
    var status = myCache.set( "clientId", clientId);
    response.writeHead(200)
    response.end()
})

app.get('/showToken',function(request,response){
    if(myCache.get('myKey')){
        response.json(myCache.get('myKey'))
    } else {
        response.json({access_token:"expired"})
    }
})

app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));

var port = 8080
app.listen(port)
console.log(`Listening at http://localhost:${port}`)