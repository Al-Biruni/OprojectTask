var express = require('express');
var router = express.Router();
var songsCtrl = require("../controllers/songs.controller");

/* GET songs listing. */
router.get('/', songsCtrl.getTopSongs);

module.exports = router;
