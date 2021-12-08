const { User, Item, Cart } = require('../index');

////////////////////////////////
//      JEWELRY CATEGORY      //
///////////////////////////////
exports.getJewelry = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const category = await Item.findAll({ where: { category: "Jewelry" } });

  let data = {
    category: category,
  };

  if (user !== null) {
    const cart = await Cart.findOne({ where: { UserUsername: user.username } });
    const items = await cart.getItems();

    data = {
      user: user,
      items: items,
      category: category,
    };
  }

  res.render('category', { data });
};

////////////////////////////////
//      ELECTRONICS CATEGORY      //
///////////////////////////////
exports.getElectronics = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const category = await Item.findAll({ where: { category: "Electronics" } });

  let data = {
    category: category,
  };

  if (user !== null) {
    const cart = await Cart.findOne({ where: { UserUsername: user.username } });
    const items = await cart.getItems();

    data = {
      user: user,
      items: items,
      category: category,
    };
  }

  res.render('category', { data });
};

////////////////////////////////
//  MEN'S CLOTHING CATEGORY   //
///////////////////////////////
exports.getMensClothing = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const category = await Item.findAll({
    where: { category: "Men's Clothing" },
  });

  let data = {
    category: category,
  };

  if (user !== null) {
    const cart = await Cart.findOne({ where: { UserUsername: user.username } });
    const items = await cart.getItems();

    data = {
      user: user,
      items: items,
      category: category,
    };
  }

  res.render('category', { data });
};

////////////////////////////////
//      WOMEN'S CATEGORY      //
///////////////////////////////
exports.getWomensClothing = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const category = await Item.findAll({
    where: { category: "Women's Clothing" },
  });

  let data = {
    category: category,
  };

  if (user !== null) {
    const cart = await Cart.findOne({ where: { UserUsername: user.username } });
    const items = await cart.getItems();

    data = {
      user: user,
      items: items,
      category: category,
    };
  }

  res.render('category', { data });
};
