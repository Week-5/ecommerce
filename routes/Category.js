const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

////////////////////////////////
//      JEWELRY CATEGORY      //
///////////////////////////////
router.get('/category/jewelry', categoryController.getJewelry);
router.get('/users/:username/category/jewelry', categoryController.getJewelry);

////////////////////////////////
//      ELECTRONICS CATEGORY      //
///////////////////////////////
router.get('/category/electronics', categoryController.getElectronics);
router.get(
  '/users/:username/category/electronics',
  categoryController.getElectronics
);

////////////////////////////////
//  MEN'S CLOTHING CATEGORY   //
///////////////////////////////
router.get('/category/man-clothing', categoryController.getMensClothing);
router.get(
  '/users/:username/category/man-clothing',
  categoryController.getMensClothing
);

////////////////////////////////
//      WOMEN'S CATEGORY      //
///////////////////////////////
router.get('/category/woman-clothing', categoryController.getWomensClothing);
router.get(
  '/users/:username/category/woman-clothing',
  categoryController.getWomensClothing
);


module.exports = router;
