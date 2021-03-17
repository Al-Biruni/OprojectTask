var mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;

var songSchema = mongoose.Schema({

  _id: {
    $oid: {
      type: ObjectId
    }
  },
  acousticness: {
            type: mongoose.Decimal128,
          default: "0"
  },
  artists: {
    type: String
  },
  danceability: {
            type: mongoose.Decimal128,
          default: "0"
  },
  duration_ms: {
    type: Number
  },
  energy: {
            type: mongoose.Decimal128,
          default: "0"
  },
  explicit: {
    type: Boolean
  },
  id: {
    type: String
  },
  instrumentalness: {
            type: mongoose.Decimal128,
          default: "0"
  },
  key: {
    type: Number
  },
  liveness: {
            type: mongoose.Decimal128,
          default: "0"
  },
  loudness: {
            type: mongoose.Decimal128,
          default: "0"
  },
  mode: {
    type: Boolean
  },
  name: {
    type: String
  },
  popularity: {
    type: Number
  },
  release_date: {
    $date: {
      type: Date
    }
  },
  speechiness: {
            type: mongoose.Decimal128,
          default: "0"
  },
  tempo: {
            type: mongoose.Decimal128,
          default: "0"
  },
  valence: {
            type: mongoose.Decimal128,
          default: "0"
  }


});


var Songs=mongoose.model("songs",songSchema );

module.exports={
  Song : Songs
};

