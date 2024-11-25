const { v4: uuidv4 } = require('uuid')
const { Op } = require("sequelize");
const {AuctionItems} = require('../models/auction.model')
const { Categories } = require("../models/category.model");
const {createError} = require('../utils')

const getAuctionItems = async(req, res, next) => {
    try{
        const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : 0; 
        const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : Number.MAX_SAFE_INTEGER;
        const searchPhrase = req.query.search || null
        let categ = req.query.category || null
        const isSort = req.query.sort || "created_at"
        const isOrder = req.query.order || "asc"
        const priceRange = [minPrice, maxPrice]
        let itemCondition = req.query.condition || ["brand new", "like new", "very good", "good", "refurbished"]
       
        
        
        if(req.query.condition){
            itemCondition = [itemCondition]
            if(typeof(itemCondition[0]) === 'object') itemCondition = [...itemCondition[0]]
            const allItemConditions = ["brand new", "like new", "very good", "good", "refurbished"]
            for(let i=0; i < itemCondition.length; i++ ){
               if (!allItemConditions.includes(itemCondition[i].toLowerCase())) itemCondition.splice(i, 1)
                if(itemCondition.length == 1 && !allItemConditions.includes(itemCondition[0].toLowerCase())) itemCondition.splice(0, 1)
                 if(itemCondition.length == 0) itemCondition = ["brand new", "like new", "very good", "good", "refurbished"]
            }
          
        }


        const validSortFields = ['item_name', 'base_price', "auction_time", 'created_at'];
        const validOrderValues = ['asc', 'desc'];
        const allCategories = ['clothing', 'jewelry', 'home appliances', 'valuables', 'furniture',null]
      

        if (!validSortFields.includes(isSort.toLowerCase())) throw createError(400,"Invalid sort field provided")
        if (!validOrderValues.includes(isOrder.toLowerCase())) throw createError(400,"Invalid sort order provided!")
        if(categ) if(!allCategories.includes(categ.toLowerCase())) throw createError(400,"Invalid category provided!")
       
        let fetchAuctionItems = await AuctionItems.findAll({where:{base_price: {
            [Op.between]: priceRange,
          }, item_condition: {
            [Op.in]: itemCondition,
          }},order: [[isSort, isOrder]]})


        if(categ&&searchPhrase){
            const fetchCategoryID = await Categories.findOne({where:{name: categ}})
            const categoryID = fetchCategoryID.category_id

                fetchAuctionItems = await AuctionItems.findAll({where:{[Op.or]: [
                    { item_name: {[Op.like]: `%${searchPhrase}%`}},
                    { item_description: { [Op.like]: `%${searchPhrase}%`}},
                    {category_id:categoryID }
                  ],base_price: {
                    [Op.between]: priceRange
                  },item_condition: {
                    [Op.in]: itemCondition,
                  }},order: [[isSort, isOrder]]
                })
                
                for(let i=0; i < fetchAuctionItems.length; i++ ){
                    const item = fetchAuctionItems[i].toJSON();
                    delete  item.created_at
                    delete  item.modified_at
                    fetchAuctionItems[i] = item;
                 }

             return res.status(200).json({
                status: true,
                message: "All auction items fetched successfully!",
                data: fetchAuctionItems
            })
        }

        if(categ){
            const fetchCategoryID = await Categories.findOne({where:{name: categ}})
            const categoryID = fetchCategoryID.category_id
            fetchAuctionItems = await AuctionItems.findAll({where:{category_id:categoryID, base_price:{
                [Op.between]: priceRange,
              },item_condition: {
                [Op.in]: itemCondition,
              }},order: [[isSort, isOrder]]})
        }

        if(searchPhrase){
            fetchAuctionItems = await AuctionItems.findAll({where: {[Op.or]: [
            { item_name: {[Op.like]: `%${searchPhrase}%`}},
            { item_description: { [Op.like]: `%${searchPhrase}%`}},
          ],base_price:{
            [Op.between]: priceRange,
          }, item_condition: {
            [Op.in]: itemCondition,
          }},order: [[isSort, isOrder]]})
        }

        for(let i=0; i < fetchAuctionItems.length; i++ ){
            const item = fetchAuctionItems[i].toJSON();
            delete  item.created_at
            delete  item.modified_at
            fetchAuctionItems[i] = item;
         }
        
        res.status(200).json({
            status: true,
            message: "All auction items fetched successfully!",
            data: fetchAuctionItems
        })
    }
    catch(error){
       next(error)
    }
}


module.exports= {
    getAuctionItems 
}