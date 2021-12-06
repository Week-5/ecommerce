const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepage');
////////////////////////////////
//        HOMEPAGE GUEST      //
///////////////////////////////
router.get('/', homepageController.getHomepageGuest);

////////////////////////////////
//        HOMEPAGE USER      //
///////////////////////////////
router.get('/homepage/:username', homepageController.getHomepageUser);

module.exports = router;
