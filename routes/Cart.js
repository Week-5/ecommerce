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

////////////////////////////////////
//      DELETE ITEM FROM CART     //
////////////////////////////////////
router.post('/users/:username/delete-item-cart', cartController.deleteItemCart);

module.exports = router;
