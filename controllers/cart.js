const { User, Item, Cart } = require('../index');

////////////////////////////////
//          CART PAGE         //
///////////////////////////////
exports.getCartPage = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({where: {UserUsername: user.username}});
  const items = await cart.getItems();

  const data = {
    user: user,
    cart: cart,
    items: items,
  };

  res.status(200).render('./cart/cart', {data});
};

////////////////////////////////
//      ADD ITEM TO CART      //
///////////////////////////////
exports.postItemToCart = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({where: {UserUsername: user.username}});
  const item = await Item.findOne({where: {id: req.body.itemID}});

  await cart.addItem(item);

  const items = await cart.getItems();

  cart.set({
    totalPrice: items.length === 0 ? 0 : items.map((item) => item.price).reduce((a, b) => a+b),
  })

  await cart.save()

  res.status(200).redirect(301, `/users/${user.username}/cart`);
};

////////////////////////////////
//   DELETE ITEM FROM CART    //
///////////////////////////////
exports.deleteItemFromCart = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({ where: { UserUsername: user.username } });
  const item = await Item.findOne({ where: { id: req.body.itemID } });

  await cart.removeItem(item);

  const items = await cart.getItems();

  cart.set({
    totalPrice: items.length === 0 ? 0 : items.map((item) => item.price).reduce((a, b) => a+b),
  });

  await cart.save();

  res.status(200).redirect(301, `/users/${user.username}/cart`);
}

