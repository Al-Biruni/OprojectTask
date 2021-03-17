var mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;

var songSchema = mongoose.Schema({
    username:{
        type: String,
        require:true,
        unique: true
    },
    birthDate: Date,
    gender: {
        type: String,
        require:true,
        enum: ['male','female']
    },
    songsHistory: {
        type:[String],
          default: []
    },
    artistsHistory: {
        type: [String],
        default: []
    },
    minAcousticness: {
       
          type: mongoose.Decimal128,
          default: "0"
       
      },
      maxAcousticness: {
       
          type: mongoose.Decimal128,
          default: "0"
       
      },
      minLiveness: {
       
          type: mongoose.Decimal128,
          default: "0"
       
      },
      maxLiveness: {
       
          type: mongoose.Decimal128,
          default: "0"
       
      },
      minSpeechiness: {
       
          type: mongoose.Decimal128,
          default: "0"
       
      },
      maxSpeechiness: {
       
          type: mongoose.Decimal128,
          default: "0"
       
      },
      minTempo: {
       
          type: mongoose.Decimal128,
          default: "0"
       
      },
      maxTempo: {
       
          type: mongoose.Decimal128,
          default: "0"
       
      },
});



songSchema.path('gender').options.enum;
var Users=mongoose.model("Users",songSchema );

module.exports={
  User : Users
};