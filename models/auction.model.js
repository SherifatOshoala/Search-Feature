

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

async function insertAuctionItems() {
  try{
    await AuctionItems.bulkCreate([
      {
      sn: 1,
      auction_id: '9bf6d89b-cd1d-40b9-af29-4da0e21a8d46',
      item_name: 'Vintage Leather Jacket',
      item_condition: 'very good',
      item_description: 'A high-quality vintage leather jacket, size M, in good condition.',
      base_price: 150.00,
      item_photo: 'images/vintage-leather-jacket.jpg',
      category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe963',
      auction_time: new Date()
  },
  {
      sn: 2,
      auction_id: '9bf6d89b-cd1d-40b9-af29-4da0e21a8d47',
      item_name: 'Diamond Necklace',
      item_condition: 'brand new',
      item_description: 'A beautiful diamond necklace with intricate gold work, perfect for special occasions.',
      base_price: 5000.00,
      item_photo: 'images/diamond-necklace.jpg',
      category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe964',
      auction_time: new Date('2024-11-23T12:30:00')
  },
  {
      sn: 3,
      auction_id: '9bf6d89b-cd1d-40b9-af29-4da0e21a8d48',
      item_name: 'Gaming Laptop',
      item_condition: 'good',
      item_description: 'A powerful gaming laptop with the latest NVIDIA GPU, 16GB RAM, and 512GB SSD storage.',
      base_price: 1200.00,
      item_photo: 'images/gaming-laptop.jpg',
      category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe965',
      auction_time: new Date('2024-11-26T08:45:00')
  },
  {
      sn: 4,
      auction_id: '9bf6d89b-cd1d-40b9-af29-4da0e21a8d49',
      item_name: 'Antique Silver Spoon Set',
      item_condition: 'good',
      item_description: 'A set of antique silver spoons from the early 20th century.',
      base_price: 250.00,
      item_photo: 'images/antique-silver-spoons.jpg',
      category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe966',
      auction_time: new Date('2024-11-26T15:00:00')
  },
  {
      sn: 5,
      auction_id: '9bf6d89b-cd1d-40b9-af29-4da0e21a8d42',
      item_name: 'Smart TV 55" 4K',
      item_condition: 'brand new',
      item_description: 'A brand new 55-inch 4K smart TV with voice control and Wi-Fi connectivity.',
      base_price: 800.00,
      item_photo: 'images/smart-tv.jpg',
      category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe966',
      auction_time: new Date('2024-11-21T11:15:00')
  },
  {
      sn: 6,
      auction_id: '9bf6d89b-cd1d-40b9-af29-4da0e21a8d43',
      item_name: 'Designer Handbag',
      item_condition: 'like new',
      item_description: 'A limited edition designer handbag made of premium leather, in excellent condition.',
      base_price: 950.00,
      item_photo: 'images/designer-handbag.jpg',
      category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe963',
      auction_time: new Date('2024-11-25T14:45:00')
  },
  {
      sn: 7,
      auction_id: '9bf6d89b-cd1d-40b9-af29-4da0e21a8d44',
      item_name: 'Vintage Leather Jacket XL',
      item_condition: 'good',
      item_description: 'A high-quality vintage leather jacket, size XL, in excellent condition.',
      base_price: 150.00,
      item_photo: 'images/vintage-leather-jacket-xl.jpg',
      category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe963',
      auction_time: new Date('2024-11-22T09:30:00')
  },
  {
      sn: 8,
      auction_id: '9bf6d89b-cd1d-40b9-af29-4da0e21a8d45',
      item_name: 'Leather Jacket Special Edition',
      item_condition: 'very good',
      item_description: 'Special edition of the leather jacket, limited size and design, size L.',
      base_price: 150.00,
      item_photo: 'images/leather-jacket-special-edition.jpg',
      category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe963',
      auction_time: new Date('2024-11-23T13:00:00')
  },
  {
      sn: 9,
      auction_id: '9bf6d89b-cd1d-40b9-af29-4da0e21a8d41',
      item_name: 'Vintage Leather Jacket - Red',
      item_condition: 'brand new',
      item_description: 'A red vintage leather jacket, perfect for colder seasons, size M.',
      base_price: 150.00,
      item_photo: 'images/vintage-leather-jacket-red.jpg',
      category_id: '57bc32d8-3e31-4d3d-9beb-0c0725cbe963',
      auction_time: new Date('2024-11-25T10:30:00')
  }
  ], { ignoreDuplicates: true })
     console.log('Auction items seeded successfully!');
  }  catch (error) {
    console.error('Error seeding auction items:', error);
  }
}

insertAuctionItems()

module.exports = { AuctionItems }
