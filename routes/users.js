var express = require('express');
var router = express.Router();
var userCtr = require('../controllers/users.controller');

/* GET users listing. */
router.post('/create', userCtr.createNewUser);
router.post('/:username/listen/:songId',userCtr.listenToSong);

router.get('/:username/recommend/:mood',userCtr.recomendSongs);
router.get('/:username',userCtr.getUser);



module.exports = router;
