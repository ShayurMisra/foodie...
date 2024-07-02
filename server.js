// Required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require('path');

// Middleware setup
app.use(bodyParser.urlencoded({extended: true}));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect("mongodb+srv://shaymisra:12345@cluster0.8i3oiut.mongodb.net/foodie", {useNewUrlParser: true, useUnifiedTopology: true});

//app pages and resources
app.use(express.static(path.join(__dirname, 'public')));

//upload.html(Upload page)-> This section is to upload to my mongodb

// Define Recipes schema
const RecipesSchema = new mongoose.Schema({
    Image: String,
    Name: String,
    Cuisine: String,
    Ingredients: String,
    Instructions: String,
    Servings: String,
    prepTime: String,
    cookTime: String,
    totalTime: String
});

// Create Recipes model
const Recipes = mongoose.model("Recipes", RecipesSchema);

// Serve upload.html on root route
app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/upload.html");
});

// Handle POST request for form submission
app.post("/", function(req, res){
    let newRecipe = new Recipes({
        Image: req.body.image,
        Name: req.body.name,
        Cuisine: req.body.cuisine,
        Ingredients: req.body.ingredients,
        Instructions: req.body.instructions,
        Servings: req.body.servings,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        totalTime: req.body.totalTime
    });

    newRecipe.save();
        res.redirect('/');
    });

//explore.html(Discover page)-> This section is to view data from mongoDB

app.get("/explore", (req, res) => {
    Recipes.find({}, (err, recipes) => {
        if (err) {
            console.log(err);
        } else {
            res.render("explore", { recipesList: Recipes });
        }
    });
});

// Start server
app.listen(3001, function(){
    console.log("Server started on port 3001");
});