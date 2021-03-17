var mongoose = require("mongoose"),
    Songs = mongoose.model("songs"),
    Users = mongoose.model("Users"),
    ObjectId = require('mongodb').ObjectID,
    spotifyService = require('../services/spotify.service');



	module.exports.createNewUser = function(req,res,next){
        Users.create(req.body,function(err,user){
            if(err)
            return next(err);
            res.status(201).json({
                err:null,
                msg: "User added"
            });


        });

	};

    module.exports.getUser = function(req,res,next){
        Users.findOne({username: req.params.username}).exec(function(err,user){
            if(err)
            return next(err);
            if(!user)
            return res.status(404).json({
                err:null,
                msg: "user not found",
                data: user
            });

            res.status(200).json({
                err:null,
                msg: "found user",
                data: user
            });
        });
    }

    module.exports.listenToSong = async function(req,res,next){

        Users.findOne({"username": req.params.username}).exec(function(err,user){
            if(err)
                return err;
            if(!user)
                return res.status(404).json({
                    err: 1,
                    msg: "user not found",
                    data: user
                });
          //  songId = ObjectId(req.params.songId);
            Songs.findOne({id:req.params.songId}).exec(function(err,song){
                if(err)
                    return next(err);
                
                updateUserPref(user,song);
                   spotifyService.getSong(req.params.songId,(spotifySong) => {
                       console.log("-------------------------------------")
                       console.log(spotifySong);

                    var artistsIds = spotifySong["artists"].map(ssArtist => ssArtist.id);
                    artistsIds.forEach( id =>  user.artistsHistory.push(id));
    
                    user.artistsHistory.push()
                    user.save(function(err,uUser){
                        if(err)
                            return next(err);
    
                        res.status(200).json({
                            err:null,
                            msg: `listing to:- ${song.name}` ,
                            data: uUser
                        });
                    });

                   });
    

              
            });

        });
    }

    module.exports.recomendSongs= function(req,res,next){
        if(req.params.mood === "happy"){
            seedGenres = ["happy","comedy","country","dance"];
        }
        if(req.params.mood === "party"){
            seedGenres = ["dance","party","techno","trance",];
        }
        var MAX_SEED_SIZE = 50;
        Users.findOne({username:req.params.username}).exec(function(err,user){

            seedArtists=user.artistsHistory.slice(0,MAX_SEED_SIZE);
            seedTracks= user.songsHistory.slice(0,MAX_SEED_SIZE);
            spotifyService.getRecomendations(seedArtists,seedGenres,seedTracks,(songsList)=>{
                    songsNameList = songsList["tracks"].map(song => song.name);
                res.status(200).json({
                    err:null,
                    msg: ` recommendation list for mood ${req.params.mood}`,
                    data: songsNameList

                });
            });
        });

        
    }



    function updateUserPref(user,song){

        user.minAcousticness = user.minAcousticness > song.acousticness ? song.acousticness :user.minAcousticness; 
        user.maxAcousticness = user.maxAcousticness < song.acousticness ? song.acousticness :user.maxAcousticness;      
        user.minLiveness = user.minLiveness > song.acousticness ? song.liveness :user.minLiveness;
        user.maxLiveness = user.maxLiveness < song.liveness ? song.liveness :user.minLiveness;
        user.minSpeechiness = user.minSpeechiness > song.speechiness ? song.speechiness :user.minSpeechiness; 
        user.maxSpeechiness = user.maxSpeechiness < song.speechiness ? song.speechiness :user.maxSpeechiness;
        user.minTempo = user.minTempo > song.tempo ? song.tempo :user.minTempo;
        user.maxTempo = user.maxTempo < song.tempo ? song.tempo :user.maxTempo;

        user.songsHistory.push(song.id);
    }
