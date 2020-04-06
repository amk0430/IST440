// https://www.themealdb.com/api.php
var API_ID = "2650f393";
var API_KEY = "6f630f71ecdc64b1e96dd76294d62180";
var API_ID_N = "d531d2af";
var API_KEY_N = "3865fd7e349b33fc67c909942ec36ee3";
var ingrList = [];
var selectedCategoryU = "";
var selectedCategoryL = "";


//Find recipes in selected category
function getFromCat(i){
    selectedCategoryU = document.querySelector("#t" + i).textContent;
    selectedCategoryL = selectedCategoryU.toLowerCase();
    searchCategory();
}

function searchCategory(){
	let request = new XMLHttpRequest();
	  request.open("GET", `https://api.edamam.com/search?q=${selectedCategoryL}&ingr=5&app_id=${API_ID}&app_key=${API_KEY}`, true)
		request.onload = function() {
			let data = JSON.parse(this.response);
	    if (request.status == 200)
			{
				results = data.hits;
        for (let i = 0; i < results.length; i++)
        {
          //console.log(results);
          // console.log(results[i].recipe.label);
          // console.log(results[i].recipe.image);
          // console.log(results[i].recipe.url);
          // console.log(results[i].recipe.yield);
          // for (var k = 1; k < results[i].recipe.dietLabels.length; k++) {
          //   console.log(results[i].recipe.dietLabels[k]);
          // }
          // for (var j = 1; j < results[i].recipe.ingredientLines.length; j++) {
          //   console.log(results[i].recipe.ingredientLines[j]);
          // }
          // console.log(results[i].recipe.totalTime);
          // console.log(results[i].recipe.totalNutrients.ENERC_KCAL.label);
          // console.log(results[i].recipe.totalNutrients.ENERC_KCAL.quantity);
          //use digest and go into the json for nutrition info

          let recipeClickDiv = document.createElement("div");

          let recipeImg = document.createElement('img');
          recipeImg.setAttribute('id', 'recipeImg' + i);
          recipeImg.setAttribute('class', 'recipeImages');
          recipeImg.setAttribute('onclick','getRecipe(' + i + ');');
          recipeImg.setAttribute('src', results[i].recipe.image);

          let searchedP = document.createElement("p");
          searchedP.setAttribute('id', 'number' + i);
          searchedP.setAttribute('class', 'text');
          searchedP.setAttribute('onclick', 'getRecipe(' + i + ');');
          let searchedText = document.createTextNode(results[i].recipe.label);
          searchedP.appendChild(searchedText);
          let searchedDiv = document.createElement("div");
          searchedDiv.appendChild(searchedP);
          searchedDiv.appendChild(recipeImg);
          document.querySelector("#searchedRecipes").appendChild(searchedDiv);
          document.querySelector("#recipeDivBox").style.display = "block";
          var catTitle = "Recipes from the " + selectedCategoryU + " Category"
          document.querySelector("#searchedCat").innerHTML = catTitle;
        }
	    }
	  }
	  request.send();
	}


//Search for main ingredient
function searchMainI(){
	searchIng = document.querySelector("#recipeBox").value;
	let request = new XMLHttpRequest();
	  request.open("GET", `https://api.edamam.com/search?q=${searchIng}&ingr=5&app_id=${API_ID}&app_key=${API_KEY}`, true)
		request.onload = function() {
			let data = JSON.parse(this.response);
	    if (request.status == 200)
			{
				results = data.hits;
        console.log(results);
        for (let i = 1; i < results.length; i++)
        {
          console.log(results[i].recipe.label);
          console.log(results[i].recipe.image);
          console.log(results[i].recipe.url);
          console.log(results[i].recipe.yield);
          for (var k = 1; k < results[i].recipe.dietLabels.length; k++) {
            console.log(results[i].recipe.dietLabels[k]);
          }
          for (var j = 1; j < results[i].recipe.ingredientLines.length; j++) {
            console.log(results[i].recipe.ingredientLines[j]);
          }
          console.log(results[i].recipe.totalTime);
          console.log(results[i].recipe.totalNutrients.ENERC_KCAL.label);
          console.log(results[i].recipe.totalNutrients.ENERC_KCAL.quantity);
          //use digest and go into the json for nutrition info

          let recipeClickDiv = document.createElement("div");

          let recipeImg = document.createElement('img');
          recipeImg.setAttribute('id', 'recipeImg' + i);
          recipeImg.setAttribute('class', 'recipeImages');
          recipeImg.setAttribute('onclick','getRecipe(' + i + ');');
          recipeImg.setAttribute('src', results[i].recipe.image);

          let searchedP = document.createElement("p");
          searchedP.setAttribute('id', 'number' + i);
          searchedP.setAttribute('class', 'text');
          searchedP.setAttribute('onclick', 'getRecipe(' + i + ');');
          let searchedText = document.createTextNode(results[i].recipe.label);
          searchedP.appendChild(searchedText);
          let searchedDiv = document.createElement("div");
          searchedDiv.appendChild(searchedP);
          searchedDiv.appendChild(recipeImg);
          document.querySelector("#searchedRecipes").appendChild(searchedDiv);
          document.querySelector("#recipeDivBox").style.display = "block";
        }
	    }
	  }
	  request.send();
	}

function getRecipe(i){
  document.querySelector("#sidebarContainer").style.zIndex = 3;
  var recipeName = "Recipe Name: " + results[i].recipe.label;
  document.querySelector("#recipeName").innerHTML = recipeName;
  var totalTime = "Total Time: " + results[i].recipe.totalTime;
  document.querySelector("#totalTime").innerHTML = totalTime;
  document.querySelector("#url").innerHTML = "Instructions";
  var url = results[i].recipe.url;
  document.querySelector("#url").href = url;
  var yields = "Yields: " + results[i].recipe.yield;
  document.querySelector("#yields").innerHTML = yields;
  for (var j = 1; j < results[i].recipe.dietLabels.length; j++) {
    var dietLabels = "Diet Labels: " + results[i].recipe.dietLabels[j];
    document.querySelector("#dietLabels").innerHTML = dietLabels;
  }
  for (var j = 1; j < results[i].recipe.ingredientLines.length; j++) {
    var ingredients = "Ingredients: ";
    document.querySelector("#ingredients").innerHTML = ingredients;
    ingrList.push(results[i].recipe.ingredientLines[j]);
    let food = document.createElement("li");
    let foodText = document.createTextNode(results[i].recipe.ingredientLines[j]);
    food.appendChild(foodText);
    document.querySelector("#ingrList").appendChild(food);
  }
  var recSrc = results[i].recipe.image;
  document.querySelector("#recImg").src = recSrc;
}

//To close the recipe side box
function closeBtn(){
  document.querySelector("#sidebarContainer").style.width = "0";
}

function displayNutrition(){
let request = new XMLHttpRequest();
  request.open("POST", `https://api.edamam.com/api/nutrition-details?app_id=${API_ID_N}&app_key=${API_KEY_N}&title=${recipeName}&ingr=${ingrList}`, true)
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    let data = JSON.parse(this.response);
    if (request.status == 200)
    {
      // results = data1.hits;
      console.log(data);
      // console.log(results);
      // for (let i = 1; i < results.length; i++)
      // {
      //   console.log(results[i].recipe.label);
      //   console.log(results[i].recipe.image);
      // }
    }
  }
  request.send();
}
