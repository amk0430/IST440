// https://www.themealdb.com/api.php
var API_ID = "2650f393";
var API_KEY = "6f630f71ecdc64b1e96dd76294d62180";
var searchIng = ""; //not needed
var mealID = "52772";//not needed

//Categories
let request = new XMLHttpRequest();
  request.open("GET", "https://www.themealdb.com/api/json/v1/1/categories.php", true)
	request.onload = function() {
		let data = JSON.parse(this.response);
    if (request.status == 200)
		{
			results = data.categories;

			for (let i = 1; i < results.length; i++)
			{
        //console.log(results[i].strCategory);
        //console.log(results[i].strCategoryThumb);
        // console.log(results[i].strCategoryDescription);
				// console.log(i);

        let cat = results[i].strCategory;// + "  "+ results[i].strCategoryDescription;
				document.querySelector("#t" + i).innerHTML = cat;
				let category = document.createElement("p");
				category.setAttribute('id', 't' + i);
				document.querySelector("#t" + i).innerHTML = cat;

				let foodSrc = results[i].strCategoryThumb;
				document.querySelector("#pic" + i).src = foodSrc;
        let img = document.createElement('img' + i);
        // img.setAttribute('onclick','clickedImg(' + i + ');');
        //fix this id stuff
				img.setAttribute('id', 'pic' + i);
			}
    }
  }
  request.send();


//Random recipes
function getRandom(){
	let request = new XMLHttpRequest();
	  request.open("GET", "https://www.themealdb.com/api/json/v1/1/random.php", true)
		request.onload = function() {
			let data = JSON.parse(this.response);
	    if (request.status == 200)
			{
				results = data.meals;
        console.log(data);
        console.log(results);
				for (let i = 0; i < results.length; i++)
				{
          // console.log(results[i].strCategory);
          // console.log(results[i].strCategoryThumb);
          // console.log(results[i].strCategoryDescription);
          //let foodSrc = results[i].strCategoryThumb;

          let food = results[i].strMeal;// + "  "+ results[i].strCategoryDescription;
          let category = document.createElement("p");
					// category.setAttribute('id', 'number' + i);
					// movieTitle.setAttribute('onclick', 'get');
					let foodText = document.createTextNode(food);
					category.appendChild(foodText);
					document.querySelector("#random").appendChild(category);


          //create the image
          // let img = document.createElement('img');
          // img.setAttribute('src', foodSrc);
          // //img.setAttribute('width', '200px');
          // img.setAttribute('height', '300px');
          // //img.setAttribute('onclick','clickedImg(' + i + ');');
          // document.querySelector('#posters').appendChild(img);
				}
	    }
	  }
	  request.send();
	}

//Search main ingredient
function searchMainI(){
	searchIng = document.querySelector("#recipeBox").value;
	let request = new XMLHttpRequest();
	  request.open("GET", `https://api.edamam.com/search?q=${searchIng}&ingr=5&app_id=${API_ID}&app_key=${API_KEY}`, true)
		request.onload = function() {
			let data = JSON.parse(this.response);
	    if (request.status == 200)
			{
				results = data.hits;
        console.log(data);
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
          // recipeImg.setAttribute('class', 'images');
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

          // searchedDiv.setAttribute("height", "300px");
          // searchedDiv.setAttribute("width", "300px");
          searchedDiv.appendChild(recipeImg);
          document.querySelector("#searchedRecipes").appendChild(searchedDiv);
        }
	    }
	  }
	  request.send();
	}

function getRecipe(i){
  document.querySelector("#sidebar").style.width = "50%";

  for (var k = 1; k < results[i].recipe.dietLabels.length; k++) {
    console.log(results[i].recipe.dietLabels[k]);
  }
  for (var j = 1; j < results[i].recipe.ingredientLines.length; j++) {
    console.log(results[i].recipe.ingredientLines[j]);
  }
  console.log(results[i].recipe.totalTime);

  var recipeName = "Recipe Name: " + results[i].recipe.label;
  document.querySelector("#recipeName").innerHTML = recipeName;
  var totalTime = "Total Time: " + results[i].recipe.totalTime;
  document.querySelector("#totalTime").innerHTML = totalTime;
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

    var ingrList = [];
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
  document.querySelector("#sidebar").style.width = "0";
}
