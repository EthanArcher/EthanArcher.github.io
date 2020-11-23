const dinnerIngredients = {
  "Orange Chicken and Jasmine Rice": [
    { name: "Jasmine Rice", quantity: 150, unit: "g" },
    { name: "Orange", quantity: 1, unit: "pcs" },
    { name: "Green Beans", quantity: 80, unit: "g" },
    { name: "Bell Pepper", quantity: 1, unit: "pcs" },
    { name: "Garlic Clove", quantity: 2, unit: "pcs" },
    { name: "Chicken Thigh", quantity: 260, unit: "g" },
    { name: "Cornflour", quantity: 20, unit: "g" },
    { name: "Honey", quantity: 15, unit: "ml" },
    { name: "Ginger Puree", quantity: 15, unit: "g" },
    { name: "Soy Sauce", quantity: 25, unit: "ml" },
    { name: "Rice Vinegar", quantity: 15, unit: "ml" },
    { name: "Tomato Ketchup", quantity: 10, unit: "g" },
    { name: "Plain Flour", quantity: 5, unit: "g" },
  ],
  "Pork & Apple Burger": [
    { name: "Rosemary", quantity: 1, unit: "pcs" },
    { name: "Potato", quantity: 250, unit: "g" },
    { name: "Pork Mince", quantity: 250, unit: "g" },
    { name: "Panko Breadcrumbs", quantity: 10, unit: "g" },
    { name: "Cheddar Cheese", quantity: 30, unit: "g" },
    { name: "Burger Bun", quantity: 2, unit: "pcs" },
    { name: "Honey", quantity: 15, unit: "ml" },
    { name: "Lemon", quantity: 1, unit: "pcs" },
    { name: "Olive Oil", quantity: 30, unit: "ml" },
    { name: "Rocket", quantity: 1, unit: "pcs" },
    { name: "Apple & Sage Jelly", quantity: 30, unit: "g" },
  ],
};

// Function to generate the shopping list
function generateShoppingList() {
  const form = document.getElementById("dinnerForm");
  const selectedDinners = new Set();
  const shoppingList = {};

  // Collect selected dinners
  form.querySelectorAll('input[name="dinner"]:checked').forEach((input) => {
    selectedDinners.add(input.value);
  });

  // Get shopping list container
  const shoppingListDiv = document.getElementById("shoppingList");

  // Check if any dinners are selected
  if (selectedDinners.size === 0) {
    // No dinners selected, hide the shopping list
    shoppingListDiv.style.display = "none";
    shoppingListDiv.innerHTML = ""; // Clear the list
    return;
  }

  // Collect and sum ingredients for the selected dinners
  selectedDinners.forEach((dinner) => {
    dinnerIngredients[dinner].forEach((ingredient) => {
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

  // Display the shopping list sorted alphabetically by ingredient name
  shoppingListDiv.innerHTML = `
      <h2>Shopping List</h2>
      <ul>${Object.keys(shoppingList)
        .sort()
        .map((key) => `<li>${key}: ${shoppingList[key]}</li>`)
        .join("")}</ul>
    `;

  // Show the shopping list
  shoppingListDiv.style.display = "block";
}

// Add change event listeners to the checkboxes
document.querySelectorAll('input[name="dinner"]').forEach((checkbox) => {
  checkbox.addEventListener("change", generateShoppingList);
});
