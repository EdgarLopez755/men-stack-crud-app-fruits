// Here is where we import modules
// const dotenv = require('dotenv')
// dotenv.config()
require('dotenv').config()
// We begin by loading Express
const express = require("express");

const mongoose = require('mongoose')

const app = express();

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Fruit = require('./models/fruit.js')

app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
