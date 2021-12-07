const { User, Item, Cart } = require('../index');

////////////////////////////////
//        HOMEPAGE GUEST      //
///////////////////////////////
exports.getHomepageGuest = async (req, res) => {
  const allItems = await Item.findAll();
  const popularItems = allItems.slice(0, 4);
  const data = {
    allItems: allItems,
    popularItems: popularItems,
  };
  res.status(200).render('homepage', { data });
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
  const popularItems = allItems.slice(0, 4);
  // allItems.sort(function(a, b) {
  //   return a-b;
  // });
  const data = {
    user: user,
    userItems: items,
    userCart: cart,
    allItems: allItems,
    popularItems: popularItems,
  };

  res.status(200).render('homepage', { data });
};
