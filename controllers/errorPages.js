const { User, Item, Cart } = require('../index');

////////////////////////////////
//         ERROR PAGE         //
///////////////////////////////
exports.getFOF = async (req, res) => {
  const user = await User.findByPk(req.params.username);

  let data = {};

  if (user !== null) {
    const cart = await Cart.findOne({ where: { UserUsername: user.username } });
    const items = await cart.getItems();

    data = {
      items: items,
      user: user,
    };
  }
  res.status(404).render('./error/404', {
    path: '404',
    data,
  });
};
