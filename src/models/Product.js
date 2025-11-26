const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // 🔹 NUEVO: FK a Category
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 🔹 NUEVO: URL de imagen
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'products',
    timestamps: true,
  }
);

module.exports = Product;
