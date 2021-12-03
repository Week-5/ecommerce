const {db, DataTypes, Model} = require('../db');
/**
 * User class extends Model
 */
class Customer extends Model {}

Customer.init(
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize: db,
      timestamps: false,
    },
);

module.exports = {
  Customer,
};
