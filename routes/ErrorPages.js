const express = require('express');
const router = express.Router();
const errorController = require('../controllers/errorPages');

////////////////////////////////
//          404 PAGE         //
///////////////////////////////
router.get('/404', errorController.getFOF);
router.get('/users/:username/404', errorController.getFOF);

module.exports = router;
