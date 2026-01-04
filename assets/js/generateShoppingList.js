import { MEALS, INGREDIENT_AISLES } from "../resources/ingredients.js";

// Function to generate the shopping list
export function generateShoppingList() {
  const form = document.getElementById("dinnerForm");
  const selectedDinners = [];
  const shoppingList = {};

  const mealCards = document.querySelectorAll('.meal-card');

  // Collect selected dinners with people count
  const selectedMeals = [];
  mealCards.forEach(card => {
    if (card.classList.contains('selected')) {
      const mealValue = card.getAttribute('data-value');
      const peopleCount = parseInt(card.dataset.count) || 2;
      const multiplier = peopleCount / 2; // Base recipe is for 2 people
      console.log(mealValue, 'for', peopleCount, 'people, multiplier:', multiplier);
      selectedMeals.push({ name: mealValue, peopleCount, multiplier });
      selectedDinners.push(mealValue);
    }
  })

  // Collect and sum ingredients for the selected dinners
  selectedMeals.forEach((meal) => {
    MEALS[meal.name].forEach((ingredient) => {
      const key = `${ingredient.name}-${ingredient.unit}`;
      const aisle = INGREDIENT_AISLES[ingredient.name];
      const adjustedQuantity = ingredient.quantity * meal.multiplier;
      if (shoppingList[key]) {
        // Update the quantity if the ingredient already exists
        const existing = shoppingList[key];
        shoppingList[key] = {
          name: ingredient.name,
          quantity: existing.quantity + adjustedQuantity,
          unit: ingredient.unit,
          aisle: aisle,
        };
      } else {
        shoppingList[key] = {
          ...ingredient,
          quantity: adjustedQuantity,
          aisle: aisle,
        };
      }
    });
  });

  const aisleGroups = {};
  Object.values(shoppingList).forEach((ingredient) => {
    console.log(ingredient)
    if (!aisleGroups[ingredient.aisle]) {
      aisleGroups[ingredient.aisle] = [];
    }
    aisleGroups[ingredient.aisle].push(ingredient);
  });

  // Display the selected meals
  const selectedMealsDiv = document.getElementById("selectedMeals");
  const shoppingListDiv = document.getElementById("shoppingList");
  const copyShoppingButton = document.getElementById("copyShoppingButton");

  if (selectedDinners.length > 0) {
    selectedMealsDiv.innerHTML = `
        <h2>Selected Meals</h2>
        </br>
        <ul>${selectedMeals
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(meal => `<li>- ${meal.name} for ${meal.peopleCount}</li>`)
          .join("")}
        </ul>
        </br>
      `;

    shoppingListDiv.innerHTML = `
      <h2>Shopping List</h2>
      </br>
      ${Object.keys(aisleGroups)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)) // Sort aisles numerically
        .map(
          (aisle) => `
          <h3>${aisle}</h3>
          </br>
          <ul>
            ${aisleGroups[aisle]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => `<li>${item.name}: ${item.quantity} ${item.unit} </li>`).join("")}
          </ul>
          </br>
        `
        )
        .join("")}
    `;

    copyShoppingButton.style.display = 'inline-block'; // Show the button

  } else {
    selectedMealsDiv.innerHTML = ""; // Clear if no meals are selected
    shoppingListDiv.innerHTML = ""; // Clear if no meals are selected
    copyShoppingButton.style.display = 'none'; // Hide the button
  }
}

// Add change event listeners to the checkboxes
document.querySelectorAll('input[name="dinner"]').forEach((checkbox) => {
  checkbox.addEventListener("change", generateShoppingList);
});
