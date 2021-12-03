const express = require('express');
const port = 3000;
const {Admin, Customer, Item, Cart} = require('./index');
const {db} = require('./db');
const Handlebars = require('handlebars');
const {engine} = require('express-handlebars');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

const seed = require('./seed');

app.use(express.json());

seed();

// get all items
app.get('/items', async (req, res) => {
  const items = await Item.findAll();
  const data = {
    items: items,
  };
  res.render('allItems', {data});
});

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
