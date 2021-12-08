const { User, Item, Cart } = require('../index');

////////////////////////////////
// CREATE USER FUNCTIONALITY //
///////////////////////////////
// render create user form
exports.getCreateUser = async (req, res) => {
  res.status(200).render('userCreate');
};
// create a new user
exports.postCreateUser = async (req, res) => {
  const newUsername = req.body.username;
  const newFullName = req.body.fullName;
  const newEmail = req.body.email;
  const newPassword = req.body.password;

  const newUser = await User.create({
    username: newUsername,
    fullName: newFullName,
    email: newEmail,
    password: newPassword,
  });

  // create new cart and assign it to new user
  const newUserCart = await Cart.create({
    totalPrice: 0,
    UserUsername: newUser.username,
  });

  res.status(200).redirect(301, `/homepage/${newUser.username}`);
};

////////////////////////////////
//  READ USER FUNCTIONALITY  //
///////////////////////////////
// get a specific user
// render log in page
exports.getLogIn = async (req, res) => {
  res.render('userLogin');
};
// log in user
exports.postLogIn = async (req, res) => {
  const inputName = req.body.username;
  const inputPassword = req.body.password;
  const checkUser = await User.findByPk(inputName);
  let loggedUsername = false;
  let loggedPassword = false;
  if (checkUser) {
    loggedUsername = true;
  }
  if (inputPassword === checkUser.password) {
    loggedPassword = true;
  }

  if (loggedUsername && loggedPassword) {
    res.status(200).redirect(301, `/homepage/${inputName}`);
  } else {
    res.status(200).redirect(301, '/user/create-account');
  }
};

// if admin, show items owned by said admin
// profile page
exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({ where: { UserUsername: user.username } });
  const items = await cart.getItems();
  const adminItems = await Item.findAll({
    where: { UserUsername: user.username },
  });
  const data = {
    user: user,
    items: items,
    adminItems: adminItems,
  };
  res.status(200).render('user', { data });
};

////////////////////////////////
// UPDATE USER FUNCTIONALITY //
///////////////////////////////
// render user update form
exports.getUpdateUser = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({ where: { UserUsername: user.username } });
  const items = await cart.getItems();
  const data = {
    user: user,
    items: items,
  };
  res.status(200).render('userUpdate', { data });
};
// user update
exports.postUpdateUser = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const updatedFullName = req.body.fullName;
  const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;
  const updatedIsAdmin = req.body.isAdmin;

  user.set({
    fullName: updatedFullName === '' ? user.fullName : updatedFullName,
    email: updatedEmail === '' ? user.email : updatedEmail,
    password: updatedPassword === '' ? user.password : updatedPassword,
    isAdmin: updatedIsAdmin === undefined ? user.isAdmin : updatedIsAdmin,
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
  res.redirect(301, '/homepage/homepage');
};
