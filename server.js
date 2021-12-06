/* eslint-disable max-len */
const port = 3000;
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const express = require('express');
const app = express();

// seed database
const seed = require('./seed');
seed();

// send data as json object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable handlebars frontend
app.engine(
  'handlebars',
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set('view engine', 'handlebars');
app.use(express.static('public'));

// custom handlebar operator helpers
// pulled from: https://stackoverflow.com/questions/33316562/how-to-compare-a-value-in-handlebars
Handlebars.registerHelper(
  'when',
  function (operand_1, operator, operand_2, options) {
    const operators = {
      eq: function (l, r) {
        return l == r;
      },
      noteq: function (l, r) {
        return l != r;
      },
      gt: function (l, r) {
        return Number(l) > Number(r);
      },
      or: function (l, r) {
        return l || r;
      },
      and: function (l, r) {
        return l && r;
      },
      '%': function (l, r) {
        return l % r === 0;
      },
    };
    const result = operators[operator](operand_1, operand_2);

    if (result) return options.fn(this);
    else return options.inverse(this);
  }
);

Handlebars.registerHelper('for', function (from, to, incr, block) {
  let accum = '';
  for (let i = from; i < to; i += incr) {
    accum += block.fn(i);
  }
  return accum;
});

// const { homepageRoutes, userRoutes, itemRoutes } = require('./routes/index');
const homepageRoutes = require('./routes/Homepage');
const userRoutes = require('./routes/User');
const itemRoutes = require('./routes/Item');
app.use(homepageRoutes);
app.use(userRoutes);
app.use(itemRoutes);
// app.use(cartRoutes)

// TODO: remove after cart is separated into its own route and controller
const { User, Item, Cart } = require('../index');
// get cart page
app.get('/users/:username/cart', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({ where: { UserUsername: user.username } });
  const items = await cart.getItems();

  cart.totalPrice = items.map((item) => item.price).reduce((a, b) => a + b);

  const data = {
    user: user,
    cart: cart,
    items: items,
  };

  res.status(200).render('cart', { data });
});

//add item to cart
app.post('/users/:username/cart', async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({ where: { UserUsername: user.username } });
  const item = await Item.findOne({ where: { id: req.body.name } });

  cart.items = [];
  cart.items.push(item);

  res.render(301, `/users/${user.username}/cart`);
});

app.listen(port, () => {
  console.log('Server is running!');
});
