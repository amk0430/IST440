//This is the Server
const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');
let data = null;

let recipeArray = [];
let recipeList = {};
let userArray = [];
let usernameList = {};


app.post('/res/add/:username', (req, res) => {
  console.log("writing a username")
  let username = req.params.username;
  let userOb = {};
  userOb.username = username;

  let recipeFile = JSON.parse(fs.readFileSync('usernames.json'));
  resFile.push(userOb)

  s.writeFileSync('usernames.json', JSON.stringify(recipeFile), err => {
    if(err) throw err;
    console.log('Saved file');
  })
  res.send(recipeFile);
  });

  //Add a username
app.get('/res/getInfo/:username', (req, res) => {
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

//Create a reservation for a given user. It should specify username, start date, start time, and number of hours
app.post('/res/createRecipe/:username/:recipeTitle/:recipeIngredients/:recipeDescription/:recipeDirections', (req, res) => {
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
app.get('/res/getAll', (req, res) => {
  let recipeFile = JSON.parse(fs.readFileSync('recipe.json'));
  res.send(recipeFile);
});



app.listen(port, () => {
  console.log(`Listening on port: ${port}!`);
});
