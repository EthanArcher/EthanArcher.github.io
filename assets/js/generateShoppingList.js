import { MEALS, INGREDIENT_AISLES } from "../resources/ingredients.js";

// Function to generate the shopping list
export function generateShoppingList() {
  const form = document.getElementById("dinnerForm");
  const selectedDinners = new Set();
  const shoppingList = {};

  const mealCards = document.querySelectorAll('.meal-card');

  // Collect selected dinners
  mealCards.forEach(card => {
    if (card.classList.contains('selected')) {
      const mealValue = card.getAttribute('data-value');
      console.log(mealValue);
      selectedDinners.add(mealValue);
    }
  })

  // Collect and sum ingredients for the selected dinners
  selectedDinners.forEach((dinner) => {
    MEALS[dinner].forEach((ingredient) => {
      const key = `${ingredient.name}-${ingredient.unit}`;
      const aisle = INGREDIENT_AISLES[ingredient.name];
      if (shoppingList[key]) {
        // Update the quantity if the ingredient already exists
        const existing = shoppingList[key];
        shoppingList[key] = {
          name: ingredient.name,
          quantity: existing.quantity + ingredient.quantity,
          unit: ingredient.unit,
          aisle: aisle,
        };
      } else {
        shoppingList[key] = {
          ...ingredient,
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

  if (selectedDinners.size > 0) {
    selectedMealsDiv.innerHTML = `
        <h2>Selected Meals</h2>
        <ul>${Array.from(selectedDinners)
          .sort()
          .map((meal) => `<li>${meal}</li>`)
          .join("")}</ul>
      `;

    shoppingListDiv.innerHTML = `
      <h2>Shopping List</h2>
      ${Object.keys(aisleGroups)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)) // Sort aisles numerically
        .map(
          (aisle) => `
          <h3>${aisle}</h3>
          <ul>
            ${aisleGroups[aisle]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => `<li>${item.name}: ${item.quantity} ${item.unit} </li>`).join("")}
          </ul>
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
