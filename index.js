const {db} = require('./db');
const {User} = require('./classes/User');
const {Customer} = require('./classes/Customer');
const {Item} = require('./classes/Item');
const {Cart} = require('./classes/Cart');

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Item);
Item.belongsTo(User);

Customer.hasOne(Cart);
Cart.belongsTo(Customer);

Cart.hasMany(Item);
Item.belongsTo(Cart);
// reference for deleting profile cascade
// User.hasMany(Restaurant, {onDelete: 'cascade'});

module.exports = {User, Customer, Item, Cart};
