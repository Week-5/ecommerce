const { db } = require('./db');
const { User } = require('./classes/User');
const { Item } = require('./classes/Item');
const { Cart } = require('./classes/Cart');

User.hasOne(Cart, { onDelete: 'cascade' });
Cart.belongsTo(User, { onDelete: 'cascade' });

User.hasMany(Item, { onDelete: 'cascade' });
Item.belongsTo(User, { onDelete: 'cascade' });

Cart.hasMany(Item, { onDelete: 'cascade' });
Item.belongsTo(Cart, { onDelete: 'cascade' });
// reference for deleting profile cascade
// User.hasMany(Restaurant, {onDelete: 'cascade'});

module.exports = { User, Item, Cart };
