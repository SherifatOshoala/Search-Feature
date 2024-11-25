const { v4: uuidv4 } = require('uuid')

console.log(uuidv4())

let bids = [ ["Sherifat", 500], ["Sherifat", 200], ["Sherifat", 400], ["Majeed", 1000], ["Jay", 400]]

const highestBids = (bids) => {
  let highestBid = 0
  let highestBidder
  let result= {}
  let bidderName = {}

if(bids.length == 0){
  result.highestBidder = null
  result.bidCounts ={}
}

for (let i=0; i<bids.length; i++){
 if(bids[i][1] > highestBid) {highestBid = bids[i][1]
   highestBidder = bids[i]
   result.highestBidder = highestBidder
}

if (bidderName[bids[i][0]]) bidderName[bids[i][0]] += 1 
else bidderName[bids[i][0]] = 1
result.bidCounts = bidderName
}

let top3bids = bids.sort((a, b) => b[1]-a[1]).slice(0,3)

if(top3bids.length > 0) result.top3bids = top3bids

return result
}

console.log(highestBids(bids))