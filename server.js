const express = require('express');
const port = 3000;
const {User, Item, Cart} = require('./index');
const {db} = require('./db');
const Handlebars = require('handlebars');
const {engine} = require('express-handlebars');

const app = express();

// send data as json object
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// enable handlebars frontend
app.engine('handlebars', engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));

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


//homepage without user logged in
app.get('/homepage', async (req, rest) => {

  res.status(200).render('homepage')
})

//homepage with user loggined in
app.get('/homepage/:username', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({
    where: {Userusername: user.username},
  });
  const items = await user.getItems();

  const data = {
    user: user,
    userItems: items,
    userCart: cart,
  };

  res.status(200).render('homepage', {data});
});

//create account path
app.get('/create-account', async (req, res) => {
  res.status(200).render('createUser')
})

//post account path
app.post('/create-account', async (req, res) => {
  const newUsername = req.body.username
  const newFullName = req.body.newFullName
  const newEmail = req.body.newEmail
  const newPassword = req.body.password

  //create new user
  const newUser = User.create({
    username: newUsername,
    fullName: newFullName,
    email: newEmail,
    password: newPassword
  })

  //create new cart and assign it to new user
  const newUserCart = Cart.create({
    totalPrice:  0,
    UserUsername: newUser.username
  })

  res.status(200).redirect(`/homepage/${newUser.username}`)
})

// get single item
app.get('/items/:id', async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  const data = {
    item: item,
  };
  res.render('item', {data});
});

app.listen(port, () => {
  console.log('Server is running!');
});
