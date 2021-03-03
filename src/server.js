const express = require('express')
const request = require('request')
var https = require('https')
const axios = require('axios')
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
    console.log(token)
    response.writeHead(301,{Location: 'http://'+request.headers.host+'/login'});
    response.end();
})

app.get('/fetchPlaylists', function(request, response) {
    var id = request.query.id

    var config = {
        method: 'get',
        url: `https://api.video.ibm.com/channels/${id}/playlists.json`,
        headers: { 
            'Authorization': 'Bearer ' + myCache.get('myKey').access_token,
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Access-Control-Allow-Origin': '*'
        }
    }

    axios(config)
    .then(function (res) {
        // console.log(JSON.stringify(res.data));
        console.log('/fetchPlaylists returned')
        response.json(res.data)
    })
    .catch(function (error) {
        // console.log(error);
        response.json("Some Error")
    })
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