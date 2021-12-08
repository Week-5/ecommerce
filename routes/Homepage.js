const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepage');

////////////////////////////////
//        HOMEPAGE GUEST      //
///////////////////////////////
router.get('/homepage', homepageController.getHomepage);

////////////////////////////////
//        HOMEPAGE USER      //
///////////////////////////////
router.get('/homepage/:username', homepageController.getHomepage);

module.exports = router;
