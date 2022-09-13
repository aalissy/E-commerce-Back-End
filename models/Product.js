// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // Defines id as an integer, doesn't allow it to be null, sets it as the primary key, and makes it automatically increment its values
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Defines product nam as a string and doesn't allow it to be null
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Sets price as a decimal, doesn't allow it to be null, and checks whether or not the value is a decimal
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    // Defines stock as an integer, doesn't allow it to be null, sets the default valuee to 10, and checks whether or not the value is a number
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    // Defines category id as an integer, and references the category model using the id as the key
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
