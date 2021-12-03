const express = require('express');
const port = 3000;
const {User, Item, Cart} = require('./index');
const {db} = require('./db');
const Handlebars = require('handlebars');
const {engine} = require('express-handlebars');

const app = express();

//send data as json object
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//enable handlebars frontend
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

//seed database
seed();


// get all items
app.get('/items', async (req, res) => {
  const items = await Item.findAll();
  const data = {
    items: items,
  };
  res.render('allItems', {data});
});

app.get('/homepage/:username', async (req, res) => {
  const user = await User.findByPk(req.params.username)
  const cart = await Cart.findOne({
    where: {Userusername: user.username}
  })
  const items = await user.getItems()

  const data = {
    user: user,
    userItems: items,
    userCart: cart
  }

  res.render('homepage', {data})
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
