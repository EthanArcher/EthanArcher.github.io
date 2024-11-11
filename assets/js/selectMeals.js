import { generateShoppingList } from './generateShoppingList.js';

const mealCards = document.querySelectorAll('.meal-card');

mealCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('selected'); // Toggles the 'selected' class
    generateShoppingList();
  });
});
