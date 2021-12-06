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
	const newFullName = req.body.newFullName;
	const newEmail = req.body.newEmail;
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

	res.status(200).redirect(`/homepage/${newUser.username}`);
};

////////////////////////////////
//  READ USER FUNCTIONALITY  //
///////////////////////////////
// get a specific user
// if admin, show items owned by said admin
exports.getUser = async (req, res) => {
	const user = await User.findByPk(req.params.username);
	let data = {};

	if (user.isAdmin === true) {
		const items = await user.getItems();
		data = {
			user: user,
			userItems: items,
		};
	} else {
		data = {
			user: user,
		};
	}

	res.status(200).render('user', { data });
};

////////////////////////////////
// UPDATE USER FUNCTIONALITY //
///////////////////////////////
// render user update form
exports.getUpdateUser = async (req, res) => {
	const user = await User.findByPk(req.params.username);
	res.status(200).render('userUpdate', { user });
};
// user update
exports.postUpdateUser = async (req, res) => {
	const user = await User.findByPk(req.params.username);
	const udpatedUsername = req.body.username;
	const updatedFullName = req.body.fullName;
	const updatedEmail = req.body.email;
	const updatedPassword = req.body.password;
	const updatedIsAdmin = req.body.isAdmin;

	await user.set({
		username: udpatedUsername === '' ? user.username : udpatedUsername,
		fullName: updatedFullName === '' ? user.fullName : updatedFullName,
		email: updatedEmail === '' ? user.email : updatedEmail,
		password: updatedPassword === '' ? user.password : updatedPassword,
		isAdmin: updatedIsAdmin === '' ? user.isAdmin : updatedIsAdmin,
	});

	await user.save();
	res.status(200).redirect(`/users/${user.username}`);
};

////////////////////////////////
// DELETE USER FUNCTIONALITY //
///////////////////////////////
// delete a user
exports.deleteUser = async (req, res) => {
	const user = await User.findByPk(req.params.username);
	await user.destroy();
	res.redirect(301, 'homepage');
};
