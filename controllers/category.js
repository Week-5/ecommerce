const { User, Item, Cart } = require('../index');

////////////////////////////////
//      JEWELRY CATEGORY      //
///////////////////////////////
exports.getJewelry = async (req, res) => {
  const jewelry = await Item.findAll({ where: { category: 'jewelry' } });
  res.render('category', { jewelry });
};

////////////////////////////////
//      ELECTRONICS CATEGORY      //
///////////////////////////////
exports.getElectronics = async (req, res) => {
  const electronics = await Item.findAll({
    where: { category: 'Electronics' },
  });
  res.render('category', { electronics });
};

////////////////////////////////
//  MEN'S CLOTHING CATEGORY   //
///////////////////////////////
exports.getMensClothing = async (req, res) => {
  const maleClothing = await Item.findAll({
    where: { category: "Men's Clothing" },
  });
  res.render('category', { maleClothing });
};

////////////////////////////////
//      WOMEN'S CATEGORY      //
///////////////////////////////
exports.getWomensClothing = async (req, res) => {
  const femaleClothing = await Item.findAll({
    where: { category: "Women's Clothing" },
  });
  res.render('category', { femaleClothing });
};
