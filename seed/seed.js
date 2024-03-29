/* eslint-disable max-len */
const path = require('path');
const fs = require('fs').promises;

// access to our model and database
const {db} = require('../db');
const {User} = require('../classes/User');
const {Item} = require('../classes/Item');
const { Cart } = require('../classes/Cart');

const userJson = './User.json'
const itemJson = './Item.json';
const cartJson = './Cart.json';

const seed = async () => {
  await db.sync({force: true});

  const userSeedPath = path.join(__dirname, userJson);
  const itemSeedPath = path.join(__dirname, itemJson);
  const cartSeedPath = path.join(__dirname, cartJson);

  const userBuffer = await fs.readFile(userSeedPath);
  const {userData} = JSON.parse(String(userBuffer));

  const itemBuffer = await fs.readFile(itemSeedPath);
  const {itemData} = JSON.parse(String(itemBuffer));

  const cartBuffer = await fs.readFile(cartSeedPath);
  const {cartData} = JSON.parse(String(cartBuffer));

  const userPromises = userData.map((user) => User.create(user));
  const cartPromises = cartData.map((cart) => Cart.create(cart));
  const itemPromises = itemData.map((item) => Item.create(item));


  await Promise.all(userPromises);
  console.log('admin data has been successfully populated into our table');

  await Promise.all(itemPromises);
  console.log('item data has been successfully populated into our table');

  await Promise.all(cartPromises);
  console.log('cart item data has been successfully populated into our table');
};

module.exports = seed;
