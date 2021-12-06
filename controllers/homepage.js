const { User, Item, Cart } = require('../index');

////////////////////////////////
//        HOMEPAGE GUEST      //
///////////////////////////////
exports.getHomepageGuest = async (req, res) => {
  res.status(200).render('homepage');
};

////////////////////////////////
//        HOMEPAGE USER      //
///////////////////////////////
exports.getHomepageUser = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({
    where: { UserUsername: user.username },
  });
  const items = await user.getItems();
  const allItems = await Item.findAll();
  // allItems.sort(function(a, b) {
  //   return a-b;
  // });
  const data = {
    user: user,
    userItems: items,
    userCart: cart,
    allItems: allItems,
  };

  res.status(200).render('homepage', { data });
};
