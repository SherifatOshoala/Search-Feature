require("dotenv").config()
const Express = require('express')
const app = Express()
const port = process.env.APP_PORT || 3000
const displayRoutes = require('express-routemap')
const sequelize = require('./config/sequelize')
const user = require('./routes/user.routes')
const admin = require('./routes/admin.routes')
const invalidRoutes = require('./controllers/invalid')

const categories = require('./models/category.model')
const auctionItems = require('./models/auction.model')

app.use(Express.json())
app.use(user)
app.use(admin)



app.get('/', (req, res) =>{
    res.status(200).json({
        status: "success",
        message: 'Welcome to SearchFeature!'
    })
})

try {
    (async()=> {
      await sequelize.authenticate();
      // await sequelize.sync({force:true});
      console.log('Connection has been established successfully.');
      app.listen(port, () => {
        displayRoutes(app)
        console.log(`SearchFeature listening on port ${port}`) 
      })
    })()
  
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1)
  }
  





  app.use((err, req, res, next) => {
    if(err.sqlMessage || err.sqlState){
       return res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
    })
  }else{
    return res.status(err.code || 400).json({
      status: 'error',
      message: err.message
     
    })
  }
  })

  app.use(invalidRoutes)

  