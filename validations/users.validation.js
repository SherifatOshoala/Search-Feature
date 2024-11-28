const Joi = require('joi')


const validateAuctionItem = (data) => {
    const validateAuctionItemSchema =  Joi.object({
        item_name: Joi.string().min(3).max(100).required(), 
        item_condition: Joi.string().valid("brand new", "like new", "very good", "good", "refurbished").required(),
        item_description: Joi.string().max(500).required(), 
        base_price: Joi.number().positive().precision(2).required(), 
        item_photo: Joi.string().pattern(/^(\/?[\w-]+\/)*[\w-]+\.(jpg|jpeg|png|gif)$/).required(),
        category_id: Joi.number().integer().positive().required(), 
        auction_time: Joi.date().iso().greater('now'),
    })
    const {error} = validateAuctionItemSchema.validate(data)
    return error
  }
  
  const validateCategory = (data) => {
    const validateCategorySchema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().max(255).optional()
  })
    const { error } = validateCategorySchema.validate(data);
    return error;  
    }
  
  
  module.exports = {
    validateAuctionItem,
    validateCategory
  }