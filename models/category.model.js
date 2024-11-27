const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Categories = sequelize.define(
  "Category",
  {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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


async function insertCategoryRecords() {

    try {
      await Categories.bulkCreate([
        {
          name: 'Clothing',
          description: 'Apparel items like clothes, shoes, belts, and caps',
        },
        {
          name: 'Jewelry',
          description: 'Accessories including bracelets, necklaces, rings, and anklets',
        },
        {
          name: 'Valuables',
          description: 'Collectibles such as medals, awards, and other precious items',
        },
        {
          name: 'Home Appliances',
          description: 'Kitchen gadgets, TVs, and other home electronics',
        },
        {
          name: 'Furniture',
          description: 'Household items like chairs, tables, and sofas',
        },
      ], { ignoreDuplicates: true });
  
      console.log('Categories seeded successfully!');
    } catch (error) {
      console.error('Error seeding categories:', error);
    }
  }
  

  insertCategoryRecords()

module.exports = { Categories };
