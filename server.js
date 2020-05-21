// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
var fs = require("fs");


/// start giphy ///
const GphApiClient = require('giphy-js-sdk-core')
let giphyMiddleware;
// end giphy ///


// some helpful things
  let limit = 5
  let defaultQuery = 'congrats'
  
  function soRandom(items) {
    return Math.floor(Math.random() * (items))
  }  

// /// START ROUTING ///
app.get('/', (request, response) => {
  response.render('index', {gif: null, error:null, success: false, text: ' '})
})

app.post('/test', (request, response) => {
  const gifQuery = defaultQuery
  let giphyMiddleware = GphApiClient(process.env.GIPHY_KEY)

    // make giphy request
    giphyMiddleware.search('gifs', {"q": gifQuery, "offset":soRandom(5), "limit":limit})
  
    .then((giphyResponse) => {
      let selectedGif = giphyResponse.data[soRandom(limit)].images.original.url
      response.render('index', {gif: selectedGif, error: null, success: true, text: '🎉 Hooray!'})
     
    })
    .catch((err) => {
      return response.render('index', {gif: null, error:'oh no', success: false, text: '😰 Something isnt right.'})
   })

})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
