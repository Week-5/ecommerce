const {db, DataTypes, Model} = require('../db');
/**
 * Cart class extends Model
 */
class Cart extends Model {}

Cart.init(
    {
      totalPrice: DataTypes.FLOAT,
    },
    {
      sequelize: db,
      timestamps: false,
    },
);

module.exports = {
  Cart,
};
