const { User, Item, Cart } = require('../index');

////////////////////////////////
//          CART PAGE         //
///////////////////////////////
exports.getCartPage = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({ where: { UserUsername: user.username } });
  const items = await Cart.getItems();

  const data = {
    user: user,
    cart: cart,
    items:items,
  };

  res.status(200).render('homepage', { data });
};

////////////////////////////////
//      ADD ITEM TO CART      //
///////////////////////////////
exports.postItemToCart = async (req, res) => {
  const user = await User.findByPk(req.params.username)
  const cart = await Cart.findOne({where: {UserUsername:user.username}})
  const item = await Cart.findOne({ where: { id: req.body.itemID } })
  
  await cart.addItem(item)

  res.status(200).redirect(301, `/users/${user.username}/cart`);
}


