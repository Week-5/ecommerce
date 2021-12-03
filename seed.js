/* eslint-disable max-len */
const path = require('path');
const fs = require('fs').promises;

// access to our model and database
const {db} = require('./db');
const {Admin} = require('./classes/Admin');
const {Customer} = require('./classes/Customer');
const {Item} = require('./classes/Item');
const {Cart} = require('./classes/Cart');

const seed = async () => {
  await db.sync({force: true});

  const adminSeedPath = path.join(__dirname, 'Admin.json');
  const customerSeedPath = path.join(__dirname, 'Customer.json');
  const itemSeedPath = path.join(__dirname, 'Item.json');
  const cartSeedPath = path.join(__dirname, 'Cart.json');

  const adminBuffer = await fs.readFile(adminSeedPath);
  const {adminData} = JSON.parse(String(adminBuffer));

  const customerBuffer = await fs.readFile(customerSeedPath);
  const {customerData} = JSON.parse(String(customerBuffer));

  const itemBuffer = await fs.readFile(itemSeedPath);
  const {itemData} = JSON.parse(String(itemBuffer));

  const cartBuffer = await fs.readFile(cartSeedPath);
  const {cartData} = JSON.parse(String(cartBuffer));

  const adminPromises = adminData.map((admin) => Admin.create(admin));
  const customerPromises = customerData.map((customer) => Customer.create(customer));
  const itemPromises = itemData.map((item) => Item.create(item));
  const cartPromises = cartData.map((cart) => Cart.create(cart));

  await Promise.all(adminPromises);
  console.log('admin data has been successfully populated into our table');

  await Promise.all(customerPromises);
  console.log('customer data has been successfully populated into our table');

  await Promise.all(itemPromises);
  console.log('item data has been successfully populated into our table');

  await Promise.all(cartPromises);
  console.log('cart item data has been successfully populated into our table');
};

module.exports = seed;
