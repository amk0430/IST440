let data = "";
let username = "";
let recipeTitle  = "";
let recipeIngredients = "";
let recipeDescription = "";
let recipeDirections = "";

//Add username to list
function addUser() {
  username = document.querySelector("#username").value;
  let request = new XMLHttpRequest();
  request.open("POST", "http://127.0.0.1:3000/addUser/" + username, true);
  console.log("Username = " + username);
  request.onload = function() {
    data = JSON.parse(this.response);
    if (request.status == 200)
    {
      console.log(data);
      for(let i=0; i<data.length;i++) {
        var newP = document.createElement("p");
        var userNode = document.createTextNode(data[i].username);
        newP.appendChild(userNode);
        document.querySelector("#usernameList").appendChild(newP);
      }
    }
    else {console.log("ERROR");}
  }
  request.send();
}

function getUserInfo() {
  username = document.querySelector("#username2").value;
  let request = new XMLHttpRequest();
  request.open("GET", "http://127.0.0.1:3000/getUser/" + username, true);
  console.log("Username = " + username);
  request.onload = function() {
    data = JSON.parse(this.response);
    if (request.status == 200)
    {
      document.querySelector("#usernameTD2").innerHTML = data.username;
      document.querySelector("#titleTD2").innerHTML = data.recipeTitle;
      document.querySelector("#ingredientTD2").innerHTML = data.recipeIngredients;
      document.querySelector("#descriptionTD2").innerHTML = data.recipeDescription;
			document.querySelector("#directionTD2").innerHTML = data.recipeDirections;
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
  recipeDescription = document.querySelector("#recipeDescription").value;
  recipeDirections = document.querySelector("#recipeDirections").value;
  let request = new XMLHttpRequest();
  request.open("POST", "http://127.0.0.1:3000/recipe/createRecipe/" + username +"/" + recipeTitle + "/" + recipeIngredients + "/" + recipeDescription + "/" + recipeDirections,true);
  console.log("Recipe: " + username +"/" + recipeTitle + "/" + recipeIngredients + "/" + recipeDescription + "/" + recipeDirections);

  request.onload = function() {
    data = JSON.parse(this.response);
    if (request.status == 200)
    {
      console.log(data);
      let last = data.length - 1;
      document.querySelector("#usernameTD").innerHTML = data[last].username;
      document.querySelector("#titleTD").innerHTML = data[last].recipeTitle;
      document.querySelector("#ingredientTD").innerHTML = data[last].recipeIngredients;
      document.querySelector("#descriptionTD").innerHTML = data[last].recipeDescription;
			document.querySelector("#directionTD").innerHTML = data[last].recipeDirection;
    }
    else {console.log("ERROR");}
  }
  request.send();
}

//Updates recipe
function updateRecipe() {
  name = document.querySelector("#usernameU").value;
  recipeTitle = document.querySelector("#titleU").value;
  recipeIngredients = document.querySelector("ingredientU").value;
  recipeDescription = document.querySelector("#descriptionU").value;
	recipeDirections = document.querySelector("#directionU").value;

  let request = new XMLHttpRequest();
  request.open("PUT", "http://127.0.0.1:3000/recipe/updateRecipe/" + name +"/" + recipeTitle + "/" + recipeIngredients + "/" + recipeDescription + "/" + recipeDirections, true);
  console.log("Recipe: " + name +"/" + recipeTitle + "/" + recipeIngredients + "/" + recipeDescription + "/" + recipeDirections);
  request.onload = function() {
    data = JSON.parse(this.response);
    if (request.status == 200)
    {
      document.querySelector("#updateP").innerHTML = "Recipe updated.";
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
      // data.sort((res1, res2) => {
      //   //sort by date
      //   if(res1.recipeTitle > res2.recipeTitle) return 1;
      //   if(res1.recipeTitle < res2.recipeTitle) return -1;
      //   //now sort by time if date is the same
      //   if(res1.recipeIngredients > res2.recipeIngredients) return 1;
      //   if(res1.recipeIngredients < res2.recipeIngredients) return -1;
      // });
      //change this to a HTML table
      for(let i=0;i<data.length;i++)
      {
        var recipe = "Username: " + data[i].username + " Title: " + data[i].recipeTitle + " Ingredients: " + data[i].recipeIngredients + " Description: " + data[i].recipeDescription + " Directions: " + data[i].recipeDirections;
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
