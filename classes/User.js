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
        // unique: true,
        validate: {
          notEmpty: {
            args: [true],
            msg: "Cannot be left blank"
          },
        }
      },
      fullName: {
        type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //   notEmpty: {
        //     args: [true],
        //     msg: "Cannot be left blank"
        //   },
        // }
      },
      email: {
        type: DataTypes.STRING,
        // validate: {
        //   isEmail: {},
        //   args: [true],
        //   msg: "Cannot be left blank"
        // }
      },
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize: db,
      timestamps: false,
    },
);

module.exports = {
  User,
};
