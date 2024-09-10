// Here is where we import modules
// const dotenv = require('dotenv')
// dotenv.config()
require('dotenv').config()
// We begin by loading Express
const express = require("express");

const mongoose = require('mongoose')

const app = express();

const methodOverride = require('method-override')
const morgan = require('morgan')

// ========Mongoose======== //

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new



app.use(express.urlencoded({ extended: false }));




const Fruit = require('./models/fruit.js')



app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.get('/fruits', async(req, res) => {  // to use await you have to call async
    const allFruits = await Fruit.find({})
    console.log(allFruits)
    res.render('fruits/index.ejs', {fruits: allFruits})
})

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
})

app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  });
  
app.post('/fruits', async(req, res) => {
    // console.log(req.body)
    if(req.body.isReadyToEat === 'on'){
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }
    console.log(req.body)
    await Fruit.create(req.body)
    res.redirect('/fruits')
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
