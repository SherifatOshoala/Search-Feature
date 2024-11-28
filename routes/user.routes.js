const express = require('express')
const router = express.Router()
const {getAuctionItems, addCategory, addAuctionItem} = require('../controllers/user.controllers')


/**
 * @swagger
 * /auction-items:
 *   get:
 *     summary: Get a list of auction items based on search filters
 *     description: Retrieve a list of auction items from the database with optional filters like price range, category, search phrase, sort order, and item condition.
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price of the auction items (default is 0).
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price of the auction items (default is MAX_SAFE_INTEGER).
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search phrase to match item names or descriptions.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [clothing, jewelry, home appliances, valuables, furniture]
 *         description: Category of the auction items to filter by.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [item_name, base_price, auction_time, created_at]
 *         description: Field to sort the results by (default is created_at).
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order, either ascending (asc) or descending (desc) (default is asc).
 *       - in: query
 *         name: condition
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["brand new", "like new", "refurbished", "good", "very good"]
 *         description: Filter items based on condition (e.g., brand new, refurbished).
 *     responses:
 *       200:
 *         description: A list of auction items that match the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All auction items fetched successfully!"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       auction_id:
 *                         type: string
 *                         example: "9bf6d89b-cd1d-40b9-af29-4da0e21a8d44"
 *                       item_name:
 *                         type: string
 *                         example: "Vintage Leather Jacket XL"
 *                       item_photo: 
 *                         type: string
 *                         example: "images/vintage-leather-jacket.jpg"
 *                       item_description: 
 *                         type: string
 *                         example: "A high-quality vintage leather jacket, size XL, in excellent condition."
 *                       base_price:
 *                         type: number
 *                         example: 150.00
 *                       item_condition:
 *                         type: string
 *                         example: "brand new"
 *                       auction_time:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-30T12:00:00Z"
 *       400:
 *         description: Invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid sort field provided"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/auction-items', getAuctionItems)

/**
 * @swagger
 * /add-category:
 *   post:
 *     summary: Add a new category
 *     description: Create a new category with a name and optional description. Ensures unique category names.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 description: A brief description of the category.
 *                 example: "Items related to electronic devices and gadgets."
 *     responses:
 *       200:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "New category created successfully."
 *       400:
 *         description: Validation error or bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Category name is required."
 *       409:
 *         description: Conflict error when category already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Category already exists."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post('/add-category', addCategory)

/**
 * @swagger
 * /add-item:
 *   post:
 *     summary: Add a new auction item
 *     description: Create a new auction item with details like name, condition, description, price, photo, category, and auction time.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_name:
 *                 type: string
 *                 description: Name of the auction item.
 *                 example: "Vintage Leather Jacket"
 *               item_condition:
 *                 type: string
 *                 description: Condition of the item (e.g., brand new, refurbished).
 *                 example: "brand new"
 *               item_description:
 *                 type: string
 *                 description: A brief description of the item.
 *                 example: "A high-quality vintage leather jacket, size XL, in excellent condition."
 *               base_price:
 *                 type: number
 *                 description: The starting price for the auction.
 *                 example: 150.00
 *               item_photo:
 *                 type: string
 *                 description: URL of the item's photo.
 *                 example: "images/vintage-leather-jacket.jpg"
 *               category_id:
 *                 type: integer
 *                 description: ID of the category this item belongs to.
 *                 example: 2
 *               auction_time:
 *                 type: string
 *                 format: date-time
 *                 description: The time when the auction will start.
 *                 example: "2024-11-30T12:00:00Z"
 *     responses:
 *       200:
 *         description: Auction item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "New auction item created successfully"
 *       400:
 *         description: Validation error or bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Item name is required."
 *       409:
 *         description: Conflict error when the item already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Item already exists."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post('/add-item', addAuctionItem)













module.exports = router;