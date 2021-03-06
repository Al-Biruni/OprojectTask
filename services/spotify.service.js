/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require('request'); // "Request" library

var client_id = 'f1aeee5d8457458a855f96c5fe5dfa45'; // Your client id
var client_secret = 'bb0d8f2fb41c43898cce53d160ebe1ae'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});


module.exports.getSong =(songId,cb)=>
     request.post(authOptions, function(error, response,body){
        if (!error && response.statusCode === 200) {
            // use the access token to access the Spotify Web API
            var token = body.access_token;
            var options = {
              url: `https://api.spotify.com/v1/tracks/${songId}`,
              headers: {
                'Authorization': 'Bearer ' + token
              },
              json: true
            };
           
           request.get(options, function(error, response, body) {
               cb(body);
            });
           
          }else{
              console.log(error);
              console.log(response);
              return error;

          }
    });

module.exports.getRecomendations = function(seedArtists,seedGenres,seedTracks,cb){
    var seedArtistsQuery = seedArtists.join('&');
    var seedGenressQuery = seedGenres.join('&');
    var seedTracksQuery = seedTracks.join('&');


    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
      
          // use the access token to access the Spotify Web API
          var token = body.access_token;
          var options = {
            url: `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${seedArtistsQuery}&seed_genres=${seedGenressQuery}&seed_traks=${seedTracksQuery}`,
            headers: {
              'Authorization': 'Bearer ' + token
            },
            json: true
          };
          request.get(options, function(error, response, body) {
            cb(body);
          });
        }
      });
}