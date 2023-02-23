const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({"status":"200","message":"Pitutis' work"});
});

//start the game
router.get('/start', (req, res) => {
  req.gaming = true;
  req.session.started = true;
  res.status(200).json({"status":"200","message":"starting"});
});

//delete the robot, restart
router.get('/destroy', (req, res) => {
  req.gaming = false;
  req.session.started = false;
  req.session.destroy(function(err) {
    console.log(err);
  })
  res.status(200).json({"status":"200","message":"destroyed"});
});



module.exports = router;