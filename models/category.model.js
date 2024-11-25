const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Categories = sequelize.define(
  "Category",
  {
    sn: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    category_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "modified_at",
  }
);

module.exports = { Categories };
