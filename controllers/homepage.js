const { User, Item, Cart } = require('../index');

////////////////////////////////
//           HOMEPAGE         //
///////////////////////////////

exports.getHomepage = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const allItems = await Item.findAll();
  const popularItems = await Item.findAll({
    order: [[ 'clickCount', 'DESC' ]], limit: 4
  });

  let data = {
    allItems: allItems,
    popularItems: popularItems,
  };

  if (user !== null) {
    const cart = await Cart.findOne({
      where: { UserUsername: user.username },
    });

    const items = await cart.getItems();
    
    data = {
      user: user,
      items: items,
      allItems: allItems,
      popularItems: popularItems,
    };
  }
  
  res.status(200).render('./homepage/homepage', { data });
};
