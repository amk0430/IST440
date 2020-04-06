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
  console.log("writing a username")
  let username = req.params.username;
  let userOb = {};
  userOb.username = username;

  let userFile = JSON.parse(fs.readFileSync('usernames.json'));
  resFile.push(userOb);

  fs.writeFileSync('usernames.json', JSON.stringify(userFile), err => {
    if(err) throw err;
    console.log('Saved file');
  })
  res.send(userFile);
});


app.get('/getUsers/:username', (req, res) => {
  let username = req.params.username;
  let recipeInfo = "";
  let recipeFile = JSON.parse(fs.readFileSync('recipe.json'));
  for(let i=0;i<recipeFile.length;i++){
    console.log(recipeFile[i].username);
    if(recipeFile[i].username === username)
    {
      console.log(recipeFile);
      res.send(recipeFile[i]);
    }
}
});

app.post('/recipe/createRecipe/:username/:recipeTitle/:recipeIngredients/:recipeDescription/:recipeDirections', (req, res) => {
  let username = req.params.username;
  let recipeTitle = req.params.recipeTitle;
  let recipeIngredients = req.params.recipeIngredients;
  let recipeDescription = req.params.recipeDescription;
  let recipeDirections = req.params.recipeDirections;

  let recipeOb = {};
  recipeOb.username = username;
  recipeOb.recipeTitle = recipeTitle;
  recipeOb.recipeIngredients = recipeIngredients;
  recipeOb.recipeDescription = recipeDescription;
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

//Update a reservation for a given user. It should specify username, start date, start time, and number of hours
app.put('/recipe/updateRecipe/:username/:recipeTitle/:recipeIngredients/:recipeDescription/:recipeDirections', (req, res) => {
  let username = req.params.username;
  let recipeTitle = req.params.recipeTitle;
  let recipeIngredients = req.params.recipeIngredients;
  let recipeDescription = req.params.recipeDescription;
  let recipeDirections = req.params.recipeDirections;

  let recipeOb = {};
  recipeOb.username = username;
  recipeOb.recipeTitle = recipeTitle;
  recipeOb.recipeIngredients = recipeIngredients;
  recipeOb.recipeDescription = recipeDescription;
  recipeOb.recipeDirections = recipeDirections;

  let recipeFile = JSON.parse(fs.readFileSync('recipe.json'));
  for(let i=0;i<recipeFile.length;i++){
    console.log(recipeFile[i].username);
    if(recipeFile[i].username === username)
    {
      recipeFile.splice(i, 1, resOb);
    }
  }
  fs.writeFileSync('recipe.json', JSON.stringify(recipeFile), err => {
    if(err) throw err;
    console.log('Saved file');
  })
  res.send(recipeFile);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}!`);
});
