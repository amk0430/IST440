// https://www.themealdb.com/api.php

//Categories
function getCat(){
	let request = new XMLHttpRequest();
	  request.open("GET", "https://www.themealdb.com/api/json/v1/1/categories.php", true)
		request.onload = function() {
			let data = JSON.parse(this.response);
	    if (request.status == 200)
			{
				results = data.categories;
        console.log(data);
        console.log(results);
				for (let i = 0; i < results.length; i++)
				{
          console.log(results[i].strCategory);
          console.log(results[i].strCategoryThumb);
          console.log(results[i].strCategoryDescription);
          let foodSrc = results[i].strCategoryThumb;

          let cat = results[i].strCategory;// + "  "+ results[i].strCategoryDescription;
          let category = document.createElement("p");
					// category.setAttribute('id', 'number' + i);
					// movieTitle.setAttribute('onclick', 'get');
					let catText = document.createTextNode(cat);
					category.appendChild(catText);
					document.querySelector("#cat").appendChild(category);


          //create the image
          let img = document.createElement('img');
          img.setAttribute('src', foodSrc);
          //img.setAttribute('width', '200px');
          img.setAttribute('height', '300px');
          //img.setAttribute('onclick','clickedImg(' + i + ');');
          document.querySelector('#posters').appendChild(img);
				}
	    }
	  }
	  request.send();
	}


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
