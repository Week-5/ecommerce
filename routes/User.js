const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

////////////////////////////////
// CREATE USER FUNCTIONALITY //
///////////////////////////////
router.get('/create-account', userController.getCreateUser);
router.post('/create-acount', userController.postCreateUser);

////////////////////////////////
//  READ USER FUNCTIONALITY  //
///////////////////////////////
router.get('/users/:username', userController.getUser);

////////////////////////////////
// UPDATE USER FUNCTIONALITY //
///////////////////////////////
router.get('/users/:username/update-account', userController.getUpdateUser);
router.post('/users/:username/update-account', userController.postUpdateUser);

////////////////////////////////
// DELETE USER FUNCTIONALITY //
///////////////////////////////
router.post('/users/:username/delete-profile', userController.deleteUser);

module.exports = router;
