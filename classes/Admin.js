const {db, DataTypes, Model} = require('../db');
/**
 * Admin class extends Model
 */
class Admin extends Model {}

Admin.init(
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize: db,
      timestamps: false,
    },
);

module.exports = {
  Admin,
};
