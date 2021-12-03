const {db, DataTypes, Model} = require('../db');
/**
 * User class extends Model
 */
class User extends Model {}

User.init(
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isUser: DataTypes.BOOLEAN,
    },
    {
      sequelize: db,
      timestamps: false,
    },
);

module.exports = {
  User,
};
