var mongoose = require("mongoose"),
    Songs = mongoose.model("songs");
    var ObjectId = require('mongodb').ObjectID;



	module.exports.getTopSongs = function(req,res,next){
    //var id = ObjectId("60514ddd00defa05610d14aa");
	Songs.find().limit(10).exec(function(err,songs){
        if(err){
            console.log(err);
            return next(err);
        }
        var songsName = songs.map(song => song.get("name"))
		res.status(200).json(
		{
        err:null,
		msg: "Top 10 Songs",
       data:songsName
        }
         
		);
    });

	};

