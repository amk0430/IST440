//This is the Server
const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');
let data = null;
const cors = require('cors');
app.use(cors());

let recipeArray = [];
let recipeList = {};
let userArray = [];
let usernameList = {};


app.post('/addUser/:username', (req, res) => {
  console.log("Writing a username")
  let username = req.params.username;
  let userOb = {};
  userOb.username = username;

  let userFile = JSON.parse(fs.readFileSync('users.json'));
  userFile.push(userOb);

  fs.writeFileSync('users.json', JSON.stringify(userFile), err => {
    if(err) throw err;
    console.log('Saved file');
  })
  res.send(userFile);
});


app.get('/getUsers/:username', (req, res) => {
  let username = req.params.username;
  let userInfo = "";
  let userFile = JSON.parse(fs.readFileSync('users.json'));
  for(let i=0;i<userFile.length;i++){
    console.log(userFile[i].username);
    if(userFile[i].username === username)
    {
      console.log(userFile);
      res.send(userFile[i]);
    }
  }
});

app.post('/recipe/createRecipe/:username/:recipeTitle/:recipeIngredients/:recipeCategories/:recipeDirections', (req, res) => {
  let username = req.params.username;
  let recipeTitle = req.params.recipeTitle;
  let recipeIngredients = req.params.recipeIngredients;
  let recipeCategories = req.params.recipeCategories;
  let recipeDirections = req.params.recipeDirections;

  let recipeOb = {};
  recipeOb.username = username;
  recipeOb.recipeTitle = recipeTitle;
  recipeOb.recipeIngredients = recipeIngredients;
  recipeOb.recipeCategories = recipeCategories;
  recipeOb.recipeDirections = recipeDirections;

  let recipeFile = JSON.parse(fs.readFileSync('recipe.json'));
  recipeFile.push(recipeOb);
  fs.writeFileSync('recipe.json', JSON.stringify(recipeFile), err => {
    if(err) throw err;
    console.log('Saved file');
  })
  res.send(recipeFile);
});

//Get a list of reservations
app.get('/recipe/getAll', (req, res) => {
  let recipeFile = JSON.parse(fs.readFileSync('recipe.json'));
  res.send(recipeFile);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}!`);
});
