const mealDetailsContent = document.querySelector(".meal-details-content");

getMealList = () => {
  let searchInputTxt = document.getElementById("search-input").value;
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputTxt}`
  )
    .then((response) => response.json())

    .then((data) => {
      let html = "";
      if (data.meals) {
        const mealList = document.getElementById("meal");
        data.meals.forEach((meal) => {
          html += `
          <div onclick ="getMealByID('${meal.idMeal}')" class = "meal-item" data-id = "${meal.idMeal}">
              <div class = "meal-img">
                  <img src = "${meal.strMealThumb}">
              </div>
              <div class = "meal-name">
                  <h3>${meal.strMeal}</h3>
              </div>
          </div>
      `;
          mealList.innerHTML = html;
          
        });
      }
       else {
        const mealList = document.getElementById("meal");
        html = `<h1 style ="text-align:center">Sorry, invalid request!</h1>`;
        mealList.innerHTML = html;
      }
    });
};

getMealByID = (mealId) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      getIngredientList(meal);
    });
};

getIngredientList = (meal) => {
  const ingredients = [];
  for (let i = 1; i < 30; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]} `
      );
    } else {
      break;
    }
  }
  mealDetailsContent.innerHTML = `
  <div class="meal-info">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="food" />
  <div class="meal-ingredient">
    <h2>Ingredients</h2>
    <ul>
      ${ingredients.map((ing) => `<li> ${ing}</li>`).join()}
    </ul>
  </div>
  </div>
  
  `;
};
