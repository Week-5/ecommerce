const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

////////////////////////////////
//          CART PAGE         //
///////////////////////////////
router.get('/users/:username/cart', cartController.getCartPage);

////////////////////////////////
//      ADD ITEM TO CART      //
///////////////////////////////
router.post('/users/:username/cart', cartController.postItemToCart);

module.exports = router;
