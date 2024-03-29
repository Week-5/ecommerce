const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { User, Item, Cart } = require('../index');

////////////////////////////////
// CREATE USER FUNCTIONALITY //
///////////////////////////////
// render create user form
exports.getCreateUser = async (req, res) => {
  res.status(200).render('./user/userCreate');
};
// create a new user
exports.postCreateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const newUsername = req.body.username;
    const newFullName = req.body.fullName;
    const newEmail = req.body.email;
    const newPassword = req.body.password;

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const newUser = await User.create({
      username: newUsername,
      fullName: newFullName,
      email: newEmail,
      password: hashedPassword,
      isAdmin: 0,
    });

    // create new cart and assign it to new user
    const newUserCart = await Cart.create({
      totalPrice: 0,
      UserUsername: newUser.username,
    });
    req.flash('success', 'Successfully created account');
    res.status(200).redirect(301, `/homepage/${newUser.username}`);
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

////////////////////////////////
//  READ USER FUNCTIONALITY  //
///////////////////////////////
// get a specific user
// render log in page
exports.getLogIn = async (req, res) => {
  res.status(200).render('./user/userLogin');
};
// log in user
exports.postLogIn = async (req, res) => {
  const inputName = req.body.username;
  const inputPassword = req.body.password;
  const user = await User.findByPk(inputName);
  let loggedUsername = false;

  if (user) {
    loggedUsername = true;
  }

  const match = await bcrypt.compare(inputPassword, user.password);

  if (match) {
    res.status(200).redirect(301, `/homepage/${inputName}`);
  } else {
    res.status(200).redirect(301, '/create-account');
  }
};

// if admin, show items owned by said admin
// profile page
exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.params.username);

  let data = {}

  if (user !== null) {
    const cart = await Cart.findOne({ where: { UserUsername: user.username } });
    const items = await cart.getItems();
    const adminItems = await Item.findAll({ where: { UserUsername: user.username } });
    data = {
      user: user,
      items: items,
      adminItems: adminItems,
    };
  }
  res.status(200).render('./user/user', { data });
};

////////////////////////////////
// UPDATE USER FUNCTIONALITY //
///////////////////////////////
// render user update form
exports.getUpdateUser = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  res.status(200).render('./user/userUpdate', { user });
};
// user update
exports.postUpdateUser = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const updatedFullName = req.body.fullName;
  const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;
  const updatedIsAdmin = req.body.isAdmin === 'on' ? 1 : 0;

  const hashedUpdatedPassword = await bcrypt.hash(updatedPassword, 12)

  user.set({
    fullName: updatedFullName === '' ? user.fullName : updatedFullName,
    email: updatedEmail === '' ? user.email : updatedEmail,
    password: updatedPassword === '' ? user.password : hashedUpdatedPassword,
    isAdmin: updatedIsAdmin === '' ? user.isAdmin : updatedIsAdmin,
  });

  await user.save();
  res.status(200).redirect(301, `/users/${user.username}`);
};

////////////////////////////////
// DELETE USER FUNCTIONALITY //
///////////////////////////////
// delete a user
exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  await user.destroy();
  res.status(200).redirect(301, '/homepage');
};
