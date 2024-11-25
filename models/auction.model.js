

const {Op, DataTypes} = require("sequelize")
const sequelize = require('../config/sequelize')


const AuctionItems = sequelize.define("AuctionItem", 
    {
    sn: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    auction_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    item_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
          },
    },
    item_condition: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
          notEmpty: true,
        },
    },
    item_description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    base_price: {
      type:  DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true, 
        min: 0,          
      },
    },
    item_photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
        type: DataTypes.STRING,
        references: {
          model: "Categories",
          key: "category_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
      auction_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},{
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "modified_at"  
  
})

module.exports = { AuctionItems }
