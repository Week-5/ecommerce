/* eslint-disable max-len */
const express = require('express');
const port = 3000;
const {User, Item, Cart} = require('./index');
const {db} = require('./db');
const Handlebars = require('handlebars');

// custom handlebar operator helpers
// pulled from: https://stackoverflow.com/questions/33316562/how-to-compare-a-value-in-handlebars
Handlebars.registerHelper(
    'when',
    function(operand_1, operator, operand_2, options) {
      const operators = {
        'eq': function(l, r) {
          return l == r;
        },
        'noteq': function(l, r) {
          return l != r;
        },
        'gt': function(l, r) {
          return Number(l) > Number(r);
        },
        'or': function(l, r) {
          return l || r;
        },
        'and': function(l, r) {
          return l && r;
        },
        '%': function(l, r) {
          return l % r === 0;
        },
      };
      const result = operators[operator](operand_1, operand_2);

      if (result) return options.fn(this);
      else return options.inverse(this);
    },
);

Handlebars.registerHelper('for', function(from, to, incr, block) {
  let accum = '';
  for (let i = from; i < to; i += incr) {
    accum += block.fn(i);
  }
  return accum;
});

const {engine} = require('express-handlebars');

const app = express();

// send data as json object
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// enable handlebars frontend
app.engine(
    'handlebars',
    engine({
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      },
    }),
);

app.set('view engine', 'handlebars');

app.use(express.static('public'));

const seed = require('./seed');

// app.use(express.json());

// seed database
seed();

// get all items
app.get('/items', async (req, res) => {
  const items = await Item.findAll();
  const data = {
    items: items,
  };
  res.render('allItems', {data});
});

// get jewelry category
app.get('/category/jewelry', async (req, res) => {
  const category = await Item.findAll({where: {category: 'Jewelry'}});
  res.render('category', {category});
});

// get Men's Clothing category
app.get('/category/clothing/man-clothing', async (req, res) => {
  const category = await Item.findAll({where: {category: 'Men\'s Clothing'}});
  res.render('category', {category});
});

// get Women's Clothing category
app.get('/category/clothing/woman-clothing', async (req, res) => {
  const category = await Item.findAll({where: {category: 'Women\'s Clothing'}});
  res.render('category', {category});
});

// get electronic category
app.get('/category/electronics', async (req, res) => {
  const category = await Item.findAll({where: {category: 'Electronics'}});
  res.render('category', {category});
});

// get single item
app.get('/items/:id', async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  const data = {
    item: item,
  };
  res.render('item', {data});
});


// homepage without user logged in
app.get('/homepage', async (req, res) => {
  const allItems = await Item.findAll();
  const data = {
    allItems: allItems,
  };
  res.status(200).render('homepage', {data});
});

// homepage with user loggined in
app.get('/homepage/:username', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({where: {UserUsername: user.username}});
  const items = await cart.getItems();
  const allItems = await Item.findAll();
  const popularItems = allItems.slice(0, 4);
  // allItems.sort(function(a, b) {
  //   return a-b;
  // });
  const data = {
    user: user,
    items: items,
    allItems: allItems,
    popularItems: popularItems,
  };

  res.status(200).render('homepage', {data});
});

// create account path
app.get('/create-account', async (req, res) => {
  res.status(200).render('userCreate');
});

app.get('/users/:username', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({where: {UserUsername: user.username}});
  const items = await cart.getItems();
  const adminItems = await Item.findAll({where: {UserUsername: user.username}});
  const data = {
    user: user,
    items: items,
    adminItems: adminItems,
  };
  res.render('user', {data});
});

// post account path
app.post('/create-account', async (req, res) => {
  const newUsername = req.body.username;
  const newFullName = req.body.newFullName;
  const newEmail = req.body.newEmail;
  const newPassword = req.body.password;

  // create new user
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
});

// get log-in
app.get('/log-in', async (req, res) => {
  res.render('userLogin');
});

app.post('/log-in', async (req, res) => {
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
    res.status(200).redirect(`/homepage/${inputName}`);
  } else {
    res.status(200).redirect('/create-account');
  }
});

// user can view their account page
// if admin send admin items to frontend
app.get('/users/:username/', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const data = {};

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

  res.status(200).render('user', {data});
});

// user can view account update form
app.get('/users/:username/update-account', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  res.status(200).render('userUpdate', {user});
});

// user sends udpate account request
app.post('/users/:username/update-account', async (req, res) => {
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

  res.status(200).redirect(`/users/${user.username}`);
});

// user deletes account
app.post('/users/:username/delete-profile', async (req, res) => {
  const user = await User.findByPk(req.params.username);

  await user.destroy();

  res.redirect(301, '/homepage');
});

// user can view create item form
app.get('/users/:username/create-item', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const data = {
    user: user,
  };
  res.status(200).render('itemCreate', {data});
});

// user submits create item payload
app.post('/users/:username/create-item', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const newTitle = req.body.title;
  const newStock = req.body.stock;
  const newPrice = req.body.price;
  const newDescription = req.body.description;
  const newCategory = req.body.category;
  const newImage = req.body.image;

  const newItem = await Item.create({
    title: newTitle,
    stock: newStock,
    price: newPrice,
    description: newDescription,
    category: newCategory,
    image: newImage,
    clickCount: 0,
    UserUsername: user.username,
  });
  res.status(200).redirect(301, `/users/${user.username}/items/${newItem.id}`);
});


// item homepage
app.get('/users/:username/items/:id', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);
  const cart = await Cart.findOne({where: {UserUsername: user.username}});
  const items = await cart.getItems();

  const data = {
    item: item,
    user: user,
    items: items,
  };
  res.render('item', {data});
});

// TODO:
// user can view update item form
app.get('/users/:username/items/:id/update-item', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);

  const data = {
    user: user,
    item: item,
  };

  res.status(200).render('itemUpdate', {data});
});

// user can submit item update
app.post('/users/:username/items/:id/update-item', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);

  const updatedTitle = req.body.title;
  const updatedStock = req.body.stock;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedCategory = req.body.category;
  const updatedImage = req.body.image;

  item.set({
    title: updatedTitle === '' ? item.title : updatedTitle,
    stock: updatedStock === '' ? item.stock : updatedStock,
    price: updatedPrice === '' ? item.price : updatedPrice,
    description: updatedDescription === '' ? item.description : updatedDescription,
    category: updatedCategory === 'default' ? item.category : updatedCategory,
    image: updatedImage === '' ? item.image : updatedImage,
    clickCount: item.clickCount,
  });

  await item.save();

  res.status(200).redirect(301, `/users/${user.username}/items/${item.id}/`);
});

// user can delete item
app.post('/users/:username/items/:id/delete-item', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);

  await item.destroy();

  res.status(200).redirect(`/users/${user.username}`);
});

// get cart page
app.get('/users/:username/cart', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({where: {UserUsername: user.username}});
  const items = await cart.getItems();

  cart.totalPrice = items.map((item) => item.price).reduce((a, b) => a+b);

  const data = {
    user: user,
    cart: cart,
    items: items,
  };

  res.status(200).render('cart', {data});
});

// add item to cart
app.post('/users/:username/cart', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({where: {UserUsername: user.username}});
  const item = await Item.findOne({where: {id: req.body.itemID}});

  await cart.addItem(item);
  res.status(200).redirect(301, `/users/${user.username}/cart`);
});

app.listen(port, () => {
  console.log('Server is running!');
});
