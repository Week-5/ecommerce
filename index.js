const {db} = require('./db');
const {Admin} = require('./classes/Admin');
const {Customer} = require('./classes/Customer');
const {Item} = require('./classes/Item');
const {Cart} = require('./classes/Cart');

Admin.hasOne(Cart);
Cart.belongsTo(Admin);

Admin.hasMany(Item);
Item.belongsTo(Admin);

Customer.hasOne(Cart);
Cart.belongsTo(Customer);

Cart.hasMany(Item);
Item.belongsTo(Cart);
// reference for deleting profile cascade
// User.hasMany(Restaurant, {onDelete: 'cascade'});

module.exports = {Admin, Customer, Item, Cart};
