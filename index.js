const {db} = require('./db');
const {User} = require('./classes/User');
const {Item} = require('./classes/Item');
const {Cart} = require('./classes/Cart');

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Item);
Item.belongsTo(User);


Cart.hasMany(Item);
Item.belongsTo(Cart);
// reference for deleting profile cascade
// User.hasMany(Restaurant, {onDelete: 'cascade'});

module.exports = {User, Item, Cart};
