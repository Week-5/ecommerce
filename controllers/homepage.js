const { User, Item, Cart } = require('../index');

////////////////////////////////
//           HOMEPAGE         //
///////////////////////////////

exports.getHomepage = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const allItems = await Item.findAll();
  const popularItems = allItems.slice(-4);

  let data = {
    allItems: allItems,
    popularItems: popularItems,
  };

  if (user !== null) {
    const cart = await Cart.findOne({
      where: { UserUsername: user.username },
    });

    const items = await user.getItems();
    
    data = {
      user: user,
      userItems: items,
      userCart: cart,
      allItems: allItems,
      popularItems: popularItems,
    };
  }

  res.status(200).render('homepage', { data });
};
