const { db, DataTypes, Model } = require('../db');
/**
 * Item class extends Model
 */
class Item extends Model {}

Item.init(
	{
		title: DataTypes.STRING,
		stock: DataTypes.INTEGER,
		price: DataTypes.FLOAT,
		description: DataTypes.STRING,
		category: DataTypes.STRING,
		image: DataTypes.STRING,
		clickCount: DataTypes.INTEGER,
	},
	{
		sequelize: db,
		timestamps: false,
	}
);

module.exports = {
	Item,
};
