const { User, Item, Cart } = require('../index');

////////////////////////////////
//      JEWELRY CATEGORY      //
///////////////////////////////
exports.getJewelry = async (req, res) => {
  const category = await Item.findAll({ where: { category: 'Jewelry' } });
  res.render('category', { category });
};

////////////////////////////////
//      ELECTRONICS CATEGORY      //
///////////////////////////////
exports.getElectronics = async (req, res) => {
  const category = await Item.findAll({
    where: { category: 'Electronics' },
  });
  res.render('category', { category });
};

////////////////////////////////
//  MEN'S CLOTHING CATEGORY   //
///////////////////////////////
exports.getMensClothing = async (req, res) => {
  const category = await Item.findAll({
    where: { category: "Men's Clothing" },
  });
  res.render('category', { category });
};

////////////////////////////////
//      WOMEN'S CATEGORY      //
///////////////////////////////
exports.getWomensClothing = async (req, res) => {
  const category = await Item.findAll({
    where: { category: "Women's Clothing" },
  });
  res.render('category', { category });
};
