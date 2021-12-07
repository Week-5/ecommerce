const { User, Item, Cart } = require('../index');

////////////////////////////////
// CREATE ITEM FUNCTIONALITY //
///////////////////////////////
// render create item form
exports.getCreateItem = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const data = {
    user: user,
  };
  res.status(200).render('itemCreate', { data });
};
// create a new item
exports.postCreateItem = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const newTitle = req.body.title;
  const newStock = req.body.stock;
  const newPrice = req.body.price;
  const newDescription = req.body.description;
  const newCategory = req.body.category;
  const newImage = req.body.image;

  const newItem = await Item.create({
    title: newTitle,
    stock: newStock,
    price: newPrice,
    description: newDescription,
    category: newCategory,
    image: newImage,
    clickCount: 0,
    UserUsername: user.username,
  });

  res.status(200).redirect(301, `/users/${user.username}/items/${newItem.id}`);
};

////////////////////////////////
//  READ ITEM FUNCTIONALITY  //
///////////////////////////////
// render all items in one page
exports.getAllItems = async (req, res) => {
  const items = await Item.findAll();
  const data = {
    items: items,
  };
  res.render('allItems', { data });
};
// render an item
exports.getItem = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);
  const data = {
    item: item,
    user: user,
  };
  res.render('item', { data });
};

////////////////////////////////
//  UPDATE ITEM FUNCTIONALITY  //
///////////////////////////////
// render update item form
exports.getUpdateItem = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);

  const data = {
    user: user,
    item: item,
  };

  res.status(200).render('itemUpdate', { data });
};
// update an item
exports.postUpdateItem = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);

  const updatedTitle = req.body.title;
  const updatedStock = req.body.stock;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedCategory = req.body.category;
  const updatedImage = req.body.image;

  await item.set({
    title: updatedTitle === '' ? item.title : updatedTitle,
    stock: updatedStock === '' ? item.stock : updatedStock,
    price: updatedPrice === '' ? item.price : updatedPrice,
    description:
      updatedDescription === '' ? item.description : updatedDescription,
    category: updatedCategory === 'default' ? item.category : updatedCategory,
    image: updatedImage === '' ? item.image : updatedImage,
    clickCount: item.clickCount,
  });

  await item.save();

  res.status(200).redirect(301, `/users/${user.username}/items/${item.id}/`);
};

////////////////////////////////
//  DELETE ITEM FUNCTIONALITY  //
///////////////////////////////
// delete an item
exports.deleteItem = async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);

  await item.destroy();

  res.status(200).redirect(301, `/users/${user.username}`);
};
