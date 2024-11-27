Auction-Items Search API

This API allows users to fetch auction items with various filtering, sorting, and searching options.


---Features---

Filter by Price Range: Retrieve items within a specified price range.
Search by Keywords: Find items using a search phrase in their name or description i.e. partial search
Filter by Category: Narrow down results to a specific category (e.g., clothing, jewelry, furniture, home appliance etc.).
Filter by Condition: Specify item conditions such as "brand new," "like new," "good," etc.
Sorting: Sort results by fields like price, auction time, or creation date in ascending or descending order.


---Setup---

Prerequisites
Ensure the following are installed on your system:

- MySQL
Download and install MySQL from the official website.
Set up a user and password with the necessary permissions.

- Node.js v21.7.1 or higher
Download and install Node.js from the official website.

- NPM
Comes pre-installed with Node.js.

---Setup Instructions--
Clone the Repository
git clone https://github.com/your-username/auction-items-search-api.git

cd auction-items-search-api

Install Dependencies
npm install

Set Up the Environment Variables
Create a .env file in the project root.

Add the following:
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
 - replace all in the config/sequelize file

Start the Server
npm run dev 

Access the API
The API will be running at http://localhost:2012


---Endpoints---
Get Auction Items
Fetch auction items based on filters and sorting preferences.

URL:
GET /auction-items

Query Parameters:

Parameter---Type----Description
minPrice	number	Minimum price for the auction items.	default = 0
maxPrice	number	Maximum price for the auction items.	default = MAX_SAFE_INTEGER
search	    string	Search phrase to match item names or descriptions. 	default = null
category	string	Category of the auction item (e.g., clothing, jewelry, etc.).   default = null
condition	string	Condition of the item (e.g., brand new, like new, etc.). Multiple values allowed eg /auction-items?condition=like new&condition=good  default = All conditions
sort	    string	Field to sort by (e.g., base_price, created_at).    default = created_at
order   	string	Sort order (asc or desc).	 default = asc


---Example Requests---
Fetch All Items
GET /auction-items

Filter by Price Range
GET /auction-items?minPrice=100&maxPrice=1000

Search by Keyword
GET /auction-items?search=watch

Filter by Category
GET /auction-items?category=clothing

Filter by Condition
GET /auction-items?condition=brand+new,like+new

Sort Items
GET /auction-items?sort=base_price&order=desc


---Response---
The response will include the filtered and sorted auction items:

{
  "status": true,
  "message": "All auction items fetched successfully!",
  "data": [
    {
      "sn": 3,
      "auction_id": "9bf6d89b-cd1d-40b9-af29-4da0e21a8d48",
      "item_name": "Gaming Laptop",
      "item_condition": "good",
      "item_description": "A powerful gaming laptop with the latest NVIDIA GPU, 16GB RAM, and 512GB SSD storage.",
      "base_price": "1200.00",
      "item_photo": "images/gaming-laptop.jpg",
      "category_id": "57bc32d8-3e31-4d3d-9beb-0c0725cbe965",
      "auction_time": "2024-11-26T08:45:00.000Z"
    },
    ...
  ]
}