const router = require('express').Router();

router.get('/', (req, res, next) => {

    if (req.gaming) {
        res.render('pages/game');
    } else {
        res.render('pages/index');
    }
    
});


module.exports = router;