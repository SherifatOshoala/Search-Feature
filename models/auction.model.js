

const {Op, DataTypes} = require("sequelize")
const sequelize = require('../config/sequelize')


const AuctionItems = sequelize.define("AuctionItem", 
    {
    auction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
        type: DataTypes.INTEGER,
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

async function insertAuctionItems() {
  try{
    await AuctionItems.bulkCreate([
      {
      item_name: 'Vintage Leather Jacket',
      item_condition: 'very good',
      item_description: 'A high-quality vintage leather jacket, size M, in good condition.',
      base_price: 150.00,
      item_photo: 'images/vintage-leather-jacket.jpg',
      category_id: 1,
      auction_time: new Date()
  },
  {
      item_name: 'Diamond Necklace',
      item_condition: 'brand new',
      item_description: 'A beautiful diamond necklace with intricate gold work, perfect for special occasions.',
      base_price: 5000.00,
      item_photo: 'images/diamond-necklace.jpg',
      category_id: 2,
      auction_time: new Date('2024-11-23T12:30:00')
  },
  {
      item_name: 'Gaming Laptop',
      item_condition: 'good',
      item_description: 'A powerful gaming laptop with the latest NVIDIA GPU, 16GB RAM, and 512GB SSD storage.',
      base_price: 1200.00,
      item_photo: 'images/gaming-laptop.jpg',
      category_id: 3,
      auction_time: new Date('2024-11-26T08:45:00')
  },
  {
      item_name: 'Antique Silver Spoon Set',
      item_condition: 'good',
      item_description: 'A set of antique silver spoons from the early 20th century.',
      base_price: 250.00,
      item_photo: 'images/antique-silver-spoons.jpg',
      category_id: 4,
      auction_time: new Date('2024-11-26T15:00:00')
  },
  {
      item_name: 'Smart TV 55" 4K',
      item_condition: 'brand new',
      item_description: 'A brand new 55-inch 4K smart TV with voice control and Wi-Fi connectivity.',
      base_price: 800.00,
      item_photo: 'images/smart-tv.jpg',
      category_id: 4,
      auction_time: new Date('2024-11-21T11:15:00')
  },
  {
      item_name: 'Designer Handbag',
      item_condition: 'like new',
      item_description: 'A limited edition designer handbag made of premium leather, in excellent condition.',
      base_price: 950.00,
      item_photo: 'images/designer-handbag.jpg',
      category_id: 1,
      auction_time: new Date('2024-11-25T14:45:00')
  },
  {
      item_name: 'Vintage Leather Jacket XL',
      item_condition: 'good',
      item_description: 'A high-quality vintage leather jacket, size XL, in excellent condition.',
      base_price: 150.00,
      item_photo: 'images/vintage-leather-jacket-xl.jpg',
      category_id:1,
      auction_time: new Date('2024-11-22T09:30:00')
  },
  {
      item_name: 'Leather Jacket Special Edition',
      item_condition: 'very good',
      item_description: 'Special edition of the leather jacket, limited size and design, size L.',
      base_price: 150.00,
      item_photo: 'images/leather-jacket-special-edition.jpg',
      category_id: 1,
      auction_time: new Date('2024-11-23T13:00:00')
  },
  {
      item_name: 'Vintage Leather Jacket - Red',
      item_condition: 'brand new',
      item_description: 'A red vintage leather jacket, perfect for colder seasons, size M.',
      base_price: 150.00,
      item_photo: 'images/vintage-leather-jacket-red.jpg',
      category_id: 1,
      auction_time: new Date('2024-11-25T10:30:00')
  }
  ], {ignoreDuplicates: true})
     console.log('Auction items seeded successfully!');
  }  catch (error) {
    console.error('Error seeding auction items:', error);
  }
}

insertAuctionItems()

module.exports = { AuctionItems }
