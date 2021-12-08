/* eslint-disable max-len */
const port = 3000;
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

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

app.use(cookieParser());
app.use(
  session({
    secret: 'Shh, its a secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.error = req.flash('error');
  next();
});

// const { homepageRoutes, userRoutes, itemRoutes } = require('./routes/index');
const homepageRoutes = require('./routes/Homepage');
const userRoutes = require('./routes/User');
const itemRoutes = require('./routes/Item');
const cartRoutes = require('./routes/Cart');
const categoryRoutes = require('./routes/Category');
app.use(homepageRoutes);
app.use(userRoutes);
app.use(itemRoutes);
app.use(cartRoutes);
app.use(categoryRoutes);

app.listen(port, () => {
  console.log('Server is running!');
});
