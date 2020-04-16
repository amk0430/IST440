let data = "";
let username = "";
let recipeTitle  = "";
let recipeIngredients = "";
let recipeCategories = "";
let recipeDirections = "";

//Add username to list
function addUser() {
  username = document.querySelector("#username").value;
  let request = new XMLHttpRequest();
  request.open("POST", "http://127.0.0.1:3000/addUser/" + username, true);
  console.log("Username = " + username);
  var success;
  confirm("Username Added!")
  request.onload = function() {
    data = JSON.parse(this.response);
    if (request.status == 200)
    {
      console.log(data);
      for(let i=0; i<data.length;i++) {
        var newP = document.createElement("p");
        var userNode = document.createTextNode(data[i].username);
        newP.appendChild(userNode);
      }
    }
    else {console.log("ERROR");}
  }
  request.send();
}

//Adds new recipe
function addNewRecipe() {
  username = document.querySelector("#username1").value;
  recipeTitle = document.querySelector("#recipeTitle").value;
  recipeIngredients = document.querySelector("#recipeIngredients").value;
  recipeCategories = document.querySelector("#recipeCategories").value;
  recipeDirections = document.querySelector("#recipeDirections").value;
  let request = new XMLHttpRequest();
  request.open("POST", "http://127.0.0.1:3000/recipe/createRecipe/" + username +"/" + recipeTitle + "/" + recipeIngredients + "/" + recipeCategories + "/" + recipeDirections,true);
  console.log("Recipe: " + username +"/" + recipeTitle + "/" + recipeIngredients + "/" + recipeCategories + "/" + recipeDirections);

  request.onload = function() {
    data = JSON.parse(this.response);
    if (request.status == 200)
    {
      console.log(data);
      let last = data.length - 1;
      document.querySelector("#usernameTD").innerHTML = data[last].username;
      document.querySelector("#titleTD").innerHTML = data[last].recipeTitle;
      document.querySelector("#ingredientTD").innerHTML = data[last].recipeIngredients;
      document.querySelector("#categoriesTD").innerHTML = data[last].recipeCategories;
			document.querySelector("#directionTD").innerHTML = data[last].recipeDirection;
    }
    else {console.log("ERROR");}
  }
  request.send();
}

//Displays all recipes in table
function getAll() {
  let request = new XMLHttpRequest();
  request.open("GET", "http://127.0.0.1:3000/recipe/getAll", true);
  request.onload = function() {
    data = JSON.parse(this.response);
    if (request.status == 200)
    {
      console.log(data);
      for(let i=0;i<data.length;i++)
      {
        var recipe = "Username: " + data[i].username + " Title: " + data[i].recipeTitle + " Ingredients: " + data[i].recipeIngredients + " Category: " + data[i].recipeCategories + " Directions: " + data[i].recipeDirections;
        var newP = document.createElement("p");
        var recipeNode = document.createTextNode(recipe);
        newP.appendChild(recipeNode);
        document.querySelector("#allRecipeDiv").appendChild(newP);
      }
    }
    else {console.log("ERROR");}
  }
  request.send();
}
