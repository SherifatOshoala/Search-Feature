const express = require('express')
const router = express.Router()
const {getAuctionItems} = require('../controllers/user.controllers')



router.get('/auction-items', getAuctionItems)













module.exports = router;