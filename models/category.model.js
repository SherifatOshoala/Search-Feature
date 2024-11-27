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


async function insertCategoryRecords() {

    try {
      await Categories.bulkCreate([
        {
          category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe963',
          name: 'Clothing',
          description: 'Apparel items like clothes, shoes, belts, and caps',
        },
        {
          category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe964',
          name: 'Jewelry',
          description: 'Accessories including bracelets, necklaces, rings, and anklets',
        },
        {
          category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe965',
          name: 'Valuables',
          description: 'Collectibles such as medals, awards, and other precious items',
        },
        {
          category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe966',
          name: 'Home Appliances',
          description: 'Kitchen gadgets, TVs, and other home electronics',
        },
        {
          category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe967',
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
