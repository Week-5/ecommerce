const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item');

////////////////////////////////
// CREATE ITEM FUNCTIONALITY //
///////////////////////////////
router.get('/users/:username/create-item', itemController.getCreateItem);
router.post('/users/:username/create-item', itemController.postCreateItem);

////////////////////////////////
//  READ ITEM FUNCTIONALITY  //
///////////////////////////////
router.get('/items', itemController.getAllItems); // all items for guest
router.get('/users/:username/items', itemController.getAllItems); // all items for users
router.get('/items/:id', itemController.getItem); // item page for guest
router.get('/users/:username/items/:id', itemController.getItem); // item page for users

////////////////////////////////
// UPDATE ITEM FUNCTIONALITY //
///////////////////////////////
router.get(
  '/users/:username/items/:id/update-item',
  itemController.getUpdateItem
);
router.post(
  '/users/:username/items/:id/update-item',
  itemController.postUpdateItem
);

////////////////////////////////
// DELETE ITEM FUNCTIONALITY //
///////////////////////////////
router.post(
  '/users/:username/items/:id/delete-item',
  itemController.deleteItem
);

module.exports = router;
