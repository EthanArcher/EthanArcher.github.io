import { MEALS } from '../resources/ingredients.js'

// Function to generate the shopping list
function generateShoppingList() {
  const form = document.getElementById("dinnerForm");
  const selectedDinners = new Set();
  const shoppingList = {};

  // Collect selected dinners
  form.querySelectorAll('input[name="dinner"]:checked').forEach((input) => {
    selectedDinners.add(input.value);
  });

  // Collect and sum ingredients for the selected dinners
  selectedDinners.forEach((dinner) => {
    MEALS[dinner].forEach((ingredient) => {
      const key = `${ingredient.name} (${ingredient.unit})`;
      if (shoppingList[key]) {
        // Sum the quantities if the ingredient is already in the list
        shoppingList[key] += ingredient.quantity;
      } else {
        // Add the ingredient to the list if it's not there
        shoppingList[key] = ingredient.quantity;
      }
    });
  });

  // Display the selected meals
  const selectedMealsDiv = document.getElementById("selectedMeals");
  const shoppingListDiv = document.getElementById("shoppingList");

  if (selectedDinners.size > 0) {
    selectedMealsDiv.innerHTML = `
        <h2>Selected Meals</h2>
        <ul>${Array.from(selectedDinners)
        .map((meal) => `<li>${meal}</li>`)
        .join("")}</ul>
      `;

    shoppingListDiv.innerHTML = `
        <h2>Shopping List</h2>
        <ul>${Object.keys(shoppingList)
        .sort()
        .map((key) => `<li>${key}: ${shoppingList[key]}</li>`)
        .join("")}</ul>
     `;

  } else {
    selectedMealsDiv.innerHTML = ""; // Clear if no meals are selected
    shoppingListDiv.innerHTML = ""; // Clear if no meals are selected
  }
}

// Add change event listeners to the checkboxes
document.querySelectorAll('input[name="dinner"]').forEach((checkbox) => {
  checkbox.addEventListener("change", generateShoppingList);
});
